"use client";

import { UserButton } from "@clerk/nextjs";
import {
  CandlestickChart,
  CircleDollarSign,
  Goal,
  HandCoins,
  Landmark,
  LayoutGrid,
  PiggyBank,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Inicio",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Gastos",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Salário",
      icon: HandCoins,
      path: "/dashboard/wage",
    },
    {
      id: 4,
      name: "Investimento",
      icon: Landmark,
      path: "/dashboard/investment",
    },
    {
      id: 5,
      name: "Aporte mensal",
      icon: CandlestickChart,
      path: "/dashboard/contribution",
    },
    {
      id: 5,
      name: "Metas",
      icon: Goal,
      path: "/dashboard/goals",
    },
  ];
  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src={"./logo.svg"} alt="logo" width={80} height={80} />
      <div>
        <div className="mt-5">
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <h2
                className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 mb-2 ${
                  path == menu.path && "text-blue-800 bg-blue-200"
                }`}
              >
                <menu.icon />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
