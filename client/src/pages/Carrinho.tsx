import { useCart } from "@/contexts/CartContext";
import { useLocation } from "wouter";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Carrinho() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [, navigate] = useLocation();

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)', fontFamily: 'var(--font-sans)' }}>
        <Navbar />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
            Seu Carrinho está Vazio
          </h1>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
            Explore nosso catálogo e adicione produtos ao seu carrinho
          </p>
          <button
            onClick={() => navigate("/catalogo")}
            className="px-8 py-3 rounded-full text-white font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--green-medical)' }}
          >
            Ir para Catálogo
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--platinum)', fontFamily: 'var(--font-sans)' }}>
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <button
          onClick={() => navigate("/catalogo")}
          className="flex items-center gap-2 mb-8 transition-colors hover:opacity-70"
          style={{ color: 'var(--green-medical)' }}
        >
          <ArrowLeft size={20} />
          Continuar Comprando
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl mb-8" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Carrinho de Compras
            </h1>

            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl border border-slate-100 flex items-center gap-6"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--navy-deep)' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                      R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold mb-2" style={{ color: 'var(--navy-deep)' }}>
                      R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white p-8 rounded-xl border border-slate-100 sticky top-24">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
                Resumo
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal:</span>
                  <span className="font-semibold">
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-muted)' }}>Frete:</span>
                  <span className="font-semibold">Calcular</span>
                </div>
              </div>

              <div className="mb-6 flex justify-between text-lg font-bold" style={{ color: 'var(--navy-deep)' }}>
                <span>Total:</span>
                <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>

              <button
                className="w-full py-3 rounded-full text-white font-semibold mb-3 transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--green-medical)' }}
              >
                Finalizar Compra
              </button>

              <button
                onClick={() => clearCart()}
                className="w-full py-3 rounded-full font-semibold transition-all border"
                style={{ borderColor: 'var(--slate-border)', color: 'var(--text-muted)' }}
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
