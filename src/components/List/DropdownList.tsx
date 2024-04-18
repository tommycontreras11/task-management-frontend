import { IList } from "@/app/lists/interface/list.interface";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Accordion,
  AccordionItem,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export const DropdownList = ({ uuid, title, boardUUID }: IList) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Card className="max-w-[200px]" radius="lg" shadow="md" isHoverable>
      <div className="flex justify-center w-full">
        <Button
          onClick={() => setOpen(open ? false : true)}
          className="w-full group relative flex items-center gap-2.5 rounded-sm px-2 font-medium text-zinc-950 dark:text-bodydark1 duration-300 ease-in-out"
        >
          <AddIcon />
          Add a list
        </Button>
      </div>
      {open && (
        <CardBody>
          <Accordion variant="shadow">
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
            subtitle={
                <Input
                autoFocus
                
                placeholder="Enter board title"
                name="boardTitle"
              />
            }
>
            </AccordionItem>
          </Accordion>
        </CardBody>
      )}
    </Card>
  );
};

export default DropdownList;
