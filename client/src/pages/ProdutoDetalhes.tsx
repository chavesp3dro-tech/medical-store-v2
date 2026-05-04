import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ChevronLeft, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

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
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container py-12">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container py-12">
          <p>Produto não encontrado</p>
          <Button onClick={() => navigate("/catalogo")}>Voltar ao Catálogo</Button>
        </div>
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/catalogo")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar ao Catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              {currentImage ? (
                <img
                  src={String(currentImage)}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-400">Sem imagem</p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`rounded overflow-hidden border-2 transition ${
                      idx === currentImageIndex
                        ? "border-primary"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={String(img)}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Preço</p>
              <p className="text-4xl font-bold text-primary">
                R$ {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : (product.price as any)?.toFixed(2) || '0.00'}
              </p>
            </div>

            {/* Description */}
            {(product.description as any) && (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                  <p className="text-gray-700 leading-relaxed">{String(product.description)}</p>
                </div>
              </>
            )}

            {/* Specifications */}
            {product.specifications && typeof product.specifications === 'object' && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Especificações Técnicas</h2>
                <div className="space-y-2">
                  {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">{String(key)}</span>
                      <span className="font-semibold">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Falar via WhatsApp
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleContact}
                className="w-full flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar Mensagem
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Informação:</strong> Este produto é certificado e atende às normas técnicas de qualidade. Para mais detalhes, entre em contato conosco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
