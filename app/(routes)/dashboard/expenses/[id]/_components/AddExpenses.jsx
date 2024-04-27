import React, { useState } from "react";
import { Input } from "../../../../../components/@/ui/input";
import { Button } from "../../../../../components/@/ui/button";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { useToast } from "../../../../../components/@/ui/use-toast";
import moment from "moment";

const AddExpenses = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { toast } = useToast();

  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId?.id,
        createdAt: moment().format("DD/MM/yyy"),
        createdBy: user?.primaryEmailAddress.emailAddress,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast({
        title: "Gasto criado",
      });
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg"></h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Nome do gasto</h2>
        <Input placeholder="Ifood" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Valor do gasto</h2>
        <Input placeholder="0" onChange={(e) => setAmount(e.target.value)} />
      </div>
      <Button
        onClick={() => addNewExpense()}
        disabled={!(name && amount)}
        className="mt-3 w-full"
      >
        Add novo gasto
      </Button>
    </div>
  );
};

export default AddExpenses;
