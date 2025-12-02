import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Wrench, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
const B2BSection = () => {

  const handleContactTeam = () => {
      window.open('https://wa.me/5555996835911', '_blank', 'noopener,noreferrer');
  };
  return <section className="py-20 racing-gradient">
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
      }} className="max-w-4xl mx-auto text-center">
          <div className="bg-black/50 backdrop-blur-sm p-12 rounded-2xl border border-red-500/20 card-hover">
            <div className="flex justify-center mb-8">
              <div className="bg-red-500 p-6 rounded-full">
                <Wrench size={48} className="text-white" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              É mecânico ou tem <span className="text-red-500">oficina?</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Torne-se parceiro Asprofort.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="flex items-center gap-4 text-left">
                <Users size={32} className="text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white">Mais Margem Para Sua Oficina</h3>
                  <p className="text-gray-300">Revenda Cornetas e acessórios Asprofort com condições diferenciadas. Preço especial para pedidos acima de 10 unidades.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-left">
                <Wrench size={32} className="text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white">Pensado Para Quem Faz Acontecer</h3>
                  <p className="text-gray-300">Linha completa com encaixe preciso e Qualidade. Além do preço exclusivo, você tem suporte direto e catálogo atualizado para facilitar suas vendas.</p>
                </div>
              </div>
            </div>

            <Button onClick={handleContactTeam} className="btn-racing px-8 py-4 text-xl font-bold flex items-center gap-3 mx-auto">
              <MessageCircle size={24} />
              Fale Conosco
            </Button>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default B2BSection;