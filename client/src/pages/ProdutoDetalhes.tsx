import { useCart } from "@/contexts/CartContext";
import Footer from "@/components/Footer";
import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import { useLocation } from "wouter";
import { Stethoscope } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProdutoDetalhes() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/produto/:slug");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading } = trpc.products.getBySlug.useQuery(
    { slug: params?.slug || "" },
    { enabled: !!params?.slug }
  );
  const { data: storeConfig } = trpc.storeConfig.get.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)' }}>
        <Navbar />
        <div className="container py-12">
          <p style={{ color: 'var(--text-muted)' }}>Carregando...</p>
      <Footer />
        </div>
      <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)' }}>
        <Navbar />
        <div className="container py-12">
          <p style={{ color: 'var(--text-muted)' }}>Produto não encontrado</p>
          <button
            onClick={() => navigate("/catalogo")}
            className="mt-4 px-6 py-2.5 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: 'var(--navy-deep)' }}
          >
            Voltar ao Catálogo
          </button>
      <Footer />
        </div>
      <Footer />
      </div>
    );
  }

  const images = Array.isArray(product.imageUrls) ? product.imageUrls : [];
  const currentImage = images[currentImageIndex];

  const handleWhatsApp = () => {
    if (storeConfig?.whatsappNumber) {
      const message = `Olá! Tenho interesse no produto: ${product.name}`;
      const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleContact = () => {
    navigate("/contato");
  };

  const price = typeof product.price === 'string'
    ? parseFloat(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    : (product.price as any)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />

      {/* Layout split 50/50 em desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">

        {/* Painel esquerdo — imagem sticky */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] flex items-center justify-center p-8 md:p-16"
          style={{ backgroundColor: '#F0F4F8' }}>
          {currentImage ? (
            <img src={String(currentImage)} alt={product.name}
              className="max-h-[480px] w-auto object-contain drop-shadow-2xl" />
          ) : (
            <div className="w-full h-80 flex items-center justify-center rounded-xl"
              style={{ backgroundColor: '#E2E8F0' }}>
              <Stethoscope className="w-24 h-24 text-slate-300" />
      <Footer />
            </div>
          )}

          {/* Thumbs */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
              {images.map((img, idx) => (
                <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                    idx === currentImageIndex ? 'border-[#10B981]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}>
                  <img src={String(img)} className="w-full h-full object-cover" />
                </button>
              ))}
      <Footer />
            </div>
          )}
      <Footer />
        </div>

        {/* Painel direito — info */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <button onClick={() => navigate("/catalogo")}
            className="flex items-center gap-1 text-sm mb-8 transition-colors hover:opacity-70 w-fit"
            style={{ color: 'var(--cyan-clinical)', fontFamily: 'var(--font-mono)' }}>
            ← Voltar ao Catálogo
          </button>

          <span className="text-xs tracking-[0.3em] uppercase font-medium mb-2 block"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {product.category?.name || "Equipamento"}
          </span>

          <h1 className="text-3xl md:text-4xl mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
            {product.name}
          </h1>

          <p className="text-4xl font-semibold mb-8"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--amber-price)' }}>
            R$ {price}
          </p>

          {/* Descrição */}
          {product.description && (
            <div className="mb-8 pb-8 border-b border-slate-100">
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {String(product.description)}
              </p>
      <Footer />
            </div>
          )}

          {/* Specs */}
          {product.specifications && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase font-medium mb-4"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Especificações Técnicas
              </p>
              <div className="space-y-0 border border-slate-100 rounded-xl overflow-hidden">
                {Object.entries(product.specifications as Record<string, any>).map(([key, value], i) => (
                  <div key={key} className={`flex justify-between px-5 py-3 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <span style={{ color: 'var(--text-muted)' }}>{String(key)}</span>
                    <span className="font-medium" style={{ color: 'var(--navy-deep)', fontFamily: 'var(--font-mono)' }}>
                      {String(value)}
                    </span>
      <Footer />
                  </div>
                ))}
      <Footer />
              </div>
      <Footer />
            </div>
          )}

          {/* CTAs */}
          <div className="space-y-3">
            <button onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-white text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}>
              Falar via WhatsApp
            </button>
            <button onClick={handleContact}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-medium transition-all hover:bg-slate-50"
              style={{ border: '1.5px solid var(--navy-deep)', color: 'var(--navy-deep)' }}>
              Enviar Mensagem
            </button>
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
