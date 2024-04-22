import { IList } from "@/app/lists/interface/list.interface";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input
} from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { createList } from "../../../lib";
import { AlertPopup } from "../Alert/Alert";
import CreateList from "./Create";

export const DropdownList = ({ uuid, title, boardUUID }: IList) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState({
    error: false,
    message: ""
  })

  useEffect(() => {

  }, [])

  const handleClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)
    const listTitle = formData.get('listTitle') as string

    const response = await createList({title: listTitle, boardUUID})
    
    if(response.error) {
      setOpenAlert(true)
      setMessage({
        message: response.message,
        error: response.error
      })
    }
    setTimeout(() => {
      setOpenAlert(false)
    }, 5000)
  };

  return (
    <>
    <AlertPopup message={message} openAlert={openAlert} setOpenAlert={setOpenAlert} />
      {open ? (
        <form onSubmit={handleClick}>
          <CreateList open={open} setOpen={setOpen} type="task" title={"Hola"} />
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
    </>
  );
};

export default DropdownList;
