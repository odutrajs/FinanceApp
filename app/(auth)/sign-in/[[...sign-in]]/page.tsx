"use client";

import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { LoginMessageError, loginUser } from "../../services/loginUser";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../components/@/ui/use-toast";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError(error: AxiosError) {
      const message = (error.response?.data as LoginMessageError)?.error;
      toast({
        title: "Erro ao fazer login",
        description: message || "Verifique seus dados e tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginForm) => {
    loginMutate(data);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FDF6EC] to-[#FFF8F0] flex flex-col">
      <div className="flex-grow lg:grid lg:grid-cols-12">
        {/* Lateral Verde com Imagem */}
        <section className="relative flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#2F855A]">
            <img
              src="/logoDonaGranna.png"
              alt="Finanças"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="hidden lg:relative lg:block lg:p-12 z-10 text-white">
            <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
              Bem-vindo de volta
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Acesse sua conta para continuar organizando suas finanças com o
              Dona Grana.
            </p>
          </div>
        </section>

        {/* Formulário */}
        <main className="flex items-center justify-center px-6 py-10 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-white">
          <div className="max-w-xl lg:max-w-md w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-[#2D2D2D]">
                  Dona Grana
                </h1>
                <p className="text-sm text-[#2D2D2D]/70 mt-1">
                  Digite seus dados para entrar
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#2D2D2D]"
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
                      inputMode="email"
                      className={`mt-1 w-full rounded-2xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#2F855A]"
                      }`}
                      placeholder="seu@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2D2D2D]"
                >
                  Senha
                </label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Senha é obrigatória" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type="password"
                      className={`mt-1 w-full rounded-2xl border px-4 py-3 text-base shadow-sm focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#2F855A]"
                      }`}
                      placeholder="••••••••"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-[#2F855A] hover:underline font-medium"
                >
                  Esqueceu sua senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`w-full rounded-2xl px-4 py-3 text-white font-semibold shadow transition-all duration-200 ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#2F855A] hover:bg-[#276749] active:scale-95"
                }`}
              >
                {isPending ? "Entrando..." : "Entrar"}
              </button>

              <p className="text-center text-sm text-[#2D2D2D]/70">
                Não tem uma conta?{" "}
                <a
                  href="/sign-up"
                  className="text-[#2F855A] hover:underline font-medium"
                >
                  Cadastre-se
                </a>
              </p>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
