import React from "react";

const IntegrationSection = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-14">
        Sua segurança é nossa prioridade
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Card 1 */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
            <span className="text-yellow-500 text-xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Comunicação Segura
          </h3>
          <p className="text-sm text-gray-600">
            O WhatsApp utiliza criptografia de ponta a ponta em todas as
            mensagens, garantindo que apenas você e o GranaZen tenham acesso às
            suas mensagens.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <span className="text-green-600 text-xl">🛡️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Seus Dados São Seus
          </h3>
          <p className="text-sm text-gray-600">
            Não utilizamos seus dados financeiros para treinar modelos de IA
            generativa.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <span className="text-blue-600 text-xl">🔒</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Proteção Avançada
          </h3>
          <p className="text-sm text-gray-600">
            Implementamos padrões rígidos de segurança para proteger suas
            informações financeiras. Seus dados são armazenados em servidores
            seguros e com backups constantes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
