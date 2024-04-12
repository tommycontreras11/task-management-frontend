import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { getAllWorkspace, userLogged } from "../../../lib";
import { IWorkspace } from "@/interfaces/workspace.interface";
import Link from "next/link";

interface CardBoardProps {
  title?: string;
  uuid?: string;
  create: boolean;
}

const CardBoard: React.FC<CardBoardProps> = ({ title = 'Board', uuid, create }) => {
  const router = useRouter();

  useEffect(() => {
    console.log(uuid)
  }, []);

  return (
    <Link
      className="py-6 max-h-[140px] font-bold text-large text-center bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl"
      
      href={`/board/${uuid}`}
    >
      {title}
    </Link>
  );
};

export default CardBoard;
