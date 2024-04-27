"use client";
import React, { useEffect, useState } from "react";
import EditContribuition from "./_components/EditContribuition";
import { useToast } from "../../../components/@/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Contribution } from "../../../../utils/schema";
import { PiggyBank } from "lucide-react";
import { Input } from "../../../components/@/ui/input";
import { Button } from "../../../components/@/ui/button";
import { db } from "../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { formatToBRL } from "../../../../utils/formatToReal";

const ContributionPage = () => {
  const [contribution, setContribution] = useState();
  const [contributionInfo, setContributionInfo] = useState();
  const { toast } = useToast();

  const { user } = useUser();

  useEffect(() => {
    getContribution();
  }, [user]);

  const addNewContribution = async () => {
    const result = await db
      .insert(Contribution)
      .values({
        value: contribution,
        createdBy: user?.primaryEmailAddress.emailAddress,
      })
      .returning();

    if (result) {
      toast({
        title: "Recorrência criada",
      });
    }
  };
  const getContribution = async () => {
    const result = await db
      .select()
      .from(Contribution)
      .where(
        eq(Contribution.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setContributionInfo(result);
  };
  return (
    <div className="flex mt-10 items-center justify-center">
      {contributionInfo?.length > 0 ? (
        <div className="p-7 border rounded-lg flex item-center justify-between mt-7 mb-7 w-[25%] ">
          <div>
            <h2 className="text-sm"> Valor da contribuição atual</h2>
            <h2 className="font-bold text-2xl">
              {formatToBRL(contributionInfo[0]?.value)}
            </h2>
            <EditContribuition
              contributionInfo={contributionInfo && contributionInfo[0]}
              refreshData={() => getContribution()}
            />
          </div>
          <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
        </div>
      ) : (
        <div className="border p-5 rounded-lg w-[40%] ml-7">
          <h2 className="font-bold text-lg"></h2>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">
              Valor da contribuição
            </h2>
            <Input
              placeholder="R$5000"
              onChange={(e) => setContribution(e.target.value)}
            />
          </div>
          <Button
            onClick={() => addNewContribution()}
            disabled={!contribution}
            className="mt-3 w-full"
          >
            Add nova contribuição
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContributionPage;
