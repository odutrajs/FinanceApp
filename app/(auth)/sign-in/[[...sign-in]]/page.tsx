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
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo de volta`,
      });

      localStorage.setItem("token", data.accessToken);
      router.push("/dashboard");
    },
    onError(error: AxiosError) {
      const message = (error.response?.data as LoginMessageError)?.message;
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
    <section className="bg-[#FDF6EC]">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-[#2F855A] lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="absolute inset-0 bg-[#2F855A]" />
          <div className="hidden lg:relative lg:block lg:p-12 z-10">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Bem-vindo de volta
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Acesse sua conta para continuar organizando suas finanças com o
              Dona Grana.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-lg w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#2D2D2D]">
                  Dona Grana
                </h1>
                <p className="text-sm text-[#2D2D2D]/70">
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
                      className={`mt-1 w-full rounded-md border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
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
                      className={`mt-1 w-full rounded-md border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
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

              <button
                type="submit"
                className="w-full rounded-md bg-[#2F855A] px-4 py-2 text-white hover:bg-[#276749] transition"
              >
                Entrar
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
