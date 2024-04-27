"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/@/ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/@/ui/dialog";
import { useToast } from "../../../../components/@/ui/use-toast";
import { Input } from "../../../../components/@/ui/input";
import { eq } from "drizzle-orm";
import { Investiment } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";

const EditInvestment = ({ investimentInfo, refreshData }) => {
  const [investiment, setInvestiment] = useState();

  const { toast } = useToast();

  useEffect(() => {
    setInvestiment(investiment);
  }, [investiment]);

  const OnUpdateInvestiment = async () => {
    const result = await db
      .update(Investiment)
      .set({
        value: investiment,
      })
      .where(eq(Investiment.id, investimentInfo?.id))
      .returning();

    if (result) {
      refreshData();
      toast({
        title: "Salário Atualizado",
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Investiment</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Valor do salário
                  </h2>
                  <Input
                    placeholder="R$6000"
                    defaultValue={investimentInfo?.value}
                    onChange={(e) => setInvestiment(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!investimentInfo}
                  onClick={() => OnUpdateInvestiment()}
                  className="mt-5 w-full"
                >
                  Update Investiment
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditInvestment;
