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
      <DropdownList uuid="22" boardUUID="sadas" title="fdsfsdf" />
    </DefaultLayout>
  );
};