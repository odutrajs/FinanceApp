import { Trash } from "lucide-react";
import React from "react";
import { db } from "../../../../../../utils/dbConfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useToast } from "../../../../../components/@/ui/use-toast";

const ExpenseListTable = ({ expensesList, refresData }) => {
  const { toast } = useToast();

  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    if (result) {
      toast({
        title: "Expense Deleted",
      });
      refresData();
    }
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-4 bg-slate-200">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>

      {expensesList?.map((expense, index) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2" key={index}>
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{expense.createdAt}</h2>
          <h2>
            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(expense)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
