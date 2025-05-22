"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../components/@/ui/use-toast";
import { getTransactionById } from "./services/getTransactionById";
import Header from "../../../_components/Header";
import { Button } from "../../../../@/components/ui/button";
import { getCategories } from "../../categories/service/getCategory";
import { updateTransaction } from "./services/updateTransaction";

export type TransactionForm = {
  description: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  transactionDate: string;
  categoryId: string;
};

export default function EditTransactionPage() {
  const params = useParams();
  const transactionId = params.id as string;
  const router = useRouter();
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionForm>({
    defaultValues: {
      description: "",
      amount: 0,
      type: "DEBIT",
      transactionDate: "",
      categoryId: "",
    },
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: !!transactionId,
  });

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (isSuccess && data) {
      reset({
        description: data.description,
        amount: data.amount,
        type: data.type,
        transactionDate: data.transactionDate.slice(0, 10),
        categoryId: data.categoryId,
      });
    }
  }, [isSuccess, data, reset]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      toast({
        title: "Transação atualizada",
        description: "Alterações salvas com sucesso!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push("/dashboard");
    },
    onError: (err: any) => {
      toast({
        title: "Erro ao atualizar",
        description: err.message || "Erro inesperado.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (formData: TransactionForm) => {
    if (!transactionId) return;
    mutate({ ...formData, id: transactionId });
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-[#FDF6EC] min-h-screen flex justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="px-6 pt-4 w-full max-w-6xl mx-auto">
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-gray-700 text-white hover:bg-gray-800 transition"
            >
              ← Voltar para o Dashboard
            </Button>
          </div>
          <h1 className="text-xl font-semibold text-[#2D2D2D]">
            Editar Transação
          </h1>

          {isLoading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-10 bg-gray-200 rounded-xl" />
              <div className="h-10 bg-green-400 rounded-xl" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Descrição obrigatória" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                      errors.description
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-green-500"
                    }`}
                    placeholder="Descrição"
                  />
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}

              <Controller
                name="amount"
                control={control}
                rules={{ required: "Valor é obrigatório" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    step="0.01"
                    className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                      errors.amount
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-green-500"
                    }`}
                    placeholder="Valor"
                  />
                )}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}

              <Controller
                name="transactionDate"
                control={control}
                rules={{ required: "Data obrigatória" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                      errors.transactionDate
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-green-500"
                    }`}
                  />
                )}
              />
              {errors.transactionDate && (
                <p className="text-sm text-red-500">
                  {errors.transactionDate.message}
                </p>
              )}

              <Controller
                name="type"
                control={control}
                rules={{ required: "Tipo obrigatório" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full border rounded-xl px-3 h-11 focus:outline-none focus:ring-2 ${
                      errors.type
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-green-500"
                    }`}
                  >
                    <option value="CREDIT">Receita</option>
                    <option value="DEBIT">Despesa</option>
                  </select>
                )}
              />
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}

              <Controller
                name="categoryId"
                control={control}
                rules={{ required: "Categoria obrigatória" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full border rounded-xl px-3 h-11 focus:outline-none focus:ring-2 ${
                      errors.categoryId
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-green-500"
                    }`}
                  >
                    <option value="" disabled>
                      {loadingCategories
                        ? "Carregando categorias..."
                        : "Selecione uma categoria"}
                    </option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#276749] text-white hover:bg-[#2F855A]"
              >
                {isPending ? "Salvando..." : "Salvar alterações"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
