"use client";

import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import Header from "../../../_components/Header";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  plano: "mensal" | "anual";
};

const SignUpFlow = () => {
  const [step, setStep] = useState(1);

  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      confirmarSenha: "",
      plano: "mensal",
    },
  });

  const nomeRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Cadastro completo:", data);
  };

  const nextStep = async () => {
    const stepFields: Record<number, (keyof FormData)[] | undefined> = {
      1: ["nome"],
      2: ["email"],
      3: ["telefone"],
      4: ["senha", "confirmarSenha"],
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
                  htmlFor="nome"
                  className="block mb-2 font-semibold cursor-pointer"
                >
                  Como podemos te chamar?
                </label>
                <Controller
                  name="nome"
                  control={control}
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="nome"
                      ref={(el) => {
                        field.ref(el);
                        nomeRef.current = el;
                      }}
                      className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                        errors.nome
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-green-500"
                      }`}
                      placeholder="Digite seu nome ou apelido"
                    />
                  )}
                />
                {errors.nome && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.nome.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full mt-4 bg-green-600 text-white h-11 rounded-xl hover:bg-green-700 transition"
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
                      className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-green-500"
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
                    className="w-full text-gray-600 h-11 rounded-xl border border-gray-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-green-600 text-white h-11 rounded-xl hover:bg-green-700 transition"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="telefone" className="block mb-2 font-semibold">
                  Telefone
                </label>
                <Controller
                  name="telefone"
                  control={control}
                  rules={{ required: "Telefone é obrigatório" }}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask="(99) 99999-9999"
                      maskChar={null}
                    >
                      {(inputProps) => (
                        <input
                          {...inputProps}
                          id="telefone"
                          type="tel"
                          className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                            errors.telefone
                              ? "border-red-500 focus:ring-red-500"
                              : "focus:ring-green-500"
                          }`}
                          placeholder="Digite seu telefone"
                        />
                      )}
                    </InputMask>
                  )}
                />
                {errors.telefone && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.telefone.message}
                  </p>
                )}
                <div className="flex justify-between gap-4 mt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full text-gray-600 h-11 rounded-xl border border-gray-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-green-600 text-white h-11 rounded-xl hover:bg-green-700 transition"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label htmlFor="senha" className="block mb-2 font-semibold">
                  Senha
                </label>
                <Controller
                  name="senha"
                  control={control}
                  rules={{ required: "Senha é obrigatória" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="senha"
                      type="password"
                      className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                        errors.senha
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-green-500"
                      }`}
                      placeholder="Digite sua senha"
                    />
                  )}
                />
                {errors.senha && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.senha.message}
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
                      value === watch("senha") || "As senhas não coincidem",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="confirmarSenha"
                      type="password"
                      className={`w-full border rounded-xl px-3 h-11 mb-1 focus:outline-none focus:ring-2 ${
                        errors.confirmarSenha
                          ? "border-red-500 focus:ring-red-500"
                          : "focus:ring-green-500"
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
                    className="w-full text-gray-600 h-11 rounded-xl border border-gray-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-green-600 text-white h-11 rounded-xl hover:bg-green-700 transition"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <p className="text-lg font-semibold mb-4">
                  Pagamento em breve...
                </p>
                <pre className="bg-gray-100 p-4 rounded text-sm">
                  {JSON.stringify(getValues(), null, 2)}
                </pre>
                <div className="flex justify-between gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full text-gray-600 h-11 rounded-xl border border-gray-400"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white h-11 rounded-xl hover:bg-green-700 transition"
                  >
                    Finalizar
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
