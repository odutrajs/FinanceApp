"use client";

import Link from "next/link";

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Ocorreu um problema!
        </h1>
        <p className="mt-4 text-gray-700">
          Não conseguimos processar seu pagamento.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Verifique as informações do cartão ou tente novamente.
        </p>

        <Link
          href="https://wa.me/5541997339967"
          target="_blank"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-green-700 hover:bg-green-800 text-white font-semibold transition-colors"
        >
          Entrar em contato com o suporte
        </Link>

        <p className="text-xs text-gray-400 mt-6">
          Se o problema persistir, entre em contato com o suporte Dona Grana.
        </p>
      </div>
    </div>
  );
}
