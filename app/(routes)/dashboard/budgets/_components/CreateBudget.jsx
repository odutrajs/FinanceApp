"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/@/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "../../../../components/@/ui/button";
import { Input } from "../../../../components/@/ui/input";
import { Budgets } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { useToast } from "../../../../components/@/ui/use-toast";

const CreateBudget = ({ refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();

  const { toast } = useToast();

  const { user } = useUser();

  const OnCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        createdBy: user?.primaryEmailAddress.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });
    if (result) {
      refreshData();
      toast({
        title: "Categoria criada",
      });
    }
  };
  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
              <h2 className="text-3xl">+</h2>
              <h2>Criar nova categoria</h2>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar nova categoria</DialogTitle>
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
                    <h2 className="text-black font-medium my-1">
                      Nome da categoria
                    </h2>
                    <Input
                      placeholder="ex: Comida"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <Button
                    disabled={!name}
                    onClick={() => OnCreateBudget()}
                    className="mt-5 w-full"
                  >
                    Criar categoria
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateBudget;
