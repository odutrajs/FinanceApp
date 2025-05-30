"use client";

import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "../../../_components/Header";
import { formatCellphone } from "../../../../utils/formatCellphone";
import { createUser, CreateUserMessageError } from "../../services/create-user";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../components/@/ui/use-toast";
import { maskCellphone } from "../../../../utils/maskCellphone";
import { useCreateStripeSession } from "../../hooks/useCreateCheckoutSession";
import { SignUpPayload, SignUpResponse } from "../../services/create-user";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmarSenha: string;
  paymentRecurrent: "MONTHLY" | "ANNUALLY";
};

const SignUpFlow = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const { mutateAsync: startCheckoutSession } = useCreateStripeSession();

  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmarSenha: "",
      paymentRecurrent: "MONTHLY",
    },
  });

  const { mutateAsync: createUserMutate } = useMutation<
    SignUpResponse,
    AxiosError<CreateUserMessageError>,
    SignUpPayload
  >({
    mutationFn: createUser,
    onError: (error) => {
      const errorMessage = error.response?.data?.error;
      toast({
        title: "❌ Erro ao criar usuário",
        description:
          errorMessage ||
          "Email ou telefone já utilizados, volte uma etapa e mude os campos",
        variant: "destructive",
      });
    },
  });

  const nomeRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const payload = {
      ...data,
      phone: formatCellphone(data.phone),
    };

    let userId: string | null = null;

    try {
      // Tenta criar o usuário
      const user = await createUser(payload);
      userId = user.userId;
    } catch (error) {
      const axiosError = error as AxiosError<CreateUserMessageError>;
      const errorMessage = axiosError.response?.data?.error;

      // Se o erro for de e-mail já cadastrado, tenta continuar com o pagamento
      if (errorMessage === "E-mail já cadastrado") {
        try {
          const existingUser = await createUser(payload);
          userId = existingUser.userId;
        } catch {
          toast({
            title: "❌ Erro",
            description: "Não foi possível recuperar usuário existente.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      } else {
        toast({
          title: "❌ Erro ao criar usuário",
          description: errorMessage || "Erro inesperado.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const { sessionUrl } = await startCheckoutSession({
        userId,
        paymentRecurrent: getValues("paymentRecurrent"),
      });

      window.location.href = sessionUrl;
    } catch (e) {
      toast({
        title: "❌ Erro ao iniciar pagamento",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const stepFields: Record<number, (keyof FormData)[] | undefined> = {
      1: ["name"],
      2: ["email"],
      3: ["phone"],
      4: ["password", "confirmarSenha"],
    };
    const fieldsToValidate = stepFields[step];
    if (fieldsToValidate) {
      const valid = await trigger(fieldsToValidate);
      if (!valid) return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f3fdf6]">
        <div className="max-w-xl mx-auto pt-10 p-4">
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 font-semibold cursor-pointer"
                >
                  Como podemos te chamar?
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      ref={(el) => {
                        field.ref(el);
                        nomeRef.current = el;
                      }}
                      className={`w-full rounded-2xl px-4 py-3 text-base border shadow-sm focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#2F855A]"
                      }`}
                      placeholder="Digite seu nome ou apelido"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={nextStep}
                  className={`w-full rounded-2xl mt-2 px-4 py-3 text-white font-semibold shadow transition-all duration-200 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2F855A] hover:bg-[#276749] active:scale-95"
                  }`}
                >
                  Continuar
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-semibold cursor-pointer"
                >
                  E-mail
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "E-mail inválido",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      ref={(el) => {
                        field.ref(el);
                        emailRef.current = el;
                      }}
                      className={`w-full rounded-2xl px-4 py-3 text-base border shadow-sm focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#2F855A]"
                      }`}
                      placeholder="Digite seu e-mail"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
                <div className="flex justify-between gap-4 mt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full mt-2 h-11 rounded-xl border border-gray-400 text-gray-700 bg-white hover:bg-gray-100 transition"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`w-full rounded-2xl px-4 py-3 text-white font-semibold shadow transition-all duration-200 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#2F855A] hover:bg-[#276749] active:scale-95"
                    }`}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="cellphone" className="block mb-2 font-semibold">
                  Telefone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Telefone é obrigatório",
                    validate: (value) => {
                      const onlyNumbers = value.replace(/\D/g, "");
                      if (!/^\d{10,11}$/.test(onlyNumbers)) {
                        return "Telefone inválido. Insira um número com DDD.";
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="cellphone"
                      type="tel"
                      onChange={(e) => {
                        const masked = maskCellphone(e.target.value);
                        field.onChange(masked);
                      }}
                      value={field.value}
                      className={`w-full rounded-2xl px-4 py-3 text-base border shadow-sm focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#2F855A]"
                      }`}
                      placeholder="Digite seu telefone"
                    />
                  )}
                />

                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
                <div className="flex justify-between gap-4 mt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full mt-2 text-gray-600 h-11 rounded-xl border border-gray-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`w-full rounded-2xl px-4 py-3 text-white font-semibold shadow transition-all duration-200 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#2F855A] hover:bg-[#276749] active:scale-95"
                    }`}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label htmlFor="password" className="block mb-2 font-semibold">
                  Senha
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Senha é obrigatória" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="senha"
                      type="password"
                      className={`w-full rounded-2xl px-4 py-3 text-base border shadow-sm focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#2F855A]"
                      }`}
                      placeholder="Digite sua senha"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}

                <label
                  htmlFor="confirmarSenha"
                  className="block mt-4 mb-2 font-semibold"
                >
                  Confirmar Senha
                </label>
                <Controller
                  name="confirmarSenha"
                  control={control}
                  rules={{
                    required: "Confirmação é obrigatória",
                    validate: (value) =>
                      value === watch("password") || "As senhas não coincidem",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="confirmarSenha"
                      type="password"
                      className={`w-full rounded-2xl px-4 py-3 text-base border shadow-sm focus:outline-none focus:ring-2 ${
                        errors.confirmarSenha
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#2F855A]"
                      }`}
                      placeholder="Confirme sua senha"
                    />
                  )}
                />
                {errors.confirmarSenha && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.confirmarSenha.message}
                  </p>
                )}

                <div className="flex justify-between gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full mt-2 text-gray-600 h-11 rounded-xl border border-gray-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`w-full rounded-2xl px-4 py-3 text-white font-semibold shadow transition-all duration-200 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#2F855A] hover:bg-[#276749] active:scale-95"
                    }`}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <p className="text-lg font-semibold mb-6">
                  Escolha o plano que combina com você:
                </p>

                <div className="grid gap-4">
                  <Controller
                    name="paymentRecurrent"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Plano Mensal */}
                        <button
                          type="button"
                          onClick={() => onChange("MONTHLY")}
                          className={`min-h-[120px] border-2 rounded-xl p-5 text-left transition shadow-sm relative ${
                            value === "MONTHLY"
                              ? "border-green-600"
                              : "border-gray-300"
                          }`}
                          style={
                            value === "MONTHLY"
                              ? {
                                  background:
                                    "linear-gradient(to bottom right, #bbf7d0, #86efac)",
                                }
                              : { backgroundColor: "#ffffff" }
                          }
                        >
                          <div className="text-xl font-bold text-gray-800">
                            Plano Mensal
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Ideal para começar agora
                          </p>
                          <div className="text-emerald-700 font-extrabold text-2xl mt-3">
                            R$ 19,90{" "}
                            <span className="text-sm font-medium text-gray-600">
                              / mês
                            </span>
                          </div>
                        </button>

                        {/* Plano Anual */}
                        <button
                          type="button"
                          onClick={() => onChange("ANNUALLY")}
                          className={`min-h-[120px] border-2 rounded-xl p-5 text-left transition shadow-sm relative ${
                            value === "ANNUALLY"
                              ? "border-green-600"
                              : "border-gray-300"
                          }`}
                          style={
                            value === "ANNUALLY"
                              ? {
                                  background:
                                    "linear-gradient(to bottom right, #bbf7d0, #86efac)",
                                }
                              : { backgroundColor: "#ffffff" }
                          }
                        >
                          <div className="text-xl font-bold text-gray-800">
                            Plano Anual
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Economia garantida para o ano todo
                          </p>
                          <div className="text-emerald-700 font-extrabold text-2xl mt-3">
                            R$ 199,00{" "}
                            <span className="text-sm font-medium text-gray-600">
                              / ano
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full text-gray-600 h-11 rounded-xl border border-gray-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-11 rounded-xl transition ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {isSubmitting ? "Processando..." : "Finalizar e Pagar"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpFlow;
