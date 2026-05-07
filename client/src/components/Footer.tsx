import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Footer() {
  const { data: storeConfig } = trpc.storeConfig.get.useQuery();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Sobre */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Sobre Nós
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Somos líderes em soluções de equipamentos médicos e hospitalares com certificação ANVISA e qualidade garantida.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Links Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="transition-colors hover:text-green-600" style={{ color: 'var(--text-muted)' }}>Início</a></li>
              <li><a href="/catalogo" className="transition-colors hover:text-green-600" style={{ color: 'var(--text-muted)' }}>Catálogo</a></li>
              <li><a href="/faq" className="transition-colors hover:text-green-600" style={{ color: 'var(--text-muted)' }}>FAQ</a></li>
              <li><a href="/contato" className="transition-colors hover:text-green-600" style={{ color: 'var(--text-muted)' }}>Contato</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Contato
            </h3>
            <ul className="space-y-3 text-sm">
              {storeConfig?.contactEmail && (
                <li className="flex items-center gap-2">
                  <Mail size={16} style={{ color: 'var(--green-medical)' }} />
                  <a href={`mailto:${storeConfig.contactEmail}`} style={{ color: 'var(--text-muted)' }} className="hover:text-green-600">
                    {storeConfig.contactEmail}
                  </a>
                </li>
              )}
              {storeConfig?.whatsappNumber && (
                <li className="flex items-center gap-2">
                  <Phone size={16} style={{ color: 'var(--green-medical)' }} />
                  <a href={`https://wa.me/${storeConfig.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }} className="hover:text-green-600">
                    {storeConfig.whatsappNumber}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-deep)' }}>
              Siga-nos
            </h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'var(--green-light)', color: 'var(--green-medical)' }}>
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'var(--green-light)', color: 'var(--green-medical)' }}>
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-full transition-colors" style={{ backgroundColor: 'var(--green-light)', color: 'var(--green-medical)' }}>
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm" style={{ color: 'var(--text-muted)' }}>
            <p>&copy; {currentYear} {storeConfig?.storeName || "MedicalStore"}. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-green-600 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-green-600 transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
