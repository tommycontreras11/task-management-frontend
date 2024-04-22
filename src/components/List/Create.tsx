import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";

interface ICreateList {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "list" | "task";
  title?: string | null;
}

export const CreateList = ({ open, setOpen, type, title }: ICreateList) => {
  const [openList, setOpenList] = useState(false)
  return (
    <Card className="max-w-[300px]">
      <CardHeader className="flex justify-between">
        {title ? (
          <>
            <div className="flex">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {title}
              </h4>
            </div>
            <IconButton
              onClick={() => console.log("click")}
              className="cursor-pointer duration-300 ease-in-out text-gray-900 dark:hover:bg-meta-4 hover:bg-graydark"
            >
              <MoreHorizIcon className="text-white" />
            </IconButton>
          </>
        ) : (
          <Input
            placeholder={
              type === "list" ? "Enter list title" : "Enter task title"
            }
            name={type === "list" ? "listTitle" : "taskTitle"}
            required
            isRequired
            isClearable
          />
        )}
      </CardHeader>
      <CardBody className="flex justify-between">
        {openList ? (
            <>
                      <Input
            placeholder={
              type === "list" ? "Enter list title" : "Enter task title"
            }
            name={type === "list" ? "listTitle" : "taskTitle"}
            required
            isRequired
            isClearable
          />

<div className="flex mt-3">
<Button
    onClick={() => console.log('add task')}
              type="submit"
              className="
              rounded-xl py-3 px-6 font-medium duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
            >
              {type === "list" ? "Add list" : "Add task"}
            </Button>
            <Button
              onClick={() => setOpenList(!open)}
              className={`${
                open
                  ? "rounded-xl py-3 px-4 font-medium  duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
                  : "hidden"
              }`}
            >
              <CloseIcon />
            </Button>
            </div>

            </>
        ): (
            <div></div>
        )}
      </CardBody>
      <CardFooter
        className={`${
          type === "list" ? "flex flex-row gap-3" : "flex justify-between"
        }`}
      >
        {type === "list" ? (
          <>
            <Button
              type="submit"
              className="
              rounded-xl py-3 px-6 font-medium duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
            >
              {type === "list" ? "Add list" : "Add task"}
            </Button>
            <Button
              onClick={() => setOpenList(!openList)}
              className={`${
                openList
                  ? "rounded-xl py-3 px-4 font-medium  duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
                  : "hidden"
              }`}
            >
              <CloseIcon />
            </Button>
          </>
        ) : (
          <>
            <div className="flex">
              <Button
                onClick={() => setOpenList(!openList)}
                className={`${
                    openList == false
                      ? "rounded-xl py-3 px-4 font-medium  duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
                      : "hidden"
                  }`}
              >
                <AddIcon />
                Add another list
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreateList;
