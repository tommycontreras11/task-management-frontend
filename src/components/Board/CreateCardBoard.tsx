import { IResponse } from "@/interfaces/reponse.interface";
import { IWorkspace } from "@/interfaces/workspace.interface";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Collapse, IconButton } from "@mui/material";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { createBoard, getAllWorkspace, userLogged } from "../../../lib";

const CreateCardBoard = () => {
  const [workspaceSelected, setWorkspaceSelected] = useState<string>("");
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState<IResponse>({
    message: "",
    error: false
  });

  useEffect(() => {
    async function meWorkspaces() {
      const workspaces = await getAllWorkspace();
      const user = await userLogged();

      const userLoggedWorkspaces = workspaces.filter(
        (x) => x.user.uuid === user.uuid
      );

      setWorkspaces(userLoggedWorkspaces);
    }
    meWorkspaces();
  }, []);

  const handleClick = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget)
    const title = form.get("boardTitle")
    const user = await userLogged();
    
    const board = {
      title: title, 
      workspaceUUID: workspaceSelected,
      userUUIDs: [user.uuid]
    }

    const result = await createBoard(board)
    if(result.error) {
      setOpen(true)
      setMessage({
        message: result.message,
        error: result.error
      })
    }
  };

  const handleChangeWorkspace = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWorkspaceSelected(event.target.value);
  };

  return (
    <>
      <Box sx={{ width: '400px' }}>
      <Collapse in={open}>
        <Alert
        severity={message.error ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message.message}
        </Alert>
      </Collapse>
    </Box>
    <Button
      className="py-8 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl"
      onClick={onOpen}
    >
      <h4 className="font-bold text-md text-center">Create new board</h4>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create board
              </ModalHeader>
              <form action="" onSubmit={handleClick}>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <AssignmentIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  placeholder="Enter board title"
                  name="boardTitle"
                />
                <Select
                  variant="bordered"
                  placeholder="Select Workspace"
                  size="md"
                  value={workspaceSelected}
                  onChange={handleChangeWorkspace}
                >
                  {workspaces.map((workspace) => (
                    <SelectItem key={workspace.uuid} value={workspace.name}>
                      {workspace.name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary">
                  Create
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </Button>
    </>
  );
};

export default CreateCardBoard;
