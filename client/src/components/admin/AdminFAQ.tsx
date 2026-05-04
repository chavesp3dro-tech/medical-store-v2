import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminFAQ() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "", order: 0 });

  const { data: faqs, refetch } = trpc.faqs.listAll.useQuery();
  const createFAQ = trpc.faqs.create.useMutation();
  const updateFAQ = trpc.faqs.update.useMutation();
  const deleteFAQ = trpc.faqs.delete.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "order" ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateFAQ.mutateAsync({ id: editingId, ...formData });
        toast.success("FAQ atualizado com sucesso");
      } else {
        await createFAQ.mutateAsync(formData);
        toast.success("FAQ criado com sucesso");
      }
      setFormData({ question: "", answer: "", order: 0 });
      setEditingId(null);
      setIsFormOpen(false);
      refetch();
    } catch (error) {
      toast.error("Erro ao salvar FAQ");
    }
  };

  const handleEdit = (faq: any) => {
    setFormData({ question: faq.question, answer: faq.answer, order: faq.order });
    setEditingId(faq.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este FAQ?")) {
      try {
        await deleteFAQ.mutateAsync({ id });
        toast.success("FAQ deletado com sucesso");
        refetch();
      } catch (error) {
        toast.error("Erro ao deletar FAQ");
      }
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ question: "", answer: "", order: 0 });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciar FAQ</h2>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo FAQ
        </Button>
      </div>

      {isFormOpen && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Editar FAQ" : "Novo FAQ"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Pergunta *</label>
              <Input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Qual é sua pergunta?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Resposta *</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                placeholder="Resposta detalhada"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Ordem</label>
              <Input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                {editingId ? "Atualizar" : "Criar"}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {faqs && faqs.length > 0 ? (
          faqs.map((faq) => (
            <Card key={faq.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-gray-600 text-sm mt-2">{faq.answer}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Ordem: {faq.order}</span>
                    <span>{faq.isActive ? "✓ Ativo" : "✗ Inativo"}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(faq)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(faq.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">Nenhum FAQ cadastrado</p>
            <Button onClick={() => setIsFormOpen(true)}>Criar Primeiro FAQ</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
