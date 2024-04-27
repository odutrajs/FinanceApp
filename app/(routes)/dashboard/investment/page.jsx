"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "../../../components/@/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Investiment } from "../../../../utils/schema";
import EditInvestment from "./_components/EditInvestiment";
import { Input } from "../../../components/@/ui/input";
import { Button } from "../../../components/@/ui/button";
import { db } from "../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { formatToBRL } from "../../../../utils/formatToReal";
import { PiggyBank } from "lucide-react";

const Investment = () => {
  const [investiment, setInvestiment] = useState();
  const [investimentInfoAPI, setInvestimentInfoAPI] = useState();
  const { toast } = useToast();

  const { user } = useUser();

  useEffect(() => {
    getInvestiment();
  }, [user]);

  const addNewInvestiment = async () => {
    const result = await db
      .insert(Investiment)
      .values({
        value: investiment,
        createdBy: user?.primaryEmailAddress.emailAddress,
      })
      .returning();

    if (result) {
      toast({
        title: "Investimento criado",
      });
    }
  };
  const getInvestiment = async () => {
    const result = await db
      .select()
      .from(Investiment)
      .where(
        eq(Investiment.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setInvestimentInfoAPI(result);
  };
  return (
    <div className="flex mt-10 items-center justify-center">
      {investimentInfoAPI?.length > 0 ? (
        <div className="p-7 border rounded-lg flex item-center justify-between mt-7 mb-7 w-[25%] ">
          <div>
            <h2 className="text-sm">Valor do salário cadastrado</h2>
            <h2 className="font-bold text-2xl">
              {formatToBRL(investimentInfoAPI[0]?.value)}
            </h2>
            <EditInvestment
              investimentInfo={investimentInfoAPI && investimentInfoAPI[0]}
              refreshData={() => getInvestiment()}
            />
          </div>
          <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
        </div>
      ) : (
        <div className="border p-5 rounded-lg w-[40%] ml-7">
          <h2 className="font-bold text-lg"></h2>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">
              Valor do investimento atual
            </h2>
            <Input
              placeholder="R$5000"
              onChange={(e) => setInvestiment(e.target.value)}
            />
          </div>
          <Button
            onClick={() => addNewInvestiment()}
            disabled={!investiment}
            className="mt-3 w-full"
          >
            Add novo investimento
          </Button>
        </div>
      )}
    </div>
  );
};

export default Investment;
