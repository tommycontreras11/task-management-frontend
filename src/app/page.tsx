
import { TaskManagement } from "@/components/Dashboard/TaskManagement";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <TaskManagement />
      </DefaultLayout>
    </>
  )
}
