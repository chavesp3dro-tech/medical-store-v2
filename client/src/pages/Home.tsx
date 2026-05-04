import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Stethoscope, Truck, Shield, HeartPulse, ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Home() {
  const [, navigate] = useLocation();
  const { data: products } = trpc.products.list.useQuery({});
  const { data: storeConfig } = trpc.storeConfig.get.useQuery();
  const featured = products?.slice(0, 3) || [];
  const whatsapp = storeConfig?.whatsappNumber?.replace(/\D/g, '');

  const features = [
    { icon: Stethoscope, title: "Produtos Certificados", text: "Equipamentos com certificações ANVISA e normas técnicas de qualidade" },
    { icon: Truck, title: "Entrega Nacional", text: "Envios seguros para todo o Brasil com rastreamento em tempo real" },
    { icon: Shield, title: "Garantia Completa", text: "12 meses de garantia em todos os produtos da nossa linha" },
    { icon: HeartPulse, title: "Suporte Especializado", text: "Equipe técnica disponível para auxiliar na escolha e uso dos equipamentos" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>

        {/* ECG decorativo */}
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" preserveAspectRatio="none">
          <polyline
            className="ecg-line"
            points="0,50% 10%,50% 15%,20% 20%,80% 25%,10% 30%,90% 35%,50% 100%,50%"
            fill="none" stroke="#00C2D4" strokeWidth="2"
          />
        </svg>

        {/* Glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,194,212,0.12) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Copy */}
            <div>
              <motion.span
                variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="inline-block text-xs tracking-[0.35em] uppercase font-medium mb-6 px-3 py-1.5 rounded-full border"
                style={{ color: 'var(--cyan-clinical)', borderColor: 'rgba(0,194,212,0.3)', fontFamily: 'var(--font-mono)' }}
              >
                Equipamentos Hospitalares Certificados
              </motion.span>

              <motion.h1
                variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] mb-6"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Precisão que<br />
                <em style={{ color: 'var(--cyan-clinical)' }}>salva vidas.</em>
              </motion.h1>

              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="text-lg mb-10 max-w-md leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {storeConfig?.description || "Sua fonte confiável de equipamentos médicos e hospitalares com qualidade e certificação garantidas."}
              </motion.p>

              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => navigate("/catalogo")}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--cyan-clinical)', fontFamily: 'var(--font-sans)' }}
                >
                  Ver Catálogo <ArrowRight size={16} />
                </button>

                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos.')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5"
                    style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }}
                  >
                    Falar com Especialista
                  </a>
                )}
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                { value: products?.length || "—", label: "Produtos Disponíveis" },
                { value: "ANVISA", label: "Certificação" },
                { value: "12 meses", label: "Garantia Padrão" },
                { value: "24/7", label: "Suporte Técnico" },
              ].map((stat, i) => (
                <div key={i}
                  className="rounded-2xl p-6 border"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <p className="text-3xl font-semibold mb-1" style={{ color: 'var(--cyan-clinical)', fontFamily: 'var(--font-mono)' }}>
                    {stat.value}
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="var(--platinum)" />
          </svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24" style={{ backgroundColor: 'var(--platinum)' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.3em] uppercase font-medium mb-3 block"
              style={{ color: 'var(--cyan-clinical)', fontFamily: 'var(--font-mono)' }}>
              Por que nos escolher
            </span>
            <h2 className="text-4xl" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Qualidade em cada detalhe
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 hover:bg-[#0B1829] transition-all duration-300 cursor-default"
              >
                <span className="block text-5xl font-bold mb-5 transition-colors"
                  style={{ fontFamily: 'var(--font-mono)', color: 'rgba(0,194,212,0.15)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,194,212,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,194,212,0.15)')}
                >
                  0{i + 1}
                </span>
                <f.icon className="w-7 h-7 mb-4 transition-colors" style={{ color: 'var(--cyan-clinical)' }} />
                <h3 className="text-lg mb-2 transition-colors group-hover:text-white"
                  style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed transition-colors group-hover:text-slate-300"
                  style={{ color: 'var(--text-muted)' }}>
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUTOS EM DESTAQUE ── */}
      {featured.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase font-medium mb-2 block"
                  style={{ color: 'var(--cyan-clinical)', fontFamily: 'var(--font-mono)' }}>
                  Seleção especial
                </span>
                <h2 className="text-4xl" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                  Produtos em Destaque
                </h2>
              </div>
              <button
                onClick={() => navigate("/catalogo")}
                className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: 'var(--cyan-clinical)' }}
              >
                Ver todos <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((product, i) => {
                const price = typeof product.price === 'string'
                  ? parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                  : (product.price as any)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00';

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                    onClick={() => navigate(`/produto/${product.slug}`)}
                    className="group relative rounded-2xl overflow-hidden border border-slate-100 bg-white cursor-pointer
                               hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-56 bg-slate-50">
                      {Array.isArray(product.imageUrls) && product.imageUrls.length > 0 ? (
                        <img
                          src={String(product.imageUrls[0])}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Stethoscope className="w-16 h-16 text-slate-200" />
                        </div>
                      )}
                      {/* Overlay CTA */}
                      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to top, rgba(11,24,41,0.85) 0%, transparent 60%)' }}>
                        <span className="text-white text-sm font-medium flex items-center gap-1"
                          style={{ fontFamily: 'var(--font-sans)' }}>
                          Ver detalhes <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-base font-medium mb-3 line-clamp-2 leading-snug"
                        style={{ color: 'var(--navy-deep)', fontFamily: 'var(--font-sans)' }}>
                        {product.name}
                      </h3>
                      <p className="text-2xl font-semibold" style={{ color: 'var(--amber-price)', fontFamily: 'var(--font-mono)' }}>
                        R$ {price}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center mt-12 md:hidden">
              <button
                onClick={() => navigate("/catalogo")}
                className="px-8 py-3 rounded-full text-white text-sm font-medium"
                style={{ backgroundColor: 'var(--navy-deep)' }}
              >
                Ver Todos os Produtos
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ── */}
      <section className="py-24" style={{ backgroundColor: 'var(--navy-deep)' }}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase font-medium mb-4 block"
              style={{ color: 'var(--cyan-clinical)', fontFamily: 'var(--font-mono)' }}>
              Fale com um especialista
            </span>
            <h2 className="text-4xl md:text-5xl text-white mb-6"
              style={{ fontFamily: 'var(--font-serif)' }}>
              Pronto para equipar<br />seu consultório?
            </h2>
            <p className="mb-10 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Nossa equipe especializada está disponível para ajudar você a escolher os melhores equipamentos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#25D366' }}>
                  Falar via WhatsApp
                </a>
              )}
              <button onClick={() => navigate("/contato")}
                className="px-8 py-3.5 rounded-full text-white text-sm font-medium transition-all hover:opacity-80"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                Enviar Mensagem
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#060F1A' }}>
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="md:col-span-2">
              <p className="text-xl font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                {storeConfig?.storeName || "MedicalStore"}
              </p>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {storeConfig?.description || "Sua fonte confiável de equipamentos médicos e hospitalares certificados."}
              </p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-4 font-medium" style={{ color: 'var(--cyan-clinical)', fontFamily: 'var(--font-mono)' }}>
                Navegação
              </p>
              <ul className="space-y-2.5">
                {[["Catálogo", "/catalogo"], ["FAQ", "/faq"], ["Contato", "/contato"]].map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-4 font-medium" style={{ color: 'var(--cyan-clinical)', fontFamily: 'var(--font-mono)' }}>
                Contato
              </p>
              <ul className="space-y-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {storeConfig?.contactEmail && <li>{storeConfig.contactEmail}</li>}
                {storeConfig?.whatsappNumber && <li>{storeConfig.whatsappNumber}</li>}
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © 2026 {storeConfig?.storeName || "MedicalStore"}. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              {[["Privacidade", "#"], ["Termos", "#"]].map(([label, href]) => (
                <a key={label} href={href} className="text-xs transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
