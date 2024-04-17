import AssignmentIcon from '@mui/icons-material/Assignment';
import { Accordion, AccordionItem, Button, Input, useDisclosure } from "@nextui-org/react";

export default function CreateTask() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="max-w-[300px]">
        <Accordion variant="shadow">
          <AccordionItem
            key="1"
            aria-label="Create a new task"
            title="Create a new task"
          >
            <Input
              autoFocus
              endContent={
                <AssignmentIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Enter the title"
              variant="bordered"
              className="pb-2"
            />
            <Button color="primary" size="sm">
              Create
            </Button>
          </AccordionItem>
        </Accordion>
      </div>
  );
}
