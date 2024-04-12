"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { IWorkspace } from "@/interfaces/workspace.interface";
import { useEffect, useState } from "react";
import { getOneWorkspace } from "../../../../../lib";
import CardBoard from "@/components/Board/CardBoard";
import CreateCardBoard from "@/components/Board/CreateCardBoard";

const WorkspaceHome = ({ params }: { params: { uuid: string } }) => {
  const [workspaces, setWorkspaces] = useState<IWorkspace>()
  const { uuid } = params

  useEffect(() => {
    async function meWorkspaces() {
      const workspaces = await getOneWorkspace(uuid);
      
      setWorkspaces(workspaces);
    }
    meWorkspaces();
  }, []);


  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 sm:grid-cols-2 xsm:grid-cols-2 xl:grid-cols-5 2xl:gap-7.5">
      {workspaces?.boards?.map((board) => (
            <CardBoard title={board?.title} uuid={board?.uuid} create={false} />
        ))}
        <CreateCardBoard />
      </div>
    </DefaultLayout>
  );
};

export default WorkspaceHome;
