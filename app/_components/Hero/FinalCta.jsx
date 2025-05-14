import React from "react";

const FinalCta = () => {
  return (
    <>
      <section className="w-full bg-[#FDF6EC] py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Imagem da conversa simulada */}
          <div className="w-full max-w-md bg-white p-4 rounded-3xl shadow-xl">
            <img
              src="/howuse.png"
              alt="Simulação de conversa no WhatsApp"
              className="rounded-2xl w-full"
            />
          </div>

          {/* Etapas de funcionamento */}
          <div className="w-full max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center lg:text-left">
              Como Funciona a Integração com WhatsApp
            </h2>

            <ul className="space-y-6 text-gray-800 text-base">
              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-2 text-lg">
                  💬
                </div>
                <div>
                  <h3 className="font-semibold">1. Envie uma Mensagem</h3>
                  <p className="text-gray-600">
                    Simplesmente envie uma mensagem para o Dona Grana no
                    WhatsApp com seus gastos ou receitas.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-2 text-lg">
                  🤖
                </div>
                <div>
                  <h3 className="font-semibold">2. IA Processa a Informação</h3>
                  <p className="text-gray-600">
                    Nossa IA analisa sua mensagem e categoriza automaticamente a
                    transação.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-2 text-lg">
                  ⚙️
                </div>
                <div>
                  <h3 className="font-semibold">3. Atualização Automática</h3>
                  <p className="text-gray-600">
                    Seus dados financeiros são atualizados instantaneamente no
                    sistema.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-green-100 text-green-600 rounded-full p-2 text-lg">
                  ✅
                </div>
                <div>
                  <h3 className="font-semibold">4. Confirmação Imediata</h3>
                  <p className="text-gray-600">
                    Receba uma confirmação instantânea de que sua transação foi
                    registrada.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#2F855A] py-16 px-6 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Transforme sua Gestão Financeira!
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          Não perca mais tempo com planilhas! Junte-se ao Dona Grana e tenha
          controle total das suas finanças.
        </p>

        <a
          href="/sign-up"
          className="inline-block bg-[#2D2D2D] hover:bg-[#1F1F1F] text-white font-semibold px-8 py-3 text-sm sm:text-base rounded-full shadow transition-all duration-200"
        >
          Experimente Dona Grana!
        </a>
      </section>
    </>
  );
};

export default FinalCta;
