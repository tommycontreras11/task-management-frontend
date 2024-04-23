import { IResponse } from "@/interfaces/reponse.interface";
import { IWorkspace } from "@/interfaces/workspace.interface";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { createBoard, getAllWorkspace, userLogged } from "../../../lib";
import CustomizedSnackbars from "../Snackbar/Snackbar";

interface CardBoardProps {
  title?: string;
  uuid?: string;
  create?: boolean;
}

const CardBoard: React.FC<CardBoardProps> = ({ title, uuid, create }) => {
  const [workspaceSelected, setWorkspaceSelected] = useState<string>("");
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<IResponse>({
    message: "",
    error: false,
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
  }, [getAllWorkspace, userLogged]);

  const handleClick = async (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const title = form.get("boardTitle");
    const user = await userLogged();

    const board = {
      title: title,
      workspaceUUID: workspaceSelected,
      userUUIDs: [user.uuid],
    };

    const result = await createBoard(board);
    if (result.error) {
      setMessage({
        message: result.message,
        error: result.error,
      });
    }
    
    if (!result.error) {
      setMessage({
        message: result.message,
        error: result.error,
      });
    }

    setOpen(true);
  };

  const handleChangeWorkspace = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWorkspaceSelected(event.target.value);
  };

  return (
    <>
      {create && (
        <div>
          {open && (
                <div className='flex justify-center items-center'>
            <CustomizedSnackbars
              
              message={message.message}
              severity={message.error ? "error" : "success"}
              autoHideDuration={6000}
              open={open}
            />
            </div>
          )}

          <Button
            className="py-8 mb-4 mt-4 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl"
            onClick={onOpen}
          >
            <h4 className="font-bold text-md text-center">Create new board</h4>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="center"
            >
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
                            <SelectItem
                              key={workspace.uuid}
                              value={workspace.name}
                            >
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
        </div>
      )}
      {create === false && (
        <Button
          className="py-8 font-bold text-md text-center bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl"
          href={`/boards/${uuid}`}
          as={Link}
        >
          {title}
        </Button>
      )}
    </>
  );
};

export default CardBoard;
