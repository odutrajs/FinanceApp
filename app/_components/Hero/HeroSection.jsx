import React from "react";
import IphoneMockup from "../../components/@/ui/iphone";

const HeroSection = () => {
  return (
    <section className="bg-[#FDF6EC] flex flex-col justify-center items-center px-4 pt-20 pb-16">
      <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-1xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-[#2D2D2D]">
            A Maneira Mais Rápida de Organizar
            <strong className="font-extrabold text-[#2F855A] sm:block">
              Suas Finanças pelo WhatsApp
            </strong>
          </h1>
          <p className="mt-6 sm:text-xl text-[#2D2D2D]">
            <span className="text-3xl font-bold text-[#2F855A]">+19 mil</span>{" "}
            pessoas já confiam no{" "}
            <span className="font-semibold">Dona Grana</span> para organizar
            suas finanças. E você?
          </p>
          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <IphoneMockup type="image" imageSrc="/printWhats.jpeg" />
            <IphoneMockup videoSrc="/video123.mp4" />
            <IphoneMockup type="image" imageSrc="/printWhats.jpeg" />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-[#2F855A] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#276749] focus:outline-none focus:ring sm:w-auto"
              href="/sign-up"
            >
              Experimente o Dona Grana
            </a>
          </div>
          <div className="flex justify-center mt-6">
            <div className="animate-bounce text-[#2F855A] text-3xl">
              &#8595;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
