"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <h1 className="text-2xl font-bold text-green-700">
          Pagamento confirmado!
        </h1>
        <p className="mt-4 text-gray-700">
          Sua assinatura foi ativada com sucesso.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Agora você pode usar o assistente financeiro direto no WhatsApp!
        </p>

        <Link
          href="https://wa.me/5541998145494"
          target="_blank"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-green-700 hover:bg-green-800 text-white font-semibold transition-colors"
        >
          Ir para o WhatsApp
        </Link>

        <p className="text-xs text-gray-400 mt-6">
          Em caso de dúvidas, entre em contato com o suporte Dona Grana.
        </p>
      </div>
    </div>
  );
}
