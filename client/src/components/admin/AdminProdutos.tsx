import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminProdutoForm from "./AdminProdutoForm";

export default function AdminProdutos() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: products, refetch } = trpc.products.list.useQuery({});
  const { data: categories } = trpc.categories.list.useQuery();
  const deleteProduct = trpc.products.delete.useMutation();

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
      try {
        await deleteProduct.mutateAsync({ id });
        toast.success("Produto deletado com sucesso");
        refetch();
      } catch (error) {
        toast.error("Erro ao deletar produto");
      }
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingId(null);
    refetch();
  };

  return (
    <div>
      {isFormOpen || editingId ? (
        <AdminProdutoForm
          productId={editingId || undefined}
          onClose={handleFormClose}
          categories={categories || []}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </div>

          <div className="grid gap-4">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-primary font-bold">
                          R$ {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : (product.price as any)?.toFixed(2) || '0.00'}
                        </span>
                        <span className={`px-2 py-1 rounded ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {product.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(product.id)}
                        className="flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
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
                <p className="text-gray-600 mb-4">Nenhum produto cadastrado</p>
                <Button onClick={() => setIsFormOpen(true)}>Criar Primeiro Produto</Button>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
