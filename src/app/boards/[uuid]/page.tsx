"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CardTask from "@/components/Task/CardTask";
import CreateTask from "@/components/Task/CreateTask";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Accordion, AccordionItem, Button, Input } from "@nextui-org/react";
import { useEffect } from "react";

export default function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = params;

  useEffect(() => {
    console.log(uuid);
  }, []);

  return (
    <DefaultLayout>
      <CreateTask />
      <CardTask />
    </DefaultLayout>
  );
};