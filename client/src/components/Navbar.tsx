import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, LogOut } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const isAdmin = user?.role === "admin";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <ShoppingCart className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground">MedicalStore</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-foreground hover:text-primary transition">Início</a>
          <a href="/catalogo" className="text-foreground hover:text-primary transition">Catálogo</a>
          <a href="/faq" className="text-foreground hover:text-primary transition">FAQ</a>
          <a href="/contato" className="text-foreground hover:text-primary transition">Contato</a>
          
          {isAdmin && (
            <a href="/admin" className="text-foreground hover:text-primary transition font-semibold">Admin</a>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">{user?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Entrar
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container flex flex-col gap-4">
            <a href="/" className="text-foreground hover:text-primary transition" onClick={() => setIsOpen(false)}>Início</a>
            <a href="/catalogo" className="text-foreground hover:text-primary transition" onClick={() => setIsOpen(false)}>Catálogo</a>
            <a href="/faq" className="text-foreground hover:text-primary transition" onClick={() => setIsOpen(false)}>FAQ</a>
            <a href="/contato" className="text-foreground hover:text-primary transition" onClick={() => setIsOpen(false)}>Contato</a>
            
            {isAdmin && (
              <a href="/admin" className="text-foreground hover:text-primary transition font-semibold" onClick={() => setIsOpen(false)}>Admin</a>
            )}

            <div className="border-t border-gray-200 pt-4">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-gray-600 mb-2">{user?.name}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => {
                    window.location.href = getLoginUrl();
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
