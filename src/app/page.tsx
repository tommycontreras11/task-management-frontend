"use client";	

import { TaskManagement } from "@/components/Dashboard/TaskManagement";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <DefaultLayout>
          <TaskManagement />
        </DefaultLayout>
      </NextUIProvider>
    </>
  )
}
