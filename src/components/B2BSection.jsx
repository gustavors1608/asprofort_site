import React from 'react';
import { m } from 'framer-motion';
import { MessageCircle, Wrench, Package, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const B2BSection = () => {
  const handleContactTeam = () => {
    window.open(
      'https://wa.me/5555996835911?text=Ol%C3%A1%2C%20vi%20no%20site%20e%20tenho%20interesse%20em%20revender%20os%20produtos%2C%20pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%3F',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="py-20 racing-gradient">
      <div className="container mx-auto px-4">
        {/* Label de contexto */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest border border-gray-700 px-4 py-1.5 rounded-full">
            Para oficinas, preparadores e distribuidores
          </span>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-black/50 backdrop-blur-sm p-12 rounded-2xl border border-red-500/20 card-hover">
            <div className="flex justify-center mb-8">
              <div className="bg-red-500 p-6 rounded-full">
                <Wrench size={48} className="text-white" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Você monta a preparação.{' '}
              <span className="text-red-500 block mt-1">
                A Asprofort garante a peça que não falha.
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Torne-se parceiro Asprofort. Margem real, suporte técnico e material
              pronto pra você vender com confiança.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="flex items-start gap-4 text-left">
                <Package size={32} className="text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Margem Real pra Sua Oficina</h3>
                  <p className="text-gray-300">
                    Condições de atacado com pedido mínimo de{' '}
                    <strong className="text-white">R$ 399</strong> e CNPJ ativo.
                    Prazo de envio de até{' '}
                    <strong className="text-white">72h úteis</strong> após confirmação.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-left">
                <Users size={32} className="text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Suporte Técnico Incluído</h3>
                  <p className="text-gray-300">
                    Material fotográfico em alta, FAQ completo e plaqueta de{' '}
                    <strong className="text-white">Revendedor Autorizado</strong>{' '}
                    a partir do 2º pedido. Você explica — o cliente compra com confiança.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleContactTeam}
              className="btn-racing px-8 py-4 text-xl font-bold flex items-center gap-3 mx-auto"
            >
              <MessageCircle size={24} />
              Falar com o Comercial
            </Button>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default B2BSection;
