import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Stethoscope, Truck, Shield } from "lucide-react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [, navigate] = useLocation();
  const { data: products } = trpc.products.list.useQuery({});
  const { data: storeConfig } = trpc.storeConfig.get.useQuery();

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-yellow-500 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Produtos Médicos e Hospitalares de Qualidade
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Sua loja de confiança para equipamentos e suprimentos médicos profissionais
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/catalogo")}
                className="bg-white text-primary hover:bg-gray-100"
              >
                Ver Catálogo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/contato")}
                className="border-white text-white hover:bg-white/10"
              >
                Falar com Vendedor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Por que nos escolher?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <Stethoscope className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Produtos Certificados</h3>
              <p className="text-gray-600">Todos os produtos possuem certificações e normas de qualidade</p>
            </Card>
            <Card className="p-6 text-center">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Enviamos para todo o Brasil com segurança e rapidez</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Garantia</h3>
              <p className="text-gray-600">Garantia completa em todos os nossos produtos</p>
            </Card>
            <Card className="p-6 text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Equipe especializada pronta para ajudar você</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12">Produtos em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
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
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
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
            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => navigate("/catalogo")}
              >
                Ver Todos os Produtos
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Precisa de Ajuda?</h2>
          <p className="text-lg mb-8 opacity-90">
            Nossa equipe está pronta para responder suas dúvidas e ajudar com sua compra
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/contato")}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Entre em Contato Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">MedicalStore</h3>
              <p className="text-gray-400">Sua loja de confiança para produtos médicos e hospitalares</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/catalogo" className="hover:text-white transition">Catálogo</a></li>
                <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="/contato" className="hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                {storeConfig?.contactEmail && (
                  <li>Email: {storeConfig.contactEmail}</li>
                )}
                {storeConfig?.whatsappNumber && (
                  <li>WhatsApp: {storeConfig.whatsappNumber}</li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Informações</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition">Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 MedicalStore. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
