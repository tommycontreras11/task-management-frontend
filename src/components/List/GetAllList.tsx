import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

export const GetAllList = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="max-w-[300px]">
      <CardHeader className="flex justify-between">
        <div className="flex">
          <h4 className="text-small font-semibold leading-none text-default-600">
            Title
          </h4>
        </div>
        <IconButton
          onClick={() => console.log("click")}
          className="cursor-pointer duration-300 ease-in-out text-gray-900 dark:hover:bg-meta-4 hover:bg-graydark"
        >
          <MoreHorizIcon className="text-white" />
        </IconButton>
      </CardHeader>
      {open && (
        <CardBody className="flex justify-between">
          <Input
            placeholder="Enter task title"
            name="taskTitle"
            required
            isRequired
            isClearable
          />

          <div className="flex flex-row gap-3 mt-3">
            <Button
              onClick={() => console.log("add task")}
              type="submit"
              className="
                    rounded-xl py-3 px-6 font-medium duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
            >
              Add task
            </Button>
            <Button
              onClick={() => setOpen(!open)}
              className="rounded-xl py-3 px-4 font-medium  duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
            >
              <CloseIcon />
            </Button>
          </div>
        </CardBody>
      )}
      {open === false && (
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => setOpen(!open)}
            className="rounded-xl font-medium duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
          >
            <AddIcon />
            Add another list
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GetAllList;
