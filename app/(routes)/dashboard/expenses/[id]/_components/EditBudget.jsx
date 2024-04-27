"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../../components/@/ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/@/ui/dialog";
import { useToast } from "../../../../../components/@/ui/use-toast";
import { Input } from "../../../../../components/@/ui/input";
import EmojiPicker from "emoji-picker-react";
import { eq } from "drizzle-orm";
import { Budgets } from "../../../../../../utils/schema";
import { db } from "../../../../../../utils/dbConfig";

const EditBudget = ({ budgetInfo, refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();

  const { toast } = useToast();

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
    setName(budgetInfo?.name);
  }, [budgetInfo]);

  const OnUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast({
        title: "Categoria editada",
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
            <DialogTitle>Editar Categoria</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  variant="outline"
                  size="lg"
                  className="text-lg"
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g Home decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!name}
                  onClick={() => OnUpdateBudget()}
                  className="mt-5 w-full"
                >
                  Editar Categoria
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
