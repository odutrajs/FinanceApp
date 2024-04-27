import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section class="bg-gray-50 flex items-center flex-col">
      <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div class="mx-auto max-w-xl text-center">
          <h1 class="text-3xl font-extrabold sm:text-5xl">
            Manager Your Expense
            <strong class="font-extrabold text-primary sm:block">
              Control your money
            </strong>
          </h1>

          <p class="mt-4 sm:text-xl/relaxed">
            Start creating budget and save ton of money
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/dashboard"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <Image
        src={"/dashboard.png"}
        alt="dashboard"
        width={1000}
        height={700}
        className="mt-5 rounded-xl border-2"
      />
    </section>
  );
};

export default Hero;
