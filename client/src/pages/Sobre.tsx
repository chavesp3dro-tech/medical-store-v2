import { motion } from "framer-motion";
import { Award, Users, Zap, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Sobre() {
  const values = [
    { icon: Award, title: "Excelência", desc: "Produtos de qualidade superior com certificação ANVISA" },
    { icon: Users, title: "Confiança", desc: "Relacionamento de longo prazo com nossos clientes" },
    { icon: Zap, title: "Inovação", desc: "Sempre atualizados com as melhores soluções do mercado" },
    { icon: Heart, title: "Compromisso", desc: "Dedicados à saúde e bem-estar de nossos clientes" },
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
              Nossa História e <em style={{ color: 'var(--green-medical)' }}>Missão</em>
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Há mais de uma década, nos dedicamos a fornecer equipamentos médicos de qualidade superior para profissionais de saúde em todo o Brasil.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                Quem Somos
              </h2>
              <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                Somos uma empresa especializada na distribuição de equipamentos médicos e hospitalares de alta qualidade. Nossa equipe é composta por profissionais experientes que entendem as necessidades específicas do setor de saúde.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Cada produto em nosso catálogo passa por rigorosos testes de qualidade e possui certificação ANVISA, garantindo segurança e confiabilidade para nossos clientes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-white p-12 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="space-y-6">
                <div>
                  <p className="text-4xl font-bold" style={{ color: 'var(--green-medical)' }}>10+</p>
                  <p style={{ color: 'var(--text-muted)' }}>Anos de experiência</p>
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: 'var(--green-medical)' }}>5000+</p>
                  <p style={{ color: 'var(--text-muted)' }}>Clientes satisfeitos</p>
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: 'var(--green-medical)' }}>100%</p>
                  <p style={{ color: 'var(--text-muted)' }}>Certificação ANVISA</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                Nossos Valores
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                Os princípios que guiam nossas ações
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow"
                >
                  <value.icon size={32} style={{ color: 'var(--green-medical)', margin: '0 auto 16px' }} />
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                    {value.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
