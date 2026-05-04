import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { Search, Filter } from "lucide-react";

export default function Catalogo() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const { data: products } = trpc.products.list.useQuery({ categoryId: selectedCategory });
  const { data: categories } = trpc.categories.list.useQuery();

  const filteredProducts = products?.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-yellow-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Produtos</h1>
          <p className="text-lg opacity-90">Encontre os melhores produtos médicos e hospitalares</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Nome do produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold mb-3">Categorias</label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(undefined)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === undefined
                        ? "bg-primary text-white"
                        : "bg-white text-foreground hover:bg-gray-100"
                    }`}
                  >
                    Todas as Categorias
                  </button>
                  {categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === cat.id
                          ? "bg-primary text-white"
                          : "bg-white text-foreground hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/produto/${product.slug}`)}
                  >
                    {Array.isArray(product.imageUrls) && product.imageUrls.length > 0 && (
                      <img
                        src={String(product.imageUrls[0])}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold text-lg">
                          R$ {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : (product.price as any)?.toFixed(2) || '0.00'}
                        </span>
                        <Button size="sm">Ver Detalhes</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">Nenhum produto encontrado</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(undefined);
                }}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
