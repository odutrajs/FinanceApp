import Image from "next/image";
import React from "react";
import FeatureCard from "../../components/@/ui/featureCard";

import {
  Rocket,
  Settings,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

const FeatureSection = () => {
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
        "Com o Dona Grana, você pode adicionar despesas e receitas enviando apenas um áudio ou uma foto pelo WhatsApp. Praticidade total!",
    },
    {
      title: "Esquece de pagar contas?",
      icon: Settings,
      description:
        "O Dona Grana te lembra automaticamente dos seus pagamentos. Basta dizer 'Me lembre de pagar a conta de luz amanhã no valor de 100 reais' e pronto!",
    },
    {
      title: "Não sabe para onde vai o seu dinheiro?",
      icon: Star,
      description:
        "A Inteligência Artificial do Dona Grana categoriza automaticamente seus gastos e receitas, dando clareza às suas finanças.",
    },
    {
      title: "Dificuldade em acompanhar suas finanças?",
      icon: TrendingUp,
      description:
        "Com o Dona Grana, você acessa relatórios e gráficos detalhados via um sistema web intuitivo.",
    },
    {
      title: "Segurança dos seus dados",
      icon: Users,
      description:
        "O Dona Grana garante máxima segurança e privacidade para suas informações financeiras.",
    },
  ];
  return (
    <>
      <section className="w-full bg-[#2F855A] pt-20 pb-16 px-6 text-white flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mb-6 leading-tight">
          Visualize Suas Finanças de Forma Inteligente
        </h2>

        <div className="max-w-6xl w-full flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="max-w-lg text-white text-lg sm:text-xl leading-relaxed space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Gráficos Interativos no Sistema Web
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-green-100">•</span>
                <span>Distribuição de gastos por categoria</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-100">•</span>
                <span>Visualização do saldo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-100">•</span>
                <span>Comparativo de receitas e despesas mensais</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/dashboardC.png"
              alt="Gráficos financeiros"
              width={700}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pt-16 pb-10 bg-[#FDF6EC] text-[#2D2D2D]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-7">
            Funcionalidades do Dona Grana
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

      <section className="w-full bg-[#2F855A] pt-16 pb-10 px-6 text-white flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
          Simplifique suas Finanças Agora!
        </h2>
        <p className="text-lg sm:text-xl mb-6">
          Não perca mais tempo com planilhas! Junte-se ao Dona Grana e tenha
          controle total das suas finanças.
        </p>
        <a
          href="/sign-up"
          className="bg-[#2D2D2D] hover:bg-[#1F1F1F] text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md transition-all duration-200"
        >
          Experimente Dona Grana!
        </a>
      </section>
    </>
  );
};

export default FeatureSection;
