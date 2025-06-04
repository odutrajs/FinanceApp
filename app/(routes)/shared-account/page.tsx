"use client";

import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useToast } from "../../components/@/ui/use-toast";
import Header from "../../_components/Header";
import { getMe } from "../../(auth)/services/get-me";
import { updateSharedPhones } from "./services/updateSharedPhones";
import { deleteSharedPhone } from "./services/deleteSharedPhones";
import { Button } from "../../../@/components/ui/button";
import { queryClient } from "../../../configs/query";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRouter } from "next/navigation";

type SharedForm = {
  phone: string;
};

export default function SharedAccountPage() {
  const { toast } = useToast();
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["userMe"],
    queryFn: getMe,
  });

  const { control, handleSubmit, reset } = useForm<SharedForm>({
    defaultValues: { phone: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ phone }: SharedForm) =>
      updateSharedPhones({ sharedWithPhones: [phone] }),
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Telefone atualizado!",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o telefone.",
        variant: "destructive",
      });
    },
  });

  const { mutate: deletePhone, isPending: isDeleting } = useMutation({
    mutationFn: (phone: string) => deleteSharedPhone(phone),
    onSuccess: () => {
      toast({
        title: "Telefone removido",
        description: "Remoção feita com sucesso.",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["userMe"] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover o telefone.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (user?.sharedWithPhones?.length > 0) {
      reset({ phone: (user.sharedWithPhones as string[])[0] });
    }
  }, [user, reset]);

  const onSubmit = (data: SharedForm) => {
    const digitsOnly = data.phone.replace(/\D/g, "");
    mutate({ phone: digitsOnly });
  };

  function formatE164ToDisplay(phone: string) {
    if (!phone.startsWith("55") || phone.length !== 13) return phone;

    const ddd = phone.slice(2, 4);
    const firstPart = phone.slice(4, 9);
    const secondPart = phone.slice(9);

    return `(55) ${ddd}${firstPart}-${secondPart}`;
  }

  return (
    <div className="bg-[#FDF6EC] min-h-screen w-full">
      <Header />
      <div className="p-6 max-w-2xl mx-auto w-full">
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-700 text-white hover:bg-gray-800 transition"
        >
          ← Voltar para o Dashboard
        </Button>

        <h1 className="text-xl font-semibold mb-6 text-[#2D2D2D]">
          Compartilhar acesso com telefone
        </h1>

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {user?.sharedWithPhones?.length > 0 && (
              <div className="mb-6 bg-white rounded-lg p-4 border border-gray-300">
                <h2 className="text-sm text-gray-700 mb-2">
                  Telefones já cadastrados:
                </h2>
                <ul className="space-y-3">
                  {user.sharedWithPhones.map((phone, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 text-green-700 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold shadow-sm">
                          📞
                        </div>
                        <span className="text-sm text-gray-800 font-medium">
                          {formatE164ToDisplay(phone)}
                        </span>
                      </div>
                      <button
                        onClick={() => deletePhone(phone)}
                        disabled={isDeleting}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
                        title="Remover telefone"
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>

                {user.sharedWithPhones.length >= 1 && (
                  <p className="text-sm text-gray-500 mt-2">
                    Você pode cadastrar apenas 1 número por vez. Para adicionar
                    outro, remova o atual.
                  </p>
                )}
              </div>
            )}

            {user?.sharedWithPhones?.length === 0 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div className="w-full">
                      <PhoneInput
                        {...field}
                        defaultCountry="BR"
                        international
                        countryCallingCodeEditable={false}
                        className="w-full px-4 py-2 h-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
                      />
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[#276749] text-white hover:bg-[#2F855A]"
                >
                  {isPending ? "Salvando..." : "Salvar telefone"}
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
