"use client";

import { useEffect, useState } from "react";
import { getSession } from "../../../../lib";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const cookie = await getSession();

      const response = await fetch("http://localhost:4000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookie as string,
        },
      });
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task: any) => (
          <div>
            <li key={task.id}>{task.title}</li>
            <p>{task.description}</p>
          </div>
        ))}
      </ul>
    </>
  );
}
