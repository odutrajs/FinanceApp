"use client";

import { useForm, Controller } from "react-hook-form";
import Header from "../../_components/Header";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/@/ui/card";
import { Input } from "../../components/@/ui/input";
import { Button } from "../../../@/components/ui/button";
import { useToast } from "../../components/@/ui/use-toast";
import { createCategory } from "./service/createCategory";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategories } from "./service/getCategory";
import { queryClient } from "../../../configs/query";

export type FormValues = {
  name: string;
};

export default function CreateCategoryPage() {
  const router = useRouter();
  const { toast } = useToast();

  const { control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { name: "" },
  });

  const { errors } = formState;

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast({
        title: "Categoria criada",
        description: `Categoria '${data.name}' criada com sucesso!`,
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => {
      toast({
        title: "Erro ao criar categoria",
        description: err.response?.data?.error || "Erro inesperado",
        variant: "destructive",
      });
    },
  });

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log(categories);

  const onSubmit = (data: FormValues) => mutation.mutate(data.name);

  return (
    <>
      <Header />
      <div className="p-6 bg-[#FDF6EC] min-h-screen flex flex-col items-center gap-6">
        <div className="px-6 pt-4 w-full max-w-6xl mx-auto">
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-gray-700 text-white hover:bg-gray-800 transition"
          >
            ← Voltar para o Dashboard
          </Button>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Nova Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#2D2D2D]">
                  Nome da categoria
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Categoria é obrigatória" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-green-500"
                      }`}
                      placeholder="Digite o nome da categoria"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-[#276749] text-white hover:bg-[#2F855A]"
              >
                {mutation.isPending ? "Salvando..." : "Criar categoria"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold mb-3 text-[#2D2D2D]">
            Minhas Categorias
          </h2>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : categories?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhuma categoria encontrada.
            </p>
          ) : (
            <div className="space-y-2">
              {categories?.map((cat: any) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-lg border shadow-sm bg-white"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm font-medium text-[#2D2D2D]">
                      {cat.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
