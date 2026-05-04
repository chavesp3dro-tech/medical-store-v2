import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import AdminProdutos from "@/components/admin/AdminProdutos";
import AdminCategorias from "@/components/admin/AdminCategorias";
import AdminFAQ from "@/components/admin/AdminFAQ";
import AdminContatos from "@/components/admin/AdminContatos";
import AdminConfiguracao from "@/components/admin/AdminConfiguracao";
import { trpc } from "@/lib/trpc";
import { Package, Tag, HelpCircle, MessageSquare, Settings, Users } from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const { data: products } = trpc.products.list.useQuery({});
  const { data: contacts } = trpc.contacts.list.useQuery();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      navigate("/");
    }
  }, [isAuthenticated, user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container py-12">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const unreadContacts = contacts?.filter(c => !c.isRead).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie sua loja de produtos médicos e hospitalares</p>
        </div>
      </section>

      {/* Stats */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Produtos</p>
                <p className="text-3xl font-bold">{products?.length || 0}</p>
              </div>
              <Package className="w-10 h-10 text-primary opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Contatos Não Lidos</p>
                <p className="text-3xl font-bold text-red-600">{unreadContacts}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-red-600 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total de Contatos</p>
                <p className="text-3xl font-bold">{contacts?.length || 0}</p>
              </div>
              <Users className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-lg font-bold text-green-600">Online</p>
              </div>
              <Settings className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="produtos" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200 p-1">
            <TabsTrigger value="produtos" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Produtos</span>
            </TabsTrigger>
            <TabsTrigger value="categorias" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="hidden sm:inline">Categorias</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="contatos" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Contatos</span>
              {unreadContacts > 0 && (
                <span className="ml-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {unreadContacts}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="configuracao" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="produtos" className="mt-6">
            <AdminProdutos />
          </TabsContent>

          <TabsContent value="categorias" className="mt-6">
            <AdminCategorias />
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <AdminFAQ />
          </TabsContent>

          <TabsContent value="contatos" className="mt-6">
            <AdminContatos />
          </TabsContent>

          <TabsContent value="configuracao" className="mt-6">
            <AdminConfiguracao />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
