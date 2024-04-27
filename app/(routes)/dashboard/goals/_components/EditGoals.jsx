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
import { Goals } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";

const EditGoals = ({ goalsAPIInfo, refreshData }) => {
  const [shortTerm, setShortTerm] = useState();
  const [midTerm, setMidTerm] = useState();
  const [longTerm, setLongTerm] = useState();

  const { toast } = useToast();

  useEffect(() => {
    setShortTerm(shortTerm);
    setMidTerm(midTerm);
    setLongTerm(longTerm);
  }, [shortTerm, midTerm, longTerm]);

  const OnUpdateGoals = async () => {
    const result = await db
      .update(Goals)
      .set({
        shortTerm: shortTerm,
        midTerm: midTerm,
        longTerm: longTerm,
      })
      .where(eq(Goals.id, goalsAPIInfo?.id))
      .returning();

    if (result) {
      refreshData();
      toast({
        title: "Meta Atualizada",
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
            <DialogTitle>Update Meta</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">
                    Valor da meta curto prazo
                    <Input
                      placeholder="R$6000"
                      defaultValue={goalsAPIInfo?.shortTerm}
                      onChange={(e) => setShortTerm(e.target.value)}
                    />
                  </h2>
                  <h2 className="text-black font-medium my-1">
                    Valor da meta médio prazo
                    <Input
                      placeholder="R$6000"
                      defaultValue={goalsAPIInfo?.midTerm}
                      onChange={(e) => setMidTerm(e.target.value)}
                    />
                  </h2>
                  <h2 className="text-black font-medium my-1">
                    Valor da meta longo prazo
                    <Input
                      placeholder="R$6000"
                      defaultValue={goalsAPIInfo?.longTerm}
                      onChange={(e) => setLongTerm(e.target.value)}
                    />
                  </h2>
                </div>
                <Button
                  disabled={!(shortTerm && midTerm && longTerm)}
                  onClick={() => OnUpdateGoals()}
                  className="mt-5 w-full"
                >
                  Update Metas
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditGoals;
