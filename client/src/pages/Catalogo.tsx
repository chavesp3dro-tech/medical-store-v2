import Footer from "@/components/Footer";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import { useLocation } from "wouter";
import { Search, Stethoscope, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />

      {/* Header */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ backgroundColor: 'var(--navy-deep)' }}>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points="0,50% 10%,50% 15%,20% 20%,80% 25%,10% 30%,90% 35%,50% 100%,50%"
              fill="none" stroke="#10B981" strokeWidth="2"
            />
          </svg>
      <Footer />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Catálogo de Produtos
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Encontre os melhores equipamentos médicos e hospitalares certificados
            </p>
          </motion.div>
      <Footer />
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtros */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl sticky top-24 border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-lg mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                Filtros
              </h3>

              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
                  Buscar Produto
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Nome do produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-slate-200 rounded-full px-5 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                    style={{ fontSize: '0.875rem' }}
                  />
      <Footer />
                </div>
      <Footer />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
                  Categorias
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(undefined)}
                    className={`w-full text-left px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      selectedCategory === undefined
                        ? "border-transparent text-white"
                        : "border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                    style={{
                      backgroundColor: selectedCategory === undefined ? 'var(--navy-deep)' : 'transparent',
                      color: selectedCategory === undefined ? 'white' : 'var(--text-muted)'
                    }}
                  >
                    Todas as Categorias
                  </button>
                  {categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        selectedCategory === cat.id
                          ? "border-transparent text-white"
                          : "border-slate-200 text-slate-600 hover:border-slate-400"
                      }`}
                      style={{
                        backgroundColor: selectedCategory === cat.id ? 'var(--navy-deep)' : 'transparent',
                        color: selectedCategory === cat.id ? 'white' : 'var(--text-muted)'
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
      <Footer />
                </div>
      <Footer />
              </div>
      <Footer />
            </div>
      <Footer />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product, i) => {
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
      <Footer />
                          </div>
                        )}
                        {/* Overlay CTA */}
                        <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to top, rgba(11,24,41,0.85) 0%, transparent 60%)' }}>
                          <span className="text-white text-sm font-medium flex items-center gap-1"
                            style={{ fontFamily: 'var(--font-sans)' }}>
                            Ver detalhes <ArrowRight size={14} />
                          </span>
      <Footer />
                        </div>
      <Footer />
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="text-base font-medium mb-3 line-clamp-2 leading-snug"
                          style={{ color: 'var(--navy-deep)', fontFamily: 'var(--font-sans)' }}>
                          {product.name}
                        </h3>
                        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                          {product.description}
                        </p>
                        <p className="text-2xl font-semibold" style={{ color: 'var(--amber-price)', fontFamily: 'var(--font-mono)' }}>
                          R$ {price}
                        </p>
      <Footer />
                      </div>
                    </motion.div>
                  );
                })}
      <Footer />
              </div>
            ) : (
              <div className="text-center py-16">
                <Stethoscope className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
                  Nenhum produto encontrado
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory(undefined);
                  }}
                  className="px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--navy-deep)' }}
                >
                  Limpar Filtros
                </button>
      <Footer />
              </div>
            )}
      <Footer />
          </div>
      <Footer />
        </div>
      <Footer />
      </div>
      <Footer />
    </div>
  );
}
