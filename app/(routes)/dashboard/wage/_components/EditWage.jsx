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
import { Wage } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";

const EditWage = ({ wageInfo, refreshData }) => {
  const [wage, setWage] = useState();

  const { toast } = useToast();

  useEffect(() => {
    setWage(wage);
  }, [wage]);

  const OnUpdateWage = async () => {
    const result = await db
      .update(Wage)
      .set({
        value: wage,
      })
      .where(eq(Wage.id, wageInfo?.id))
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
            <DialogTitle>Update Wage</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Valor do salário
                  </h2>
                  <Input
                    placeholder="R$6000"
                    defaultValue={wageInfo?.value}
                    onChange={(e) => setWage(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!wage}
                  onClick={() => OnUpdateWage()}
                  className="mt-5 w-full"
                >
                  Update Wage
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditWage;
