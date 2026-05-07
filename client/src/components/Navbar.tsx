import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const [location, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { data: storeConfig } = trpc.storeConfig.get.useQuery();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "/", label: "Início" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/faq", label: "FAQ" },
    { href: "/contato", label: "Contato" },
    { href: "/sobre", label: "Sobre" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled
        ? "bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
        : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group"
        >
          {storeConfig?.logoUrl ? (
            <img src={storeConfig.logoUrl} alt="Logo" className="h-8 w-auto" />
          ) : (
            <span style={{ fontFamily: 'var(--font-serif)' }}
              className={`text-xl font-bold transition-colors ${
                scrolled ? "text-[#0B1829]" : "text-white"
              }`}>
              {storeConfig?.storeName || "MedicalStore"}
            </span>
          )}
        </button>

        {/* Links Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                scrolled ? "text-slate-600 hover:text-[#0B1829]" : "text-white/80 hover:text-white"
              } ${location === link.href ? (scrolled ? "text-[#10B981]" : "text-[#10B981]") : ""}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#10B981] transition-all duration-200 ${
                location === link.href ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </a>
          ))}

          {isAuthenticated && user?.role === "admin" && (
            <a href="/admin"
              className="text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors">
              Admin
            </a>
          )}

          <button
            onClick={() => navigate("/contato")}
            className="bg-[#10B981] text-white text-sm font-medium px-5 py-2 rounded-full
                       hover:bg-[#059669] transition-colors duration-200 shadow-lg shadow-green-500/20"
          >
            Solicitar Orçamento
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden transition-colors ${scrolled ? "text-[#0B1829]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {links.map(link => (
            <a key={link.href} href={link.href}
              className="block text-sm font-medium text-slate-600 hover:text-[#10B981] transition-colors py-2">
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { navigate("/contato"); setMenuOpen(false); }}
            className="w-full bg-[#10B981] text-white text-sm font-medium py-2.5 rounded-full mt-2">
            Solicitar Orçamento
          </button>
        </div>
      )}
    </nav>
  );
}
