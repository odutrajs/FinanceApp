import React from "react";
import IphoneMockup from "../../components/@/ui/iphone";

const HeroSection = () => {
  return (
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
            <span className="font-semibold">NOMEDAEMPRESA</span> para organizar
            suas finanças. E você?
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <IphoneMockup
              imageSrc="/printIphone1.jpeg"
              alt="Conversa com GranaZen"
            />
            <IphoneMockup imageSrc="/screenChart.png" alt="Resumo financeiro" />
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
  );
};

export default HeroSection;
