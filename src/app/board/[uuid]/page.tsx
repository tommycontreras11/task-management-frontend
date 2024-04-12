"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Accordion, AccordionItem, Button, Input } from "@nextui-org/react";
import { useEffect } from "react";

const GetBoardByUUIDage = ({ params }: { params: { uuid: string } }) => {
  const { uuid } = params;

  useEffect(() => {
    console.log(uuid);
  });

  return (
    <DefaultLayout>
      <div className="max-w-[300px]">
        <Accordion variant="shadow">
          <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
            <Input
              autoFocus
              // endContent={
              //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              // }
              placeholder="Board title"
              variant="bordered"
              size="md"
              id="boardTitle"
              className="pb-2"
            />
            <Button color="primary" size="sm">
              Add task
            </Button>
          </AccordionItem>
        </Accordion>
      </div>
    </DefaultLayout>
  );
};

export default GetBoardByUUIDage;
