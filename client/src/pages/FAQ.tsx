import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Como faço para fazer um pedido?",
      answer: "Você pode fazer um pedido adicionando produtos ao carrinho e finalizando a compra. Também pode entrar em contato conosco pelo WhatsApp para fazer pedidos personalizados ou em grande volume."
    },
    {
      question: "Qual é o prazo de entrega?",
      answer: "O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização. Você receberá um código de rastreamento para acompanhar seu pedido em tempo real."
    },
    {
      question: "Todos os produtos têm certificação ANVISA?",
      answer: "Sim! Todos os equipamentos em nosso catálogo possuem certificação ANVISA e atendem rigorosamente às normas técnicas internacionais de saúde e segurança."
    },
    {
      question: "Qual é a política de garantia?",
      answer: "Oferecemos 12 meses de garantia completa em todos os produtos. Se encontrar algum defeito, entre em contato conosco e faremos a reposição ou reparo sem custo adicional."
    },
    {
      question: "Vocês fazem vendas para hospitais e clínicas?",
      answer: "Sim! Oferecemos soluções especiais para instituições de saúde, incluindo preços competitivos, prazos de pagamento flexíveis e suporte técnico dedicado."
    },
    {
      question: "Como posso tirar dúvidas sobre um produto específico?",
      answer: "Você pode entrar em contato conosco pelo WhatsApp, email ou telefone. Nossa equipe de especialistas está disponível 24/7 para orientá-lo na escolha do melhor produto."
    },
    {
      question: "Vocês oferecem treinamento para uso dos equipamentos?",
      answer: "Sim! Oferecemos treinamento técnico gratuito para todos os clientes. Podemos agendar sessões presenciais ou online conforme sua necessidade."
    },
    {
      question: "Qual é a forma de pagamento?",
      answer: "Aceitamos cartão de crédito, transferência bancária, PIX e boleto. Para grandes volumes, oferecemos condições de pagamento especiais."
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              Perguntas <em style={{ color: 'var(--green-medical)' }}>Frequentes</em>
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                      {faq.question}
                    </h3>
                    <ChevronDown
                      size={24}
                      style={{ color: 'var(--green-medical)' }}
                      className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-slate-50 border-x border-b border-slate-100 rounded-b-xl">
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-8 bg-white rounded-xl border border-slate-100 text-center"
          >
            <h2 className="text-2xl font-semibold mb-3" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Ainda tem dúvidas?
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Entre em contato com nossa equipe de especialistas
            </p>
            <a
              href="/contato"
              className="inline-block px-8 py-3 rounded-full text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--green-medical)' }}
            >
              Fale Conosco
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
