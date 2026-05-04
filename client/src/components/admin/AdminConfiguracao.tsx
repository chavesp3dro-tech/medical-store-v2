import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminConfiguracao() {
  const [formData, setFormData] = useState({
    storeName: "",
    whatsappNumber: "",
    contactEmail: "",
    description: "",
    logoUrl: "",
  });

  const { data: config } = trpc.storeConfig.get.useQuery();
  const updateConfig = trpc.storeConfig.update.useMutation();

  useEffect(() => {
    if (config) {
      setFormData({
        storeName: config.storeName || "",
        whatsappNumber: config.whatsappNumber || "",
        contactEmail: config.contactEmail || "",
        description: config.description || "",
        logoUrl: config.logoUrl || "",
      });
    }
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateConfig.mutateAsync(formData);
      toast.success("Configurações atualizadas com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar configurações");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Configurações da Loja</h2>

      <Card className="p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Nome da Loja</label>
            <Input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              placeholder="MedicalStore"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-semibold mb-2">Número WhatsApp</label>
            <Input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="+55 11 99999-9999"
            />
            <p className="text-xs text-gray-600 mt-1">
              Formato: +55 11 99999-9999 (inclua o código do país)
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email de Contato</label>
            <Input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contato@medicalstore.com"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Descrição da Loja</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição breve sobre sua loja"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">URL da Logo</label>
            <Input
              type="text"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
            <p className="text-xs text-gray-600 mt-1">
              Cole aqui a URL da imagem da sua logo (será exibida na navbar)
            </p>
            {formData.logoUrl && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Preview:</p>
                <img
                  src={formData.logoUrl}
                  alt="Logo"
                  className="h-16 object-contain"
                  onError={() => toast.error("Erro ao carregar imagem")}
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Salvar Configurações
          </Button>
        </form>
      </Card>

      {/* Info Box */}
      <Card className="p-6 mt-6 bg-blue-50">
        <h3 className="font-semibold mb-3">Dicas</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Para fazer upload de imagens, use a página de produtos ou categorias</li>
          <li>• O número de WhatsApp será usado nos botões de contato</li>
          <li>• A logo será exibida no topo de todas as páginas</li>
          <li>• Mantenha o email de contato atualizado para receber notificações</li>
        </ul>
      </Card>
    </div>
  );
}
