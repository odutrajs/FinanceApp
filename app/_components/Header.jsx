"use client";

import React from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "../components/@/ui/button";

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center  shadow-sm bg-green-600">
      <Image src={"/././logo2.svg"} alt="logo" width={80} height={80} />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          <Button>Acessar conta</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
