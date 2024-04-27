"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "../../../components/@/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Goals } from "../../../../utils/schema";
import { Input } from "../../../components/@/ui/input";
import { Button } from "../../../components/@/ui/button";
import { db } from "../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { formatToBRL } from "../../../../utils/formatToReal";
import { PiggyBank } from "lucide-react";
import EditGoals from "./_components/EditGoals";

const GoalsPage = () => {
  const [shortTerm, setShortTerm] = useState();
  const [midTerm, setMidTerm] = useState();
  const [longTerm, setLongTerm] = useState();

  const [goalsAPIInfo, setGoalsAPIInfo] = useState();

  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    getGoals();
  }, [user]);

  const addNewGoals = async () => {
    try {
      const result = await db
        .insert(Goals)
        .values({
          shortTerm: shortTerm,
          midTerm: midTerm,
          longTerm: longTerm,
          createdBy: user?.primaryEmailAddress.emailAddress,
        })
        .returning();

      if (result) {
        toast({
          title: "Meta criada",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar novas metas:", error);
      toast({
        title: "Erro ao criar meta",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getGoals = async () => {
    const result = await db
      .select()
      .from(Goals)
      .where(eq(Goals.createdBy, user?.primaryEmailAddress?.emailAddress));
    setGoalsAPIInfo(result);
  };
  return (
    <div className="flex mt-10 items-center justify-center">
      {goalsAPIInfo?.length > 0 ? (
        <div className="">
          <div className="p-7 border rounded-lg flex item-center justify-between mt-7 mb-7 ">
            <div>
              <h2 className="text-sm">Valor da meta a curto prazo</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(goalsAPIInfo[0]?.shortTerm)}
              </h2>
              <EditGoals
                goalsAPIInfo={goalsAPIInfo && goalsAPIInfo[0]}
                refreshData={() => getGoals()}
              />
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between mt-7">
            <div>
              <h2 className="text-sm">Valor da meta a médio prazo</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(goalsAPIInfo[0]?.midTerm)}
              </h2>
              <EditGoals
                goalsAPIInfo={goalsAPIInfo && goalsAPIInfo[0]}
                refreshData={() => getGoals()}
              />
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between mt-7">
            <div>
              <h2 className="text-sm">Valor da meta a longo prazo</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(goalsAPIInfo[0]?.longTerm)}
              </h2>
              <EditGoals
                goalsAPIInfo={goalsAPIInfo && goalsAPIInfo[0]}
                refreshData={() => getGoals()}
              />
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="border p-5 rounded-lg w-[40%] ml-7">
          <h2 className="font-bold text-lg"></h2>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">
              Valor do investimento curto prazo
            </h2>
            <Input
              placeholder="R$5000"
              onChange={(e) => setShortTerm(e.target.value)}
            />
            <h2 className="text-black font-medium my-1">
              Valor do investimento médio prazo
            </h2>
            <Input
              placeholder="R$5000"
              onChange={(e) => setMidTerm(e.target.value)}
            />
            <h2 className="text-black font-medium my-1">
              Valor do investimento longo prazo
            </h2>
            <Input
              placeholder="R$5000"
              onChange={(e) => setLongTerm(e.target.value)}
            />
          </div>
          <Button
            onClick={() => addNewGoals()}
            disabled={!(shortTerm && midTerm && longTerm)}
            className="mt-3 w-full"
          >
            Add nova meta
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
