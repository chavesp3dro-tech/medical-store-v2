import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";


interface AdminProdutoFormProps {
  productId?: number;
  onClose: () => void;
  categories: any[];
}

export default function AdminProdutoForm({ productId, onClose, categories }: AdminProdutoFormProps) {
  const [formData, setFormData] = useState({
    categoryId: categories[0]?.id || 0,
    name: "",
    slug: "",
    description: "",
    price: "",
    imageUrls: [] as string[],
    specifications: {} as Record<string, string>,
  });

  const { data: product, isLoading } = trpc.products.get.useQuery(
    { id: productId || 0 },
    { enabled: !!productId }
  );

  const createProduct = trpc.products.create.useMutation();
  const updateProduct = trpc.products.update.useMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        categoryId: product.categoryId,
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        price: typeof product.price === 'string' ? product.price : String(product.price),
        imageUrls: (product.imageUrls as string[]) || [],
        specifications: (product.specifications as Record<string, string>) || {},
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (productId) {
        await updateProduct.mutateAsync({
          id: productId,
          categoryId: formData.categoryId,
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          price: formData.price,
          imageUrls: formData.imageUrls,
          specifications: formData.specifications,
        });
        toast.success("Produto atualizado com sucesso");
      } else {
        await createProduct.mutateAsync({
          categoryId: formData.categoryId,
          name: formData.name,
          slug: formData.slug,
          description: formData.description,
          price: formData.price,
          imageUrls: formData.imageUrls,
          specifications: formData.specifications,
        });
        toast.success("Produto criado com sucesso");
      }
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar produto");
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Card className="p-6">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </button>

      <h2 className="text-2xl font-bold mb-6">
        {productId ? "Editar Produto" : "Novo Produto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-2">Categoria *</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nome do Produto *</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome do produto"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold mb-2">Slug (URL) *</label>
          <Input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="nome-do-produto"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrição do produto"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold mb-2">Preço (R$) *</label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>

        {/* Images */}
        <div>
          <ImageUpload
            onImagesSelected={(urls) => {
              setFormData((prev) => ({ ...prev, imageUrls: urls }));
            }}
            existingImages={formData.imageUrls as string[]}
          />
        </div>

        {/* Specifications */}
        <div>
          <label className="block text-sm font-semibold mb-2">Especificações Técnicas</label>
          <div className="space-y-2">
            {Object.entries(formData.specifications).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <Input
                  type="text"
                  value={key}
                  placeholder="Nome da especificação"
                  disabled
                  className="flex-1"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => handleSpecChange(key, e.target.value)}
                  placeholder="Valor"
                  className="flex-1"
                />
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const key = `spec_${Date.now()}`;
              handleSpecChange(key, "");
            }}
            className="mt-2"
          >
            + Adicionar Especificação
          </Button>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {productId ? "Atualizar Produto" : "Criar Produto"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}
