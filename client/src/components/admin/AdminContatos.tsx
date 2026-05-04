import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export default function AdminContatos() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: contacts, refetch } = trpc.contacts.list.useQuery();
  const markAsRead = trpc.contacts.markAsRead.useMutation();
  const deleteContact = trpc.contacts.delete.useMutation();

  const selectedContact = contacts?.find(c => c.id === selectedId);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead.mutateAsync({ id });
      toast.success("Marcado como lido");
      refetch();
    } catch (error) {
      toast.error("Erro ao marcar como lido");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este contato?")) {
      try {
        await deleteContact.mutateAsync({ id });
        toast.success("Contato deletado com sucesso");
        setSelectedId(null);
        refetch();
      } catch (error) {
        toast.error("Erro ao deletar contato");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gerenciar Contatos</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-1">
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <Card
                  key={contact.id}
                  className={`p-4 cursor-pointer transition ${
                    selectedId === contact.id
                      ? "bg-primary text-white"
                      : "hover:bg-gray-50"
                  } ${!contact.isRead ? "border-l-4 border-l-yellow-500" : ""}`}
                  onClick={() => setSelectedId(contact.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-sm opacity-75">{contact.email}</p>
                      <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${
                        contact.type === "vendor_request"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {contact.type === "vendor_request" ? "Vendedor" : "Contato"}
                      </span>
                    </div>
                    {!contact.isRead && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">Nenhum contato recebido</p>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">{selectedContact.name}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Tipo de Contato</p>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    selectedContact.type === "vendor_request"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {selectedContact.type === "vendor_request" ? "Pedido de Vendedor" : "Dúvida Geral"}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Data</p>
                  <p className="text-sm">
                    {new Date(selectedContact.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Mensagem</p>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {!selectedContact.isRead && (
                    <Button
                      onClick={() => handleMarkAsRead(selectedContact.id)}
                      className="flex items-center gap-2 flex-1"
                    >
                      <Eye className="w-4 h-4" />
                      Marcar como Lido
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedContact.id)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-600">Selecione um contato para ver os detalhes</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
