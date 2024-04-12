"use client";

import { useEffect, useState } from "react";
import { getSession } from "../../../lib";
import CardTask from "@/components/Task/CardTask";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const cookie = await getSession();

      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookie as string,
        },
      });
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <DefaultLayout>
      <CardTask />
    </DefaultLayout>
  );
}
