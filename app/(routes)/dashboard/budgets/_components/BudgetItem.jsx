import Link from "next/link";
import React from "react";

const BudgetItem = ({ budget }) => {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc.toFixed(2); // Aqui retornamos o valor real, mesmo que seja maior que 100
  };

  const progressPercentage = calculateProgressPerc();
  const progressBarColor =
    progressPercentage > 100 ? "bg-red-600" : "bg-blue-600"; // Define a cor baseada no percentual

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 bg-slate-100 rounded-full px-4">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="text-sm text-gray-500">{budget.name}</h2>
              <h2>{budget.totalItem} Item</h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">R${budget.amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              R${budget.totalSpend ? budget.totalSpend : 0} Gasto
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className={`${progressBarColor} h-2 rounded-full`}
              style={{
                width: `${Math.min(progressPercentage, 100)}%`, // Limita o comprimento da barra a 100%
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
