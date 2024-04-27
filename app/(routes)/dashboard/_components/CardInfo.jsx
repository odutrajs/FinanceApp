import { PiggyBank, ReceiptText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatToBRL } from "../../../../utils/formatToReal";

const CardInfo = ({
  budgetList,
  wage,
  investiment,
  income,
  contribution,
  shortTerm,
  shortTermGoal,
  midTerm,
  midTermGoal,
  longTerm,
  longTermGoal,
  expenseMonth,
}) => {
  const [totalExepenseMonth, setTotalExpenseMonth] = useState();
  const [howMuchCanISpend, setHowMuchCanISpend] = useState();

  let yearShortTerm = (shortTerm / 12).toFixed(1);
  let yearMidTerm = (midTerm / 12).toFixed(1);
  let yearLongTerm = (longTerm / 12).toFixed(1);

  useEffect(() => {
    CalculateSUMExpensesMonth();
  }, [budgetList]);

  const CalculateSUMExpensesMonth = () => {
    let totalExpenses_ = 0;
    expenseMonth?.forEach((expense) => {
      totalExpenses_ += Number(expense.amount);
    });
    setTotalExpenseMonth(totalExpenses_);
    setHowMuchCanISpend(
      contribution &&
        wage &&
        totalExpenses_ &&
        Number(wage[0]?.value - (Number(contribution) + Number(totalExpenses_)))
    );
  };

  return (
    <div>
      {budgetList && wage ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Total gasto no mês</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(totalExepenseMonth)}
              </h2>
            </div>
            <ReceiptText className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>

          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Salário mensal</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(wage && wage[0]?.value)}
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Quanto posso gastar no mês ?</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(howMuchCanISpend && howMuchCanISpend)}
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Investimento no banco</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(investiment && investiment[0]?.value)}
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Rendimento mensal banco</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(income && income)}
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">Aporte mensal</h2>
              <h2 className="font-bold text-2xl">
                {formatToBRL(contribution && contribution)}
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">
                Tempo para atingir a meta de {formatToBRL(shortTermGoal)}
              </h2>
              <h2 className="font-bold text-2xl">
                {shortTerm} Meses / {yearShortTerm} Anos
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">
                Tempo para atingir a meta de {formatToBRL(midTermGoal)}
              </h2>
              <h2 className="font-bold text-2xl">
                {midTerm} Meses / {yearMidTerm} Anos
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex item-center justify-between">
            <div>
              <h2 className="text-sm">
                Tempo para atingir a meta de {formatToBRL(longTermGoal)}
              </h2>
              <h2 className="font-bold text-2xl">
                {longTerm} Meses / {yearLongTerm} Anos
              </h2>
            </div>
            <PiggyBank className="bg-blue-500 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <div
              key={index}
              className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
