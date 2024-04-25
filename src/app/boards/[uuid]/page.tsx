"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DropdownList from "@/components/List/DropdownList";
import { useEffect, useState } from "react";
import { getListByBoard } from "../../../../lib";
import { IBoard } from "../interfaces/board.interface";

export default function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = params;
  const [board, setBoard] = useState<IBoard>()

  useEffect(() => {
    async function getAllLists() {
      const lists = await getListByBoard(uuid)
      
      setBoard(lists)
    }

    getAllLists()
  }, []);

  return (
    <DefaultLayout>
      {board?.lists?.map((list) => (
        <DropdownList uuid={list.uuid} boardUUID={board.uuid} title={list.title} />
      ))}
    </DefaultLayout>
  );
};