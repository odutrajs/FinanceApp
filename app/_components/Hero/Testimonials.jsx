import React from "react";

const Testimonials = () => {
  return (
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
                "O Dona Grana revolucionou a forma como gerencio as finanças do meu negócio. É simples, rápido e muito eficiente!",
            },
            {
              name: "Yuri Gonçalves",
              title: "Empresário",
              image: "/yuri.jpeg",
              comment:
                "Eu costumava esquecer de registrar meus gastos, mas com o Dona Grana, consigo adicionar tudo direto pelo WhatsApp!",
            },
            {
              name: "Taina Zalourensi",
              title: "Data Analyst",
              image: "/taina.png",
              comment:
                "Sempre tive dificuldade em manter o controle financeiro, mas o Dona Grana transformou isso. Tudo é feito de forma intuitiva e pelo WhatsApp, sem complicação",
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
  );
};

export default Testimonials;
