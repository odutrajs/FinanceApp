"use client";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { and, eq, getTableColumns, gte, lte, sql } from "drizzle-orm";
import {
  Budgets,
  Contribution,
  Expenses,
  Goals,
  Investiment,
  Wage,
} from "../../../utils/schema";
import { db } from "../../../utils/dbConfig";
import BarChartDashboard from "./_components/BarChart";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/[id]/_components/ExpenseListTable";

import { formatDateToBrazilian } from "../../../utils/formatBrasilianDate";

const Dashboard = () => {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState();
  const [expenseList, setExpenseList] = useState();
  const [wage, setWage] = useState();
  const [investiment, setInvestment] = useState();
  const [income, setIncome] = useState();
  const [contribution, setContribution] = useState();
  const [goal, setGoal] = useState();
  const [dailyCDIRate, setDailyCDIRate] = useState();
  const [shortTerm, setShortTerm] = useState();
  const [midTerm, setMidTerm] = useState();
  const [longTerm, setLongTerm] = useState();
  const [expenseMonth, setExpenseMonth] = useState();
  console.log("expenseMonth", expenseMonth);

  useEffect(() => {
    user && getBudgetList();
    getWage();
    getInvestiment();
    getContribution();
    getGoals();
    getExpensePerDate();
  }, [user]);

  useEffect(() => {
    fetchCDIRate();
  }, []);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress));

    setExpenseList(result);
  };

  const getWage = async () => {
    const result = await db
      .select()
      .from(Wage)
      .where(eq(Wage.createdBy, user?.primaryEmailAddress?.emailAddress));
    setWage(result);
  };
  const getContribution = async () => {
    const result = await db
      .select()
      .from(Contribution)
      .where(
        eq(Contribution.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setContribution(result[0]?.value);
  };

  const getInvestiment = async () => {
    const result = await db
      .select()
      .from(Investiment)
      .where(
        eq(Investiment.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setInvestment(result);
    calculateMonthlyReturn(result[0]?.value);
  };
  const getGoals = async () => {
    const result = await db
      .select()
      .from(Goals)
      .where(eq(Goals.createdBy, user?.primaryEmailAddress?.emailAddress));
    setGoal(result);
  };

  const getExpensePerDate = async () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const startOfMonthFormatted = formatDateToBrazilian(
      startOfMonth.toISOString().split("T")[0]
    );
    const endOfDayFormatted = formatDateToBrazilian(
      endOfDay.toISOString().split("T")[0]
    );

    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Expenses)
      .where(
        and(
          eq(Expenses.createdBy, user?.primaryEmailAddress.emailAddress),
          gte(Expenses.createdAt, startOfMonthFormatted),
          lte(Expenses.createdAt, endOfDayFormatted)
        )
      )
      .execute();

    setExpenseMonth(result);
  };

  async function fetchCDIRate() {
    try {
      const response = await axios.get(
        "https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados?formato=json"
      );
      const cdiRate = parseFloat(
        response?.data[response.data.length - 1].valor
      );
      setDailyCDIRate(cdiRate / 100);
      return cdiRate / 100;
    } catch (error) {
      console.error("Erro ao buscar a taxa do CDI:", error);
      return null;
    }
  }

  async function calculateMonthlyReturn(principal, daysInMonth = 22) {
    try {
      const dailyCDIRate = await fetchCDIRate();
      if (dailyCDIRate === null) {
        throw new Error("Não foi possível obter a taxa do CDI.");
      }

      const monthlyRate = (1 + dailyCDIRate) ** daysInMonth - 1;
      const monthlyReturn = principal * (1 + monthlyRate) - principal;
      setIncome(monthlyReturn.toFixed(2));
    } catch (error) {
      console.error("Erro ao calcular o retorno mensal:", error);
    }
  }

  useEffect(() => {
    if (
      dailyCDIRate !== undefined &&
      investiment?.length > 0 &&
      goal?.length > 0
    ) {
      let months = 0;
      let currentInvestment = parseFloat(investiment[0]?.value);

      if (isNaN(currentInvestment) || currentInvestment <= 0) {
        console.error("Valor inicial de investimento inválido");
        return;
      }

      let daysInMonth = 23;
      const targetGoal = parseFloat(goal[0]?.shortTerm);

      while (currentInvestment < targetGoal) {
        const monthlyRate = (1 + dailyCDIRate) ** daysInMonth - 1;
        const monthlyReturn = currentInvestment * monthlyRate;

        currentInvestment += monthlyReturn + (parseFloat(contribution) || 0);

        months++;
      }

      setShortTerm(months);
      console.log(
        `Serão necessários ${months} meses para atingir R$ ${targetGoal}`
      );
    }
  }, [dailyCDIRate, investiment, goal, contribution]);

  useEffect(() => {
    if (
      dailyCDIRate !== undefined &&
      investiment?.length > 0 &&
      goal?.length > 0
    ) {
      let months = 0;
      let currentInvestment = parseFloat(investiment[0]?.value);

      if (isNaN(currentInvestment) || currentInvestment <= 0) {
        console.error("Valor inicial de investimento inválido");
        return;
      }

      let daysInMonth = 23;
      const targetGoal = parseFloat(goal[0]?.midTerm);

      while (currentInvestment < targetGoal) {
        const monthlyRate = (1 + dailyCDIRate) ** daysInMonth - 1;
        const monthlyReturn = currentInvestment * monthlyRate;

        currentInvestment += monthlyReturn + (parseFloat(contribution) || 0);

        months++;
      }

      setMidTerm(months);
      console.log(
        `Serão necessários ${months} meses para atingir R$ ${targetGoal}`
      );
    }
  }, [dailyCDIRate, investiment, goal, contribution]);

  useEffect(() => {
    if (
      dailyCDIRate !== undefined &&
      investiment?.length > 0 &&
      goal?.length > 0
    ) {
      let months = 0;
      let currentInvestment = parseFloat(investiment[0]?.value);

      if (isNaN(currentInvestment) || currentInvestment <= 0) {
        console.error("Valor inicial de investimento inválido");
        return;
      }

      let daysInMonth = 23;
      const targetGoal = parseFloat(goal[0]?.longTerm);

      while (currentInvestment < targetGoal) {
        const monthlyRate = (1 + dailyCDIRate) ** daysInMonth - 1;
        const monthlyReturn = currentInvestment * monthlyRate;

        currentInvestment += monthlyReturn + (parseFloat(contribution) || 0);

        months++;
      }

      setLongTerm(months);
      console.log(
        `Serão necessários ${months} meses para atingir R$ ${targetGoal}`
      );
    }
  }, [dailyCDIRate, investiment, goal, contribution]);

  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName} </h2>
      <p className="text-gray-500">
        Aqui está sua administração do dinheiro, faça sua gestão
      </p>
      <CardInfo
        budgetList={budgetList}
        wage={wage}
        investiment={investiment}
        income={income}
        contribution={contribution}
        shortTerm={shortTerm}
        shortTermGoal={goal && goal[0]?.shortTerm}
        midTermGoal={goal && goal[0]?.midTerm}
        midTerm={midTerm}
        longTermGoal={goal && goal[0]?.longTerm}
        longTerm={longTerm}
        expenseMonth={expenseMonth && expenseMonth}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable
            expensesList={expenseList}
            refresData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Últimos gastos</h2>
          {budgetList?.map((item, index) => (
            <BudgetItem budget={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
