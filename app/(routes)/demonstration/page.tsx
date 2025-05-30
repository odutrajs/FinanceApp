"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../configs/api";

export default function LandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [inputText, setInputText] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [testeRealizado, setTesteRealizado] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const nextSection = () => setCurrentSection((prev) => prev + 1);
  const hoje = new Date().toLocaleDateString("pt-BR");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await api.post("/api/v1/demo", {
        message,
      });
      return res.data.response;
    },
    onSuccess: (data) => {
      setSentMessage(inputText);
      setResponse(data);
      setTesteRealizado(true);
    },
    onError: () => {
      setResponse("Erro ao conectar com a IA.");
    },
    onSettled: () => {
      setInputText("");
    },
  });

  const [response, setResponse] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const handleSend = () => {
    if (testeRealizado || !inputText.trim()) {
      setResponse("Por favor, digite uma mensagem válida.");
      return;
    }
    mutation.mutate(inputText);
  };

  useEffect(() => {
    if (currentSection !== 5) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentSection]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="bg-white text-gray-900">
      {currentSection === 0 && (
        <>
          <section className="text-center py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
            <p className="text-sm text-gray-500 italic">
              A mesma tecnologia usada por gerentes de investimentos.
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mt-4">
              Economize <span className="text-orange-500">+ de 300 Reais</span>{" "}
              em 30 Dias
              <br /> Sem Cortar Luxos e Apenas Usando o WhatsApp.
            </h1>
            <p className="mt-6 text-lg font-medium text-gray-700">
              Nada de app complicado, planilha ou Notion. <br />É{" "}
              <span className="text-green-600">inteligência artificial</span> de
              ponta.
            </p>
          </section>

          <section className="py-16 px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {[
              {
                title: "Para onde vai seu dinheiro?",
                text: "Trabalha o mês inteiro, mas nunca sabe onde foi parar tudo que ganhou.",
              },
              {
                title: "Sem planilhas ou apps",
                text: "Chega de soluções complicadas. Aqui você resolve tudo no WhatsApp.",
              },
              {
                title: "Perdido nas dívidas",
                text: "Não sabe quanto paga de parcela ou quem deve. A IA organiza tudo.",
              },
              {
                title: "Pagando mais caro",
                text: "Compra por impulso ou esquece de comparar. Gasta mais sem perceber.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-green-50 p-6 rounded-2xl shadow-md text-center"
              >
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm">{item.text}</p>
              </div>
            ))}
          </section>

          <div className="text-center mt-10 mb-20">
            <Button
              onClick={nextSection}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg text-white text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              🚀 Continuar
            </Button>
          </div>
        </>
      )}

      {currentSection === 1 && (
        <section className="min-h-screen py-20 px-4 bg-gray-50 text-center flex flex-col justify-between">
          <div className="flex flex-col items-center justify-center mb-6">
            <span className="text-xs uppercase tracking-wide bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold mb-3">
              Demonstração
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Como Funciona?
            </h2>
          </div>
          <p className="text-lg max-w-xl mx-auto text-gray-700">
            Um assistente financeiro <strong>no seu WhatsApp</strong>,
            disponível 24h para ser seu{" "}
            <strong>controle financeiro interativo</strong>.
          </p>

          <div className="mt-12 max-w-md mx-auto bg-[#ece5dd] p-4 rounded-xl shadow-lg border border-[#d1ccc0] relative">
            <div className="text-xs text-gray-500 mb-2 text-left">Hoje</div>

            <div className="flex flex-col space-y-3">
              <div className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%]">
                Oi! Seja bem-vindo(a) ao *Dona Grana*, seu assistente financeiro
                no WhatsApp.
              </div>

              <div className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%]">
                ✨ Aqui é simples: me diga quanto gastou ou recebeu — eu cuido
                do resto!
              </div>

              <div className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%]">
                Exemplo: uber 35, mercado 80
              </div>
              {sentMessage && (
                <div className="self-end bg-green-100 px-4 py-2 rounded-lg text-sm shadow max-w-[75%] whitespace-pre-line text-gray-900">
                  {sentMessage}
                </div>
              )}

              {mutation.isPending ? (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%] text-gray-900 flex items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  Digitando...
                </motion.div>
              ) : (
                response && (
                  <>
                    <motion.div
                      key="resposta"
                      initial={{ opacity: 0, x: -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%] whitespace-pre-line text-gray-900 relative overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-white z-10"
                      />
                      <div className="relative z-20">{response}</div>
                    </motion.div>
                    <motion.div
                      key="lembrete"
                      initial={{ opacity: 0, x: -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: 1.2,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%] text-gray-900"
                    >
                      Lembrete: Você está quase chegando no seu limite definido
                      de R$ 66 com essa categoria.
                    </motion.div>
                  </>
                )
              )}
            </div>

            {!testeRealizado && (
              <div className="mt-6 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Digite aqui..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <Button
                  onClick={handleSend}
                  disabled={testeRealizado}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  {mutation.isPending ? "..." : "➤"}
                </Button>
              </div>
            )}

            {testeRealizado && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6 text-green-600 font-medium text-sm"
              >
                ✅ Teste realizado! Clique em continuar.
              </motion.div>
            )}
          </div>

          <div className="text-center mt-10">
            <motion.button
              onClick={nextSection}
              disabled={!testeRealizado}
              className={`bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 shadow-lg text-white text-lg px-20 py-2 rounded-full transition-all duration-300 ${
                !testeRealizado ? "opacity-50 cursor-not-allowed" : ""
              }`}
              animate={testeRealizado ? { y: [0, -5, 0] } : {}}
              transition={
                testeRealizado
                  ? { repeat: Infinity, duration: 1.4, ease: "easeInOut" }
                  : {}
              }
            >
              🚀 Continuar
            </motion.button>
          </div>
        </section>
      )}

      {currentSection === 2 && (
        <section className="min-h-screen py-20 px-4 bg-white text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-wide bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold mb-3">
            Demonstração
          </span>
          <span className="text-xs uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold mb-4">
            Lembrete Automático
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Registre lembretes importantes
          </h2>
          <p className="text-lg max-w-xl text-gray-700 mt-4">
            Com apenas um clique, você pode registrar lembretes como beber água,
            tomar remédios ou pagar boletos.
          </p>

          <div className="mt-12 w-full max-w-xl mx-auto bg-[#ece5dd] p-6 rounded-2xl shadow-xl border border-[#d1ccc0] relative">
            <div className="text-xs text-gray-500 mb-2 text-left">Hoje</div>

            <div className="flex flex-col space-y-3">
              <div className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%]">
                Preciso te lembrar de alguma coisa?
              </div>

              {!showReminder ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowReminder(true)}
                  className="self-end bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:bg-green-700 transition"
                >
                  Criar lembrete
                </motion.button>
              ) : (
                <motion.div
                  key="lembrete-registrado"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="self-start bg-white px-4 py-2 rounded-lg text-sm shadow max-w-[75%] text-left text-gray-900 whitespace-pre-line"
                >
                  📌 <strong>Lembrete registrado!</strong>
                  <br />
                  <br />
                  Não se esqueça de tomar água 💧
                  <br />⏰ {hoje}, 19:00
                </motion.div>
              )}
            </div>

            {showReminder && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="text-xs text-right text-gray-500 mt-2"
              >
                18:33
              </motion.div>
            )}
          </div>

          <div className="text-center mt-10">
            <Button
              onClick={nextSection}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              🚀 Continuar
            </Button>
          </div>
        </section>
      )}

      {/* 3 - BENEFÍCIOS */}
      {currentSection === 3 && (
        <section className="min-h-screen py-20 px-4 bg-white text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-wide bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold mb-4">
            Visão Geral
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Tenha Controle Total
          </h2>
          <p className="text-lg max-w-2xl text-gray-700 mt-4">
            Após enviar suas despesas pelo WhatsApp, você pode acompanhar tudo
            em um painel completo: gráficos, categorias, históricos e muito
            mais.
          </p>

          <div className="mt-12 relative w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center text-white text-lg font-medium">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="backdrop-blur-sm px-6 py-4 rounded-lg bg-white/10 border border-white/20"
              >
                🔒 Essa é a visão do seu painel. Liberada após o cadastro.
              </motion.div>
            </div>
            <img
              src="/dashAtt.png"
              alt="Painel Financeiro"
              className="w-full object-cover rounded-2xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10"
          >
            <Button
              onClick={nextSection}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              🚀 Continuar
            </Button>
          </motion.div>
        </section>
      )}

      {currentSection === 4 && (
        <section className="bg-white py-24 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <img
              src="/graph.png"
              alt="Projeção financeira"
              className="mx-auto mb-10 max-w-sm h-auto"
            />

            <p className="text-lg text-gray-800 mb-4 leading-relaxed">
              Imagine você daqui a <strong>6 meses</strong> com
              <span className="text-green-600 font-semibold">
                {" "}
                dinheiro sobrando
              </span>
              , podendo viajar, trocar de celular ou antecipar parcelas.
            </p>

            <p className="text-lg text-gray-800 font-semibold mb-6">
              Tudo isso porque você{" "}
              <u>decidiu organizar sua vida financeira hoje</u>.
            </p>

            <p className="text-base text-gray-700 mb-6">
              O Dona Grana foi criado por programadores e analistas financeiros
              com um único objetivo:
            </p>

            <p className="text-xl font-bold text-gray-900 mb-6">
              Te dar o controle do seu dinheiro — direto pelo WhatsApp.
            </p>

            <div className="text-2xl mb-6 leading-snug">
              🧠 E como toda inteligência...
              <br />
              <strong className="text-orange-600">tem um valor.</strong>
            </div>

            <p className="text-gray-700 mb-6 text-base">
              Poderíamos cobrar R$ 400 por ano (e ainda seria barato, pela
              economia que você vai ter).
            </p>

            <p className="text-xl font-bold text-gray-900 mb-4">
              Mas não seria justo. Nosso objetivo é a sua{" "}
              <span className="text-green-700">liberdade financeira</span>.
            </p>

            <p className="text-base text-gray-700">
              Por isso, liberamos acesso com{" "}
              <span className="font-bold text-green-600">3 dias grátis</span> e
              um plano de{" "}
              <span className="font-bold">menos de R$ 0,20 por dia</span>.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10"
          >
            <Button
              onClick={nextSection}
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-10 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-all duration-300"
            >
              🚀 Avançar para Oferta
            </Button>
          </motion.div>
        </section>
      )}

      {/* 4 - OFERTA FINAL */}
      {currentSection === 5 && (
        <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-orange-100 text-center">
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block bg-white text-red-600 font-bold text-xl px-5 py-2 rounded-full shadow-md"
            >
              ⏰ Termina em: {formatTime(timeLeft)}
            </motion.div>
          </div>
          <span className="text-xs uppercase tracking-wide bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-semibold mb-4 inline-block">
            Oferta por Tempo Limitado
          </span>

          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Assine agora e tenha acesso completo
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            Escolha um dos planos abaixo, ganhe <strong>3 dias grátis</strong> e
            comece a organizar sua vida financeira com inteligência artificial!
          </p>

          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-10">
            {/* Plano Mensal */}
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm flex flex-col justify-between mx-auto">
              <div>
                <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full w-fit mb-3">
                  Plano Mensal
                </div>
                <h3 className="text-xl font-bold mb-1">Dona Grana Mensal</h3>
                <p className="text-gray-500 mb-4">
                  Ideal para quem quer começar sem compromisso.
                </p>
                <div className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full w-fit mb-4">
                  🥳 3 dias grátis
                </div>
                <div className="text-3xl font-extrabold mb-1">R$ 19,99</div>
                <p className="text-sm text-gray-500 mb-6">
                  Cobrados mensalmente
                </p>
                <h4 className="font-semibold text-gray-800 mb-3">
                  RECURSOS INCLUÍDOS
                </h4>
                <ul className="space-y-2 text-sm text-gray-700 text-left">
                  <li>✅ Acesso ao sistema via WhatsApp</li>
                  <li>✅ Categorias personalizadas</li>
                  <li>✅ Gráficos e relatórios</li>
                  <li>✅ Inteligência artificial</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/sign-up")}
                className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg"
              >
                Assinar Mensal
              </button>
            </div>

            {/* Plano Anual */}
            <div className="bg-black text-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col justify-between mx-auto">
              <div>
                <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full w-fit mb-3">
                  🔥 Mais vantajoso
                </div>
                <h3 className="text-xl font-bold mb-1">Dona Grana Anual</h3>
                <p className="text-gray-400 mb-4">
                  Economize e tenha acesso completo por 1 ano!
                </p>
                <div className="bg-green-700 text-white text-sm font-semibold px-4 py-1 rounded-full w-fit mb-4">
                  🥳 3 dias grátis
                </div>
                <div className="text-3xl font-extrabold mb-1">R$ 199,00</div>
                <p className="text-sm text-green-400 mb-6">
                  Economia de R$ 40,00 por ano
                </p>
                <h4 className="font-semibold mb-3">RECURSOS INCLUÍDOS</h4>
                <ul className="space-y-2 text-sm text-white text-left">
                  <li>✅ Tudo do plano mensal</li>
                  <li>✅ Acesso ilimitado ao painel</li>
                  <li>✅ Prioridade no suporte</li>
                  <li>✅ Inteligência artificial aprimorada</li>
                </ul>
              </div>
              <button
                onClick={() => router.push("/sign-up")}
                className="mt-8 bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-100"
              >
                Assinar Anual
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-8">
            Após assinar, você recebe o contato da IA no WhatsApp para começar.
          </p>
        </section>
      )}
    </div>
  );
}
