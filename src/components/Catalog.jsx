import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Catalog = () => {
  const handleDownloadCatalog = () => {
    window.open('src\components\catalogo.pdf', '_blank', 'noopener,noreferrer');
  };

  return <section id="catalogo" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
              Catálogo <span className="text-red-500">Técnico 2025</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Catalog Preview */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} viewport={{
            once: true
          }} className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl border border-red-500/20">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-red-500 p-6 rounded-full">
                    <FileText size={48} className="text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Catálogo Completo</h3>
                  <p className="text-gray-300 mb-6">
                    Especificações técnicas, medidas e compatibilidade de todos os nossos produtos.
                  </p>
                  <Button onClick={handleDownloadCatalog} className="btn-racing px-6 py-3 text-lg font-bold flex items-center gap-3 mx-auto">
                    <Download size={20} />
                    Baixar em PDF
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Product Previews */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.4
          }} viewport={{
            once: true
          }} className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">Produtos em Destaque</h3>
              
              <div className="grid gap-6">
                <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-red-500/20 card-hover">
                  <div className="flex items-center gap-4">
                    <img className="w-20 h-20 object-cover rounded-lg" alt="Velocity stack modelo racing" src="https://images.unsplash.com/photo-1505635374747-431af16edaf2" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Cornetas Linha AFair</h4>
                      <p className="text-gray-300">Para carburadores de Rua e Arrancada</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-red-500/20 card-hover">
                  <div className="flex items-center gap-4">
                    <img className="w-20 h-20 object-cover rounded-lg" alt="Corneta de admissão performance" src="https://images.unsplash.com/photo-1681151373287-7285be831761" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Suportes para Wideband</h4>
                      <p className="text-gray-300">Suportes para Motos, Kartcross e muito mais, do Jeito do seu projeto</p>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-red-500/20 card-hover">
                  <div className="flex items-center gap-4">
                    <img className="w-20 h-20 object-cover rounded-lg" alt="Kit de acessórios para carburador" src="https://images.unsplash.com/photo-1684696244571-b84d6d32c6df" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Flanges para Cuba </h4>
                      <p className="text-gray-300">Cuba do carburador secando quando bota a mão? Conheça nossas Flanges</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Catalog;