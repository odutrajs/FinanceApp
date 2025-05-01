import React from "react";

const PlansSection = () => {
  return (
    <section className="w-full bg-gray-50 pt-5 pb-20 px-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-12">
        Escolha seu plano
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-0">
        {/* Plano Mensal */}
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm flex flex-col justify-between mx-auto">
          <div>
            <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full w-fit mb-3">
              Plano Mensal
            </div>
            <h3 className="text-xl font-bold mb-1">GranaZen Mensal</h3>
            <p className="text-gray-500 mb-4">
              Ideal para quem quer começar sem compromisso.
            </p>
            <div className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full w-fit mb-4">
              🥳 3 dias grátis
            </div>
            <div className="text-3xl font-extrabold mb-1">R$ 19,99</div>
            <p className="text-sm text-gray-500 mb-6">Cobrados mensalmente</p>
            <h4 className="font-semibold text-gray-800 mb-3">
              RECURSOS INCLUÍDOS
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✅ Acesso ao sistema via WhatsApp</li>
              <li>✅ Categorias personalizadas</li>
              <li>✅ Gráficos e relatórios</li>
              <li>✅ Suporte por WhatsApp</li>
              <li>❌ Gestão compartilhada</li>
              <li>❌ Exportação de dados</li>
            </ul>
          </div>
          <button className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg">
            Assinar Mensal
          </button>
        </div>

        {/* Plano Anual */}
        <div className="bg-black text-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col justify-between mx-auto">
          <div>
            <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full w-fit mb-3">
              🔥 Mais vantajoso
            </div>
            <h3 className="text-xl font-bold mb-1">GranaZen Anual</h3>
            <p className="text-gray-400 mb-4">
              Economize e tenha acesso completo por 1 ano!
            </p>
            <div className="bg-green-700 text-white text-sm font-semibold px-4 py-1 rounded-full w-fit mb-4">
              🥳 3 dias grátis
            </div>
            <div className="text-3xl font-extrabold mb-1">R$ 214,92</div>
            <p className="text-sm text-green-400 mb-6">
              Economia de R$ 23,88 por ano
            </p>
            <h4 className="font-semibold mb-3">RECURSOS INCLUÍDOS</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>✅ Tudo do plano mensal</li>
              <li>✅ Exportação de dados</li>
              <li>✅ Lembretes e automações</li>
              <li>✅ Acesso ilimitado ao painel</li>
              <li>✅ Prioridade no suporte</li>
            </ul>
          </div>
          <button className="mt-8 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-100">
            Assinar Anual
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
