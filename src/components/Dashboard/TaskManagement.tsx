"use client";

import React, { useEffect } from "react";
import CardDataStats from "../Board/CardBoard";
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
        Home
      </h3>
    </>
  );
}
