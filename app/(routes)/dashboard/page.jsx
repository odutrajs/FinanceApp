"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/@/ui/card";
import { ArrowDown, ArrowUp, Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Header from "../../_components/Header";

export default function DashboardCards() {
  const receitas = 20;
  const despesas = 116.4;
  const saldoAtual = 17828.6;

  const transacoes = [
    {
      titulo: "Doação Hoje",
      valor: 44.0,
      tipo: "despesa",
      categoria: "Doações",
      data: "01/05/2025",
      cor: "#06b6d4",
    },
    {
      titulo: "Farmácia",
      valor: 35.0,
      tipo: "despesa",
      categoria: "Saúde",
      data: "01/05/2025",
      cor: "#facc15",
    },
    {
      titulo: "Shampoo",
      valor: 12.4,
      tipo: "despesa",
      categoria: "Cuidados Pessoais",
      data: "01/05/2025",
      cor: "#9333ea",
    },
    {
      titulo: "Uber",
      valor: 5.0,
      tipo: "despesa",
      categoria: "Transporte",
      data: "01/05/2025",
      cor: "#047857",
    },
    {
      titulo: "Remédio 2",
      valor: 20.0,
      tipo: "despesa",
      categoria: "Saúde",
      data: "01/05/2025",
      cor: "#facc15",
    },
    {
      titulo: "Recebido Valor",
      valor: 20.0,
      tipo: "receita",
      categoria: "Outros",
      data: "01/05/2025",
      cor: "#000000",
    },
  ];

  const despesasTotais = transacoes.filter((t) => t.tipo === "despesa");
  const totalDespesas = despesasTotais.reduce((sum, t) => sum + t.valor, 0);

  const despesasPorCategoria = despesasTotais.reduce((acc, curr) => {
    if (!acc[curr.categoria]) {
      acc[curr.categoria] = { name: curr.categoria, value: 0, cor: curr.cor };
    }
    acc[curr.categoria].value += curr.valor;
    return acc;
  }, {});

  const chartData = Object.values(despesasPorCategoria).map((item) => ({
    ...item,
    percent: ((item.value / totalDespesas) * 100).toFixed(2),
  }));

  return (
    <>
      <Header />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-600">Receitas</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-green-600 text-xl font-semibold flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" /> R$ {receitas.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 De Maio - 31 De Maio
                </p>
              </div>
              <Eye className="text-muted-foreground w-4 h-4" />
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-600">Despesas</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="text-red-600 text-xl font-semibold flex items-center gap-1">
                  <ArrowDown className="w-4 h-4" /> R$ {despesas.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 De Maio - 31 De Maio
                </p>
              </div>
              <Eye className="text-muted-foreground w-4 h-4" />
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
                R$ {saldoAtual.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Até 31 De Maio
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
              {transacoes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{item.titulo}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">TH</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                        Pago
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full text-white`}
                        style={{ backgroundColor: item.cor }}
                      >
                        {item.categoria}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${
                        item.tipo === "receita"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      R$ {item.valor.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.data}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Gráfico de Despesas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name} (${percent}%)`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
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
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">R$ {item.value.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.percent}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
