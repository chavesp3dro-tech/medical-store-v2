import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    type: "contact" as const,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: storeConfig } = trpc.storeConfig.get.useQuery();
  const createContact = trpc.contacts.create.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContact.mutateAsync(formData);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      setFormData({ name: "", email: "", phone: "", message: "", type: "contact" });
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (storeConfig?.whatsappNumber) {
      const message = "Olá! Gostaria de falar com um vendedor.";
      const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-yellow-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-lg opacity-90">Estamos aqui para ajudar você</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* WhatsApp */}
              {storeConfig?.whatsappNumber && (
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                    <h3 className="font-semibold text-lg">WhatsApp</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{storeConfig.whatsappNumber}</p>
                  <Button
                    onClick={handleWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Abrir WhatsApp
                  </Button>
                </Card>
              )}

              {/* Email */}
              {storeConfig?.contactEmail && (
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                    <h3 className="font-semibold text-lg">Email</h3>
                  </div>
                  <p className="text-gray-600">{storeConfig.contactEmail}</p>
                </Card>
              )}

              {/* Info */}
              <Card className="p-6 bg-blue-50">
                <div className="flex items-center gap-4 mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                  <h3 className="font-semibold text-lg">Horário de Atendimento</h3>
                </div>
                <p className="text-gray-700">
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 13h<br />
                  Domingo: Fechado
                </p>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Nome Completo *</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Telefone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Tipo de Contato *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="contact">Dúvida Geral</option>
                    <option value="vendor_request">Falar com Vendedor</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Mensagem *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Sua mensagem aqui..."
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
