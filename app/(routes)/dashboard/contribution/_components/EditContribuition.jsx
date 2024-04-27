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
import { Contribution } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";

const EditContribuition = ({ contributionInfo, refreshData }) => {
  const [contribution, setContribution] = useState();

  const { toast } = useToast();

  useEffect(() => {
    setContribution(contribution);
  }, [contribution]);

  const OnUpdateContribution = async () => {
    const result = await db
      .update(Contribution)
      .set({
        value: contribution,
      })
      .where(eq(Contribution.id, contributionInfo?.id))
      .returning();

    if (result) {
      refreshData();
      toast({
        title: "Aporte Atualizado",
      });
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PenBox />
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Contribuição</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Contribuição mensal
                  </h2>
                  <Input
                    placeholder="R$6000"
                    defaultValue={contributionInfo?.value}
                    onChange={(e) => setContribution(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!contribution}
                  onClick={() => OnUpdateContribution()}
                  className="mt-5 w-full"
                >
                  Update Contribuição
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditContribuition;
