"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/@/ui/card";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Header from "../../_components/Header";
import { getBalanceUser } from "./services/getBalanceUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "./services/getTransactions";
import { getTransactionCategoriesBalance } from "./services/getTransactionCategorieBalance";
import { CustomTooltip } from "./_components/CustomTooltip";
import { deleteTransaction } from "./services/deleteTransaction";
import { useToast } from "../../components/@/ui/use-toast";

export default function DashboardCards() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { data: balanceUser, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getBalanceUser,
  });

  const { data: transactions = [], isPending: isTransactionsLoading } =
    useQuery({
      queryKey: ["transactions", page],
      queryFn: () => getTransactions({ page, limit }),
    });

  const { data: categoryBalances = [], isPending: isCategoriesLoading } =
    useQuery({
      queryKey: ["transaction-categories", "DEBIT"],
      queryFn: () => getTransactionCategoriesBalance("DEBIT"),
    });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({
        queryKey: ["transaction-categories", "DEBIT"],
      });
      setDeleteId(null);
      toast({
        title: "Transação excluída",
        description: "A transação foi removida com sucesso.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a transação.",
        variant: "destructive",
      });
    },
  });

  const totalCategoryAmount = categoryBalances.reduce(
    (sum, c) => sum + c.amount,
    0
  );

  const categoryColors: Record<string, string> = {
    Alimentação: "#2F855A",
    "Cuidados pessoais": "#7F56D9",
    Casa: "#F6AD55",
    Doações: "#ED8936",
    Educação: "#3182CE",
    Impostos: "#E53E3E",
    Lazer: "#D69E2E",
    Mercado: "#38A169",
    Pets: "#B7791F",
    Saúde: "#805AD5",
    Transporte: "#ECC94B",
    Utilidades: "#4A5568",
    Outros: "#A0AEC0",
    Viagem: "#2B6CB0",
    Vestuário: "#D53F8C",
  };
  const chartData = categoryBalances.map((cat) => ({
    name: cat.name,
    value: cat.amount,
    percent: ((cat.amount / totalCategoryAmount) * 100).toFixed(2),
    cor: categoryColors[cat.name] || "#999999",
  }));

  return (
    <>
      <Header />
      <div className="p-6 space-y-6 bg-[#FDF6EC] min-h-screen text-[#2D2D2D]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-600">Receitas</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                {isPending ? (
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                ) : (
                  <p className="text-green-600 text-xl font-semibold flex items-center gap-1">
                    <ArrowUp className="w-4 h-4" /> R$
                    {balanceUser?.profit.toFixed(2)}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  1 De Maio - 31 De Maio
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600">Despesas</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-red-600 text-xl font-semibold flex items-center gap-1">
                  <ArrowDown className="w-4 h-4" /> R$
                  {isPending ? (
                    <span className="h-6 bg-gray-200 rounded w-24 animate-pulse inline-block" />
                  ) : (
                    balanceUser?.debt.toFixed(2)
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-blue-600">
                Saldo Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-600 text-xl font-semibold">
                {isPending ? (
                  <span className="h-6 bg-gray-200 rounded w-24 animate-pulse inline-block" />
                ) : (
                  `R$ ${balanceUser?.balance.toFixed(2)}`
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Transações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isTransactionsLoading
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border rounded-lg px-4 py-3 animate-pulse"
                    >
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                        <div className="flex gap-2">
                          <div className="h-3 w-8 bg-gray-200 rounded" />
                          <div className="h-3 w-16 bg-gray-200 rounded" />
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                        <div className="h-3 w-20 bg-gray-100 rounded" />
                      </div>
                    </div>
                  ))
                : transactions.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border rounded-lg px-4 py-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-[#2D2D2D]">
                          {item.description}
                        </p>
                        <div className="flex gap-2 mt-1 items-center">
                          <span className="text-xs text-muted-foreground font-mono">
                            {item.identifier}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full text-white"
                            style={{
                              backgroundColor:
                                categoryColors[item.categoryName] || "#999999",
                            }}
                          >
                            {item.categoryName}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end min-w-[100px]">
                        <p
                          className={`font-semibold text-sm whitespace-nowrap ${
                            item.type === "CREDIT"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          R$ {item.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(item.transactionAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
                        title="Excluir transação"
                        className="ml-4 p-2 rounded-full border border-transparent hover:border-red-200 hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2
                          className="w-4 h-4"
                          style={{ color: "#71717a" }}
                        />
                      </button>
                    </div>
                  ))}
              <div className="flex justify-end items-center gap-4 pt-4">
                <button
                  className="text-sm font-medium text-[#2F855A] disabled:opacity-40"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </button>
                <span className="text-sm">Página {page}</span>
                <button
                  className="text-sm font-medium text-[#2F855A]"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Próxima
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              {isCategoriesLoading ? (
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
              ) : (
                <CardTitle className="text-base font-semibold">
                  Gráfico de Despesas
                </CardTitle>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {isCategoriesLoading ? (
                <div className="flex flex-col lg:flex-row gap-6 items-center justify-center h-[320px] border border-dashed border-gray-300 rounded-lg p-4">
                  {/* Donut chart skeleton */}
                  <div className="relative w-[180px] h-[180px] flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-gray-200 animate-pulse" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="h-6 w-20 bg-gray-300 rounded mb-2" />
                      <div className="h-4 w-12 bg-gray-200 rounded" />
                    </div>
                  </div>

                  {/* Legend skeleton */}
                  <div className="space-y-4 w-full max-w-[200px]">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-300 rounded-sm" />
                          <div className="h-4 w-24 bg-gray-300 rounded" />
                        </div>
                        <div className="text-right space-y-1">
                          <div className="h-4 w-16 bg-gray-200 rounded" />
                          <div className="h-3 w-12 bg-gray-100 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={2}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.cor} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xl font-bold"
                      >
                        R$ {totalCategoryAmount.toFixed(2)}
                      </text>
                      <text
                        x="50%"
                        y="58%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-sm text-muted-foreground"
                      >
                        Total
                      </text>
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Legend */}
                  <div className="space-y-2">
                    {chartData.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm items-center"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-sm"
                            style={{ backgroundColor: item.cor }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            R$ {item.value.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.percent}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
