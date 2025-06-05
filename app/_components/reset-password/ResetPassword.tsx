"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../components/@/ui/use-toast";
import { api } from "../../../configs/api";

const schema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast({
        title: "Token ausente",
        description: "O link de redefinição é inválido.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await api.post("/user/reset-password", {
        token,
        password: data.password,
      });

      toast({
        title: "Senha redefinida com sucesso!",
        description: "Você já pode fazer login com a nova senha.",
      });

      router.push("/sign-in");
    } catch (error: any) {
      toast({
        title: "Erro ao redefinir senha",
        description:
          error.response?.data?.error || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Redefinir senha
        </h2>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Nova senha
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="password"
                type="password"
                className={`w-full px-4 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#2F855A]"
                }`}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            Confirmar nova senha
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="confirmPassword"
                type="password"
                className={`w-full px-4 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#2F855A]"
                }`}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2F855A] hover:bg-[#276749]"
          }`}
        >
          {loading ? "Enviando..." : "Redefinir Senha"}
        </button>
      </form>
    </div>
  );
}
