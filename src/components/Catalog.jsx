import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoreUrl } from '@/lib/storeUrl';

const produtos = [
  {
    img: 'corneta.webp',
    alt: 'Corneta de admissão Asprofort Linha AFair — velocity stack para carburador',
    titulo: 'Cornetas Linha AFair',
    badge: 'Mais vendido',
    descricao:
      'Velocity stacks para carburadores e TBI de rua e arrancada. Sistema exclusivo Asprolock, encaixe milimétrico sem degrau. Disponíveis em curto, médio e longo. Ganho documentado de até 3cv em motores preparados.',
  },
  {
    img: 'suporte.webp',
    alt: 'Suporte billet para wideband e instrumentos de performance em guidão de moto',
    titulo: 'Suportes para Wideband',
    badge: null,
    descricao:
      'Suportes para FT Nano, FT Nano Pro, Hallmeter e Injepro WB Mini. Compatível com guidões tipo Alto, PCX, Twister e Reto. Para motos, kartcross e qualquer projeto de performance.',
  },
  {
    img: 'flange.webp',
    alt: 'Flange para cuba de carburador — evita engasgo em alta rotação',
    titulo: 'Flanges para Cuba',
    badge: null,
    descricao:
      'Espaçador de 10mm que aumenta a reserva de combustível na cuba e elimina engasgos em alta rotação. Modelos para Falcon, Twister, Koso, Strada, PWK e CrFlat. Funciona com gasolina, etanol e metanol.',
  },
];

const Catalog = () => {
  const handleDownloadCatalog = () => {
    window.open('/catalogo.pdf', '_blank', 'noopener,noreferrer');
  };

  const handleLoja = () => {
    window.open(getStoreUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="catalogo" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Catálogo <span className="text-red-500">Técnico 2025</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Linha completa de cornetas e acessórios. Encaixe milimétrico por modelo e ano.
            </p>
          </div>

          {/* Grid de produtos */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {produtos.map((p, i) => (
              <motion.div
                key={p.titulo}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-[#111] rounded-xl border border-red-500/20 overflow-hidden card-hover flex flex-col"
              >
                {/* Imagem */}
                <div className="relative bg-[#0d0d0d] flex items-center justify-center h-52">
                  <img
                    className="h-44 w-full object-contain p-4"
                    alt={p.alt}
                    src={p.img}
                    loading="lazy"
                  />
                  {p.badge && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{p.titulo}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {p.descricao}
                  </p>
                  <Button
                    onClick={handleLoja}
                    className="btn-racing w-full flex items-center justify-center gap-2 font-bold"
                  >
                    <ExternalLink size={16} />
                    Ver na Loja
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA secundário — PDF */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center pt-8 border-t border-red-500/10"
          >
            <p className="text-gray-500 text-sm mb-3">
              Especificações técnicas e tabela de compatibilidade completa:
            </p>
            <Button
              onClick={handleDownloadCatalog}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-gray-400 hover:border-red-500 hover:text-white transition-all"
            >
              <Download size={15} className="mr-2" />
              Baixar Catálogo PDF
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Catalog;
