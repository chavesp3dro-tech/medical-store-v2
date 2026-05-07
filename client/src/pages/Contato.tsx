import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contato() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { data: storeConfig } = trpc.storeConfig.get.useQuery();
  const createContact = trpc.contacts.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact.mutateAsync({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setFormData({ name: "", email: "", message: "" });
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: storeConfig?.contactEmail || "contato@medicalstore.com" },
    { icon: Phone, label: "WhatsApp", value: storeConfig?.whatsappNumber || "(11) 99999-9999" },
    { icon: MapPin, label: "Localização", value: "São Paulo, SP - Brasil" },
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
              Entre em <em style={{ color: 'var(--green-medical)' }}>Contato</em>
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Estamos aqui para ajudar. Entre em contato conosco por qualquer dúvida ou sugestão.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-8" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Informações de Contato
            </h2>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--green-light)' }}>
                    <info.icon size={24} style={{ color: 'var(--green-medical)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {info.label}
                    </p>
                    <p className="font-semibold" style={{ color: 'var(--navy-deep)' }}>
                      {info.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Horário */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 p-6 bg-white rounded-xl border border-slate-100"
            >
              <h3 className="font-semibold mb-4" style={{ color: 'var(--navy-deep)' }}>
                Horário de Atendimento
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Segunda a Sexta: 08:00 - 18:00
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Sábado: 09:00 - 13:00
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Domingo: Fechado
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-100"
          >
            <h2 className="text-2xl font-semibold mb-8" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Envie uma Mensagem
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-deep)' }}>
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-deep)' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-deep)' }}>
                  Mensagem
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Sua mensagem aqui..."
                />
              </div>

              <button
                type="submit"
                disabled={createContact.isPending}
                className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--green-medical)' }}
              >
                <Send size={18} />
                {createContact.isPending ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
