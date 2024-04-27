"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../../components/@/ui/input";
import { Button } from "../../../components/@/ui/button";
import { db } from "../../../../utils/dbConfig";
import { Wage } from "../../../../utils/schema";
import { useToast } from "../../../components/@/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { PiggyBank } from "lucide-react";
import { formatToBRL } from "../../../../utils/formatToReal";
import EditWage from "./_components/EditWage";

const WagePage = () => {
  const [salary, setSalary] = useState();
  const [wage, setWage] = useState();
  const { toast } = useToast();

  const { user } = useUser();

  useEffect(() => {
    getWage();
  }, [user]);

  const addNewWage = async () => {
    const result = await db
      .insert(Wage)
      .values({
        value: salary,
        createdBy: user?.primaryEmailAddress.emailAddress,
      })
      .returning();

    if (result) {
      toast({
        title: "Wage criado",
      });
    }
  };
  const getWage = async () => {
    const result = await db
      .select()
      .from(Wage)
      .where(eq(Wage.createdBy, user?.primaryEmailAddress?.emailAddress));
    setWage(result);
  };

  return (
    <div className="flex mt-10 items-center justify-center">
      {wage?.length > 0 ? (
        <div className="p-7 border rounded-lg flex item-center justify-between mt-7 mb-7 w-[25%] ">
          <div>
            <h2 className="text-sm">Valor do salário cadastrado</h2>
            <h2 className="font-bold text-2xl">
              {formatToBRL(wage[0]?.value)}
            </h2>
            <EditWage
              wageInfo={wage && wage[0]}
              refreshData={() => getWage()}
            />
          </div>
          <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
        </div>
      ) : (
        <div className="border p-5 rounded-lg w-[40%] ml-7">
          <h2 className="font-bold text-lg"></h2>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">
              Valor do salário atual
            </h2>
            <Input
              placeholder="R$5000"
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <Button
            onClick={() => addNewWage()}
            disabled={!salary}
            className="mt-3 w-full"
          >
            Add novo salário
          </Button>
        </div>
      )}
    </div>
  );
};

export default WagePage;
