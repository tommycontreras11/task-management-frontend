"use client";

import React, { useEffect } from "react";
import CardDataStats from "../CardDataStats";
import { userLogged } from "../../../lib";
import {Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export function TaskManagement() {
  useEffect(() => {
    async function me() {
      const user = await userLogged();
      console.log(user);
    }

    me();
  });

  return (
    <>
      <h3 className="font-medium text-title-md text-black dark:text-white py-4 ">
        Boards
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 sm:grid-cols-2 xsm:grid-cols-2 xl:grid-cols-5 2xl:gap-7.5">
        <CardDataStats title="Create new board" create />
        <CardDataStats title="Board 1" create={false} />
      </div>
    </>
  );
}
