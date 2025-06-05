"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "../../components/@/ui/use-toast";
import { api } from "../../../configs/api";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [disabledUntil, setDisabledUntil] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const isButtonDisabled =
    loading || (disabledUntil !== null && Date.now() < disabledUntil);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      await api.post("/user/forgot-password", { email: data.email });

      toast({
        title: "Verifique seu e-mail 📬",
        description: "Enviamos um link para redefinir sua senha.",
      });

      setDisabledUntil(Date.now() + 2 * 60 * 1000); // 2 minutos
    } catch (error: any) {
      toast({
        title: "Erro ao enviar e-mail",
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
          Esqueceu sua senha?
        </h2>

        <div className="mb-6">
          <label htmlFor="email" className="block font-medium mb-1">
            Digite seu e-mail
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                className={`w-full px-4 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#2F855A]"
                }`}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2F855A] hover:bg-[#276749]"
          }`}
        >
          {loading
            ? "Enviando..."
            : disabledUntil && Date.now() < disabledUntil
            ? "Confira seu email"
            : "Enviar link de redefinição"}
        </button>
      </form>
    </div>
  );
}
