import CloseIcon from "@mui/icons-material/Close";
import { Button, Card, CardFooter, CardHeader, Input } from "@nextui-org/react";

interface ICreateList {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateTask = ({ open, setOpen }: ICreateList) => {
  return (
    <>
      {open && (
        <Card className="max-w-[300px]">
          <CardHeader className="flex justify-between">
            <Input
              placeholder="Enter task title"
              name="taskTitle"
              required
              isRequired
              isClearable
            />
          </CardHeader>

          <CardFooter className="flex flex-row gap-3">
            <Button
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
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default CreateTask;
