import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createBoard, getAllWorkspace, userLogged } from "../../../lib";
import { IWorkspace } from "@/interfaces/workspace.interface";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Collapse, Alert, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CreateCardBoard = () => {
  const router = useRouter();
  const [workspaceSelected, setWorkspaceSelected] = useState<string>("");
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");

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
    console.log('dd ', result)
    if(result.error) {
      setOpen(true)
    }
  };

  const handleChangeWorkspace = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWorkspaceSelected(event.target.value);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
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
          Click the close icon to see the Collapse transition in action!
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
