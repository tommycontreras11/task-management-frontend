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
import { FormEvent, useState } from "react";
import { createList } from "../../../lib";
import { Alert, Box, Collapse, IconButton } from "@mui/material";

export const DropdownList = ({ uuid, title, boardUUID }: IList) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState({
    error: false,
    message: ""
  })

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
    <Box sx={{ width: '400px' }}>
      <Collapse in={openAlert}>
        <Alert
        severity={message.error ? "error" : "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
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
      {open ? (
        <form onSubmit={handleClick}>
          <Card className="max-w-[300px] h-32">
            <CardHeader className="flex gap-3 max-w-full">
              <Input placeholder="Enter list title" name="listTitle" />
            </CardHeader>
            <CardBody>
              <div className="flex flex-row gap-4">
                <Button
                type="submit"
                  className="
              group relative flex items-center gap-3.5 rounded-xl py-3 px-6 font-medium duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
                >
                  Add list
                </Button>
                <Button
                  onClick={() => setOpen(!open)}
                  className={`${
                    open
                      ? "group relative flex items-center gap-2.5 rounded-xl py-3 px-4 font-medium  duration-300 ease-in-out text-gray-900 bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200"
                      : "hidden"
                  }`}
                >
                  <CloseIcon />
                </Button>
              </div>
            </CardBody>
          </Card>
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
