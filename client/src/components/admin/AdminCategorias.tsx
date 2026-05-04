import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategorias() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "" });

  const { data: categories, refetch } = trpc.categories.list.useQuery();
  const createCategory = trpc.categories.create.useMutation();
  const updateCategory = trpc.categories.update.useMutation();
  const deleteCategory = trpc.categories.delete.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateCategory.mutateAsync({ id: editingId, ...formData });
        toast.success("Categoria atualizada com sucesso");
      } else {
        await createCategory.mutateAsync(formData);
        toast.success("Categoria criada com sucesso");
      }
      setFormData({ name: "", slug: "", description: "" });
      setEditingId(null);
      setIsFormOpen(false);
      refetch();
    } catch (error) {
      toast.error("Erro ao salvar categoria");
    }
  };

  const handleEdit = (cat: any) => {
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description || "" });
    setEditingId(cat.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar esta categoria?")) {
      try {
        await deleteCategory.mutateAsync({ id });
        toast.success("Categoria deletada com sucesso");
        refetch();
      } catch (error) {
        toast.error("Erro ao deletar categoria");
      }
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({ name: "", slug: "", description: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gerenciar Categorias</h2>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova Categoria
        </Button>
      </div>

      {isFormOpen && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Editar Categoria" : "Nova Categoria"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nome da categoria"
              required
            />
            <Input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="slug-da-categoria"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição (opcional)"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
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
        {categories && categories.length > 0 ? (
          categories.map((cat) => (
            <Card key={cat.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{cat.name}</h3>
                  <p className="text-gray-600 text-sm">{cat.description}</p>
                  <p className="text-gray-500 text-xs mt-2">Slug: {cat.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(cat)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(cat.id)}
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
            <p className="text-gray-600 mb-4">Nenhuma categoria cadastrada</p>
            <Button onClick={() => setIsFormOpen(true)}>Criar Primeira Categoria</Button>
          </Card>
        )}
      </div>
    </div>
  );
}
