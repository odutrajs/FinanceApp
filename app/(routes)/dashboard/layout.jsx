"use client";

import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../utils/dbConfig";
import { Budgets } from "../../../utils/schema";
import { useRouter } from "next/navigation";
import { Toaster } from "../../components/@/ui/toaster";
const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    if (result.length == 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Toaster />
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
