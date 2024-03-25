
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <DashboardPage />
      </DefaultLayout>
    </>
  )
}
