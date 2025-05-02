"use client";

import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "../../../_components/Header";

type FormData = {
  nome: string;
  email: string;
  plano: "mensal" | "anual";
};

const SignUpFlow = () => {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, getValues } = useForm<FormData>({
    defaultValues: {
      nome: "",
      email: "",
      plano: "mensal",
    },
  });

  const nomeRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("Cadastro completo:", data);
  };

  const nextStep = () => setStep((prev) => prev + 1);
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
                style={{ width: `${(step / 4) * 100}%` }}
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
                      className="w-full border rounded-xl px-3 h-11 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Digite seu nome ou apelido"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-green-600 text-white h-11 rounded-xl hover:bg-green-700 transition"
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
                  rules={{ required: "E-mail é obrigatório" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      ref={(el) => {
                        field.ref(el);
                        emailRef.current = el;
                      }}
                      className="w-full border rounded-xl px-3 h-11 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Digite seu e-mail"
                    />
                  )}
                />
                <div className="flex justify-between gap-4">
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
                <label className="block mb-4 font-semibold">
                  Escolha seu plano
                </label>

                <Controller
                  name="plano"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="space-y-4">
                      {/* Premium */}
                      <div
                        onClick={() => field.onChange("mensal")}
                        className={`cursor-pointer rounded-xl p-4 transition border-2 flex justify-between items-center ${
                          field.value === "mensal"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <div
                          className={`${
                            field.value === "mensal"
                              ? "bg-red-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <p className="font-semibold text-lg">Mensal</p>
                          <p className="text-green-700 font-medium">
                            R$ 19,90/mês
                          </p>
                        </div>
                      </div>

                      <div
                        onClick={() => field.onChange("anual")}
                        className={`cursor-pointer rounded-xl p-4 transition border flex justify-between items-center ${
                          field.value === "anual"
                            ? "border-green-600 bg-green-50"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-lg flex items-center gap-1">
                            Zen <span>🏆</span>
                          </p>
                          <p className="text-green-700 font-medium">
                            R$ 34,90/mês
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                />

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

            {step === 4 && (
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
