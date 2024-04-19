"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DropdownList from "@/components/List/DropdownList";
import { useEffect } from "react";

export default function Page({ params }: { params: { uuid: string } }) {
  const { uuid } = params;

  useEffect(() => {
    console.log(uuid);
  }, []);

  return (
    <DefaultLayout>
      <DropdownList uuid="22" boardUUID="83f4f397-6da3-4a58-b393-717f4e9dff7d" title="fdsfsdf" />
    </DefaultLayout>
  );
};