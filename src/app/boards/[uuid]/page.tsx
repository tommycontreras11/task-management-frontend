"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CreateTaskModal from "@/components/Task/CreateTaskModal";
import { Accordion, AccordionItem, Button, Input } from "@nextui-org/react";
import { useEffect } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = params;

  useEffect(() => {
    console.log(uuid);
  });

  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};