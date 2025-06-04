"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/@/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Header from "../../_components/Header";
import { getBalanceUser } from "./services/getBalanceUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "./services/getTransactions";
import { getTransactionCategoriesBalance } from "./services/getTransactionCategorieBalance";
import { CustomTooltip } from "./_components/CustomTooltip";
import { deleteTransaction } from "./services/deleteTransaction";
import { useToast } from "../../components/@/ui/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../@/components/ui/popover";
import { Calendar } from "../../../@/components/ui/calendar";
import { Button } from "../../../@/components/ui/button";

import { startOfMonth, endOfMonth, setMonth, setYear } from "date-fns";
import { currentYear, monthLabels } from "./data/months";
import { formatPhoneNumber } from "react-phone-number-input";
import { useUser } from "../../contexts/UserContext";

export default function DashboardCards() {
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();
  const router = useRouter();

  const defaultStart = startOfMonth(
    setMonth(setYear(new Date(), anoAtual), mesAtual)
  );
  const defaultEnd = endOfMonth(defaultStart);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState<Date>(defaultStart);
  const [endDate, setEndDate] = useState<Date>(defaultEnd);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(mesAtual);
  const [filters, setFilters] = useState<{ startDate?: Date; endDate?: Date }>({
    startDate: defaultStart,
    endDate: defaultEnd,
  });
  const { user: me } = useUser();
  const [registeredByFilter, setRegisteredByFilter] = useState<
    "all" | "me" | "family"
  >("all");

  const handleMonthChange = (direction: "prev" | "next") => {
    let newIndex =
      direction === "prev" ? currentMonthIndex - 1 : currentMonthIndex + 1;
    if (newIndex < 0) newIndex = 11;
    if (newIndex > 11) newIndex = 0;

    const newStart = startOfMonth(
      setMonth(setYear(new Date(), currentYear), newIndex)
    );
    const newEnd = endOfMonth(newStart);

    setCurrentMonthIndex(newIndex);
    setStartDate(newStart);
    setEndDate(newEnd);
    setFilters({ startDate: newStart, endDate: newEnd });
    setPage(1);
  };

  const formattedStartDate = startDate
    ? format(startDate, "yyyy-MM-dd")
    : undefined;
  const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : undefined;

  const limit = 10;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: balanceUser, isPending } = useQuery({
    queryKey: ["user", filters],
    queryFn: () =>
      getBalanceUser({
        startDate: filters.startDate
          ? format(filters.startDate, "yyyy-MM-dd")
          : undefined,
        endDate: filters.endDate
          ? format(filters.endDate, "yyyy-MM-dd")
          : undefined,
      }),
  });

  const {
    data: transactionsData = { transactions: [], hasNextPage: false },
    isPending: isTransactionsLoading,
  } = useQuery({
    queryKey: ["transactions", page, filters, registeredByFilter],
    queryFn: () =>
      getTransactions({
        page,
        limit,
        startDate: filters.startDate
          ? format(filters.startDate, "yyyy-MM-dd")
          : undefined,
        endDate: filters.endDate
          ? format(filters.endDate, "yyyy-MM-dd")
          : undefined,
        registeredBy:
          registeredByFilter === "all"
            ? undefined
            : registeredByFilter === "me"
            ? me?.phone
            : "family",
      }),
  });

  const transactions = transactionsData.transactions;
  const hasNextPage = transactionsData.hasNextPage;

  const { data: categoryBalances = [], isPending: isCategoriesLoading } =
    useQuery({
      queryKey: ["transaction-categories", "DEBIT", filters],
      queryFn: () =>
        getTransactionCategoriesBalance({
          transactionType: "DEBIT",
          startDate: filters.startDate
            ? format(filters.startDate, "yyyy-MM-dd")
            : undefined,
          endDate: filters.endDate
            ? format(filters.endDate, "yyyy-MM-dd")
            : undefined,
        }),
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

  const chartData = categoryBalances.map((cat) => ({
    name: cat.name,
    value: cat.amount,
    percent: ((cat.amount / totalCategoryAmount) * 100).toFixed(2),
    cor: cat.color || "#999999",
  }));
  console.log(me);
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

        <div className="flex gap-4 flex-wrap mb-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap gap-4 mb-6">
            {me?.sharedWithPhones.length > 0 && (
              <div className="flex-1 sm:flex-none">
                <label className="text-sm font-medium block mb-1">
                  Cadastrado por:
                </label>
                <select
                  value={registeredByFilter}
                  onChange={(e) => {
                    setRegisteredByFilter(
                      e.target.value as "all" | "me" | "family"
                    );
                    setPage(1);
                  }}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option value="all">Todos</option>
                  <option value="me">Você</option>
                  <option value="family">Familiar</option>
                </select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium block mb-1">De:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start text-left"
                  >
                    {startDate
                      ? format(startDate, "dd/MM/yyyy")
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="rounded-md border bg-white shadow"
                    classNames={{
                      day: "w-9 h-9 text-sm",
                      nav_button: "text-zinc-700 hover:bg-zinc-100 p-1 rounded",
                      nav: "flex justify-between items-center px-2 py-2",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Até:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start text-left"
                  >
                    {endDate
                      ? format(endDate, "dd/MM/yyyy")
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="rounded-md border bg-white shadow"
                    classNames={{
                      day: "w-9 h-9 text-sm",
                      nav_button: "text-zinc-700 hover:bg-zinc-100 p-1 rounded",
                      nav: "flex justify-between items-center px-2 py-2",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2 sm:items-end">
              <Button
                onClick={() => {
                  setPage(1);
                  setFilters({ startDate, endDate });
                }}
                disabled={!startDate || !endDate}
                className="h-10 px-4"
              >
                Filtrar
              </Button>
              <Button
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                  setFilters({});
                  setPage(1);
                }}
                variant="ghost"
                className="h-10 px-4 text-red-500"
                disabled={!filters.startDate && !filters.endDate}
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* ✅ Navegação por mês (mobile) */}
        <div className="flex items-center justify-center gap-2 sm:hidden">
          <button
            onClick={() => handleMonthChange("prev")}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 rounded-lg border text-sm font-medium bg-white text-[#2D2D2D]">
            {monthLabels[currentMonthIndex]}
          </span>
          <button
            onClick={() => handleMonthChange("next")}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ✅ Navegação por mês (desktop) */}
        <div className="hidden sm:flex flex-wrap gap-2">
          {monthLabels.map((monthName, index) => {
            const monthStart = startOfMonth(
              setMonth(setYear(new Date(), currentYear), index)
            );
            const monthEnd = endOfMonth(monthStart);

            const isActive =
              filters.startDate?.getMonth() === index &&
              filters.endDate?.getMonth() === index;

            return (
              <button
                key={index}
                onClick={() => {
                  setStartDate(monthStart);
                  setEndDate(monthEnd);
                  setFilters({ startDate: monthStart, endDate: monthEnd });
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-lg border text-sm transition ${
                  isActive
                    ? "bg-[#2F855A] text-white border-[#2F855A]"
                    : "bg-white text-[#2D2D2D] hover:bg-gray-100 border-gray-300"
                }`}
              >
                {monthName}
              </button>
            );
          })}
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
                      className="border rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                    >
                      <div className="flex-1">
                        {item.registeredBy && (
                          <span
                            className={`text-[10px] inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium
                              ${
                                item.registeredBy === me?.phone
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }
                            `}
                          >
                            {item.registeredBy === me?.phone ? (
                              <>
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                                Cadastrado por você
                              </>
                            ) : (
                              <>
                                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                                Cadastrado por familiar
                              </>
                            )}
                          </span>
                        )}

                        <p className="font-medium text-[#2D2D2D]">
                          {item.description}
                        </p>
                        <div className="flex gap-2 mt-1 items-center flex-wrap">
                          <span className="text-xs text-muted-foreground font-mono">
                            {item.identifier}
                          </span>

                          <span
                            className="text-xs px-2 py-0.5 rounded-full text-white"
                            style={{
                              backgroundColor: item.categoryColor || "#999999",
                            }}
                          >
                            {item.categoryName}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end min-w-[100px]">
                        <p
                          className={`font-semibold text-sm ${
                            item.type === "CREDIT"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          R$ {item.amount.toFixed(2)}
                        </p>

                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {format(
                            utcToZonedTime(item.transactionAt, "UTC"),
                            "dd/MM/yyyy",
                            { locale: ptBR }
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteMutation.mutate(item.id)}
                        title="Excluir transação"
                        className="self-end sm:self-auto ml-0 sm:ml-4 p-2 rounded-full border border-transparent hover:border-red-200 hover:bg-red-50 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-zinc-500" />
                      </button>
                      <button
                        onClick={() => router.push(`/transaction/${item.id}`)}
                        title="Editar transação"
                        className="self-end sm:self-auto ml-2 p-2 rounded-full border border-transparent hover:border-blue-200 hover:bg-blue-50 transition-colors duration-200"
                      >
                        <Pencil className="w-4 h-4 text-zinc-500" />
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
                  className="text-sm font-medium text-[#2F855A] disabled:opacity-40"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!hasNextPage}
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
