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
import { getAllWorkspace, userLogged } from "../../lib";
import { IWorkspace } from "@/interfaces/workspace.interface";

interface CardDataStatsProps {
  title: string;
  create: boolean;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title, create }) => {
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
  
      console.log(userLoggedWorkspaces)
  
      setWorkspaces(userLoggedWorkspaces);  
    }
    meWorkspaces();

  }, [])

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

    console.log(title)

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
    // <div className="border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
    //   { /*TODO: Align text to start when create mode is false*/ }
    //   <div className={`flex p-3 ${create ? "items-center justify-center" : "items-center justify-center"}`}>
    //     <div>
    //       <span className="text-sm font-medium">{title}</span>
    //     </div>
    //   </div>
    // </div>

    // <Card className="py-7 max-h-[140px] bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl" onClick={() => {console.log("clicked")}}>
    //   <CardHeader className="pb-0 pt-0 px-4 flex-col justify-center items-center ">
    //     <h4 className="font-bold text-large text-center">{title}</h4>
    //   </CardHeader>
    // </Card>

    <Button
      className="py-10 max-h-[140px] bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl"
      onClick={create ? onOpen : handleClick}
    >
      <h4 className="font-bold text-large text-center">{title}</h4>

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

export default CardDataStats;
