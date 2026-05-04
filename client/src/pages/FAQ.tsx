import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { data: faqs } = trpc.faqs.list.useQuery();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-yellow-500 text-white py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-lg opacity-90">Encontre respostas para as dúvidas mais comuns</p>
        </div>
      </section>

      <div className="container py-12">
        {faqs && faqs.length > 0 ? (
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <Card
                key={faq.id}
                className="overflow-hidden hover:shadow-md transition cursor-pointer"
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-foreground">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-primary transition-transform ${
                      expandedId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedId === faq.id && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhuma pergunta frequente disponível no momento</p>
          </div>
        )}
      </div>
    </div>
  );
}
