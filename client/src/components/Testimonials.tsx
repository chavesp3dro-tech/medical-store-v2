import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dra. Maria Silva",
      role: "Diretora de Clínica",
      text: "Excelente qualidade de produtos e atendimento impecável. Recomendo para todos os profissionais de saúde.",
      rating: 5
    },
    {
      name: "Dr. João Santos",
      role: "Médico Cirurgião",
      text: "Os equipamentos são de primeira qualidade e a entrega foi rápida. Muito satisfeito com a compra.",
      rating: 5
    },
    {
      name: "Enfermeira Carla",
      role: "Coordenadora de Enfermagem",
      text: "Produtos certificados e com garantia. A equipe de suporte é muito atenciosa e prestativa.",
      rating: 5
    },
    {
      name: "Hospital Central",
      role: "Instituição de Saúde",
      text: "Parceria de longo prazo com excelentes resultados. Recomendamos para outras instituições.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase font-medium mb-3 block"
            style={{ color: 'var(--green-medical)', fontFamily: 'var(--font-mono)' }}>
            Avaliações
          </span>
          <h2 className="text-4xl" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
            O que nossos clientes dizem
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="var(--green-medical)" style={{ color: 'var(--green-medical)' }} />
                ))}
              </div>
              <p className="mb-6" style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold" style={{ color: 'var(--navy-deep)' }}>
                  {testimonial.name}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
