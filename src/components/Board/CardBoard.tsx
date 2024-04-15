import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface CardBoardProps {
  title?: string;
  uuid?: string;
}

const CardBoard: React.FC<CardBoardProps> = ({ title = 'Board', uuid }) => {
  const router = useRouter();

  useEffect(() => {
    console.log(uuid)
  }, []);

  return (
    <Button
      className="py-8 font-bold text-md text-center bg-slate-800 dark:text-black text-bodydark1 dark:bg-white hover:bg-meta-4 dark:hover:bg-slate-200 rounded-xl"
      href={`/boards/${uuid}`}
      as={Link}
    >
      {title}
    </Button>
  );
};

export default CardBoard;
