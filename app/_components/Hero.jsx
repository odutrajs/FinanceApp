import Image from "next/image";
import React from "react";
import IphoneMockup from "../components/@/ui/iphone";
import FeatureCard from "../components/@/ui/featureCard";
import {
  Rocket,
  Settings,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

const Hero = () => {
  const features = [
    {
      title: "Dificuldade para registrar despesas?",
      icon: ShieldCheck,
      description:
        "Basta enviar uma mensagem no WhatsApp para adicionar despesas e receitas, sem complicação.",
    },
    {
      title: "Sem tempo para digitar?",
      icon: Rocket,
      description:
        "Com o GranaZen, você pode adicionar despesas e receitas enviando apenas um áudio ou uma foto pelo WhatsApp. Praticidade total!",
    },
    {
      title: "Esquece de pagar contas?",
      icon: Settings,
      description:
        "O GranaZen te lembra automaticamente dos seus pagamentos. Basta dizer 'Me lembre de pagar a conta de luz amanhã no valor de 100 reais' e pronto!",
    },
    {
      title: "Não sabe para onde vai o seu dinheiro?",
      icon: Star,
      description:
        "A Inteligência Artificial do GranaZen categoriza automaticamente seus gastos e receitas, dando clareza às suas finanças.",
    },
    {
      title: "Dificuldade em acompanhar suas finanças?",
      icon: TrendingUp,
      description:
        "Com o GranaZen, você acessa relatórios e gráficos detalhados via um sistema web intuitivo.",
    },
    {
      title: "Segurança dos seus dados",
      icon: Users,
      description:
        "O GranaZen garante máxima segurança e privacidade para suas informações financeiras.",
    },
  ];
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-green-50 bg-opacity-90 flex flex-col justify-center items-center px-4 pt-20 pb-16">
        <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-1xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              A Maneira Mais Rápida de Organizar
              <strong className="font-extrabold text-primary sm:block">
                Suas Finanças pelo WhatsApp
              </strong>
            </h1>

            <p className="mt-6 sm:text-xl text-gray-700">
              <span className="text-3xl font-bold text-green-600">+19 mil</span>{" "}
              pessoas já confiam no{" "}
              <span className="font-semibold">NOMEDAEMPRESA</span> para
              organizar suas finanças. E você?
            </p>

            <div className="mt-10 flex justify-center gap-6 flex-wrap">
              <IphoneMockup
                imageSrc="/printIphone1.jpeg"
                alt="Conversa com GranaZen"
              />
              <IphoneMockup
                imageSrc="/screenChart.png"
                alt="Resumo financeiro"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-600 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/dashboard"
              >
                Experimente o NOMEDAEMPRESA
              </a>
            </div>

            <div className="flex justify-center mt-6">
              <div className="animate-bounce text-green-600 text-3xl">
                &#8595;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full bg-green-500 pt-20 pb-16 px-6 text-white flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mb-6 leading-tight">
          Visualize Suas Finanças
          <br className="hidden sm:block" /> De Forma Inteligente
        </h2>

        <div className="max-w-6xl w-full flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="max-w-lg text-white text-lg sm:text-xl leading-relaxed space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Gráficos Interativos no Sistema Web
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-2xl">🕒</span>
                <span>Distribuição de gastos por categoria</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">📈</span>
                <span>Visualização do saldo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-2xl">📊</span>
                <span>Comparativo de receitas e despesas mensais</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/dashboard.png"
              alt="Gráficos financeiros"
              width={700}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pt-16 pb-10 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-7 text-black">
            Funcionalidades do NOMEDAEMPRESA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                icon={feature.icon}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full bg-green-500 pt-16 pb-10 px-6 text-white flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
          Simplifique suas Finanças Agora!
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          Não perca mais tempo com planilhas! Junte-se ao GranaZen e tenha
          controle total das suas finanças.
        </p>
        <a
          href="/dashboard"
          className="bg-black hover:bg-gray-900 text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md transition-all duration-200"
        >
          Experimente GranaZen Gratuitamente!
        </a>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full bg-gray-50 pt-16 pb-20 px-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-12">
          O que Nossos Usuários Dizem
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Jofre Thomas",
                title: "Software developer",
                image: "/jofreThomas.jpeg",
                comment:
                  "O GranaZen revolucionou a forma como gerencio as finanças do meu negócio. É simples, rápido e muito eficiente!",
              },
              {
                name: "Yuri Gonçalves",
                title: "Empresário",
                image: "/yuri.jpeg",
                comment:
                  "Eu costumava esquecer de registrar meus gastos, mas com o GranaZen, consigo adicionar tudo direto pelo WhatsApp!",
              },
              {
                name: "Pedro Elpídio",
                title: "Developer Sênior",
                image: "/pedro.png",
                comment: "Ótimo sistema, facilita muito no controle de gastos!",
              },
            ].map((user, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 w-[300px] flex-shrink-0"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{user.comment}</p>
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS SECTION */}
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
              mensagens, garantindo que apenas você e o GranaZen tenham acesso
              às suas mensagens.
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

      <section className="w-full bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Imagem da conversa simulada */}
          <div className="w-full max-w-md">
            <img
              src="/howtouse.png"
              alt="Simulação de conversa no WhatsApp"
              className="rounded-2xl shadow-xl w-full"
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
                    Simplesmente envie uma mensagem para o GranaZen no WhatsApp
                    com seus gastos ou receitas.
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
    </>
  );
};

export default Hero;
