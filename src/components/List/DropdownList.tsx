import { IList } from "@/app/lists/interface/list.interface";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { createList, createTask, getTaskByList } from "../../../lib";
import { AlertPopup } from "../Alert/Alert";
import CreateList from "./CreateList";
import GetAllList from "./GetAllList";

export const DropdownList = ({ uuid, title, boardUUID }: IList) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState({
    error: false,
    message: "",
  });
  const [list, setList] = useState<IList>()
  
  useEffect(() => {
    async function getAllTasks() {
      const tasks = await getTaskByList(uuid)

      setList(tasks)
    }

    getAllTasks()
  }, []);

  const handleClickList = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const listTitle = formData.get("listTitle") as string;

    const response = await createList({ title: listTitle, boardUUID });

      if (response.error) {
        setOpenAlert(true);
        setMessage({
          message: response.message,
          error: response.error,
        });
      }
      setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
  };

  const handleClickTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const taskTitle = formData.get("taskTitle") as string;

    console.log(taskTitle)

    const response = await createTask({ listUUID: uuid, title: taskTitle });

      if (response.error) {
        setOpenAlert(true);
        setMessage({
          message: response.message,
          error: response.error,
        });
      }
      setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
  };

  return (
    <>
      <AlertPopup
        message={message}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 sm:grid-cols-2 xsm:grid-cols-2 xl:grid-cols-4 2xl:gap-7.5">
        <form onSubmit={handleClickTask}>
    	  {list && <GetAllList boardUUID={boardUUID} tasks={list.tasks} />} 
        </form>
        {open ? (
          <form onSubmit={handleClickList}>
            <CreateList setOpen={setOpen} open={open} />
          </form>
        ) : (
          <Button
            onClick={() => setOpen(!open)}
            className={`${
              open
                ? "hidden"
                : "group relative flex items-center gap-2.5 rounded-xl py-5 px-6 font-medium  duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
            }`}
          >
            <AddIcon />
            Add another list
          </Button>
        )}
      </div>
    </>
  );
};

export default DropdownList;
