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
import { getAllWorkspace, userLogged } from "../../../lib";
import { IWorkspace } from "@/interfaces/workspace.interface";

const CreateCardBoard = () => {
  const router = useRouter();
  const [workspaceSelected, setWorkspaceSelected] = useState<string>("");
  const [workspaces, setWorkspaces] = useState<IWorkspace[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("clicked");
  };

  const handleClickCreateBoard = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    // const form = new FormData(event.currentTarget)
    // const title = form.get("boardTitle")

    
    // const board = await fetch("http://localhost:4000/api/boards", {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "body": JSON.stringify("")
    //   },
    //   method: "POST",
    // })
  };

  const handleChangeWorkspace = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWorkspaceSelected(event.target.value);
  };

  return (
    <Button
      className="py-10 max-h-[140px] bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl"
      onClick={onOpen}
    >
      <h4 className="font-bold text-large text-center">Create new board</h4>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create board
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Board title"
                  variant="bordered"
                  size="sm"
                  id="boardTitle"
                />
                {/* <Input
                  // endContent={
                  //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Workspace"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                /> */}
                <Select
                  variant={"bordered"}
                  placeholder="Workspace"
                  size="md"
                  id="workspaceId"
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
                <Button color="primary" onClick={handleClickCreateBoard}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Button>
  );
};

export default CreateCardBoard;
