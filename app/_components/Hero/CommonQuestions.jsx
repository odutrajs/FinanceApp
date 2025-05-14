import React from "react";
import QuestionCard from "../../components/@/ui/questionCard";

const CommonQuestions = () => {
  const questions = [
    {
      title: "Como funciona a integração com o WhatsApp?",
      description:
        "Você simplesmente envia uma mensagem com suas despesas ou receitas, e a IA cuida do resto!",
    },
    {
      title: "Posso enviar foto ou áudio?",
      description:
        "Sim! Além de poder enviar mensagem por texto, é possível enviar áudio ou foto!",
    },
    {
      title: "Quais categorias de gastos posso adicionar?",
      description:
        "O Dona Grana categoriza seus gastos em diversas áreas, como alimentação, transporte, e muito mais.",
    },
    {
      title: "É seguro usar o Dona Grana?",
      description:
        "Sim! Priorizamos a segurança dos seus dados e garantimos total privacidade.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Perguntas Frequentes
        </h2>
      </div>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="space-y-8">
          {questions.map((q, index) => (
            <QuestionCard
              key={index}
              title={q.title}
              description={q.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommonQuestions;
