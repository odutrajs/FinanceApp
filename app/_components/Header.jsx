"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/@/ui/button";

const Header = () => {
  return (
    <header className="w-full bg-green-600 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <Image src="/logo2.svg" alt="GranaZen Logo" width={60} height={60} />
        </div>

        <div className="flex-1 flex justify-end">
          <Link href="/sign-in">
            <Button className="bg-black text-white hover:bg-green-800">
              Acessar conta
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
