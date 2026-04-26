import React from 'react';
import { motion } from 'framer-motion';
import { Target, Thermometer, MapPin, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <section id="sobre" className="py-20 racing-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
            Quem <span className="text-red-500">somos</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
            A Asprofort é uma fabricante brasileira especializada em cornetas de admissão (velocity stacks)
            e acessórios de alta performance para carburadores e TBI. Desenvolvemos cada peça com foco
            em encaixe milimétrico e fluxo de ar otimizado — para oficinas, preparadores e equipes de corrida
            que não aceitam menos que o máximo.
          </p>

          <p className="text-lg text-gray-400 mb-12 leading-relaxed">
            Fabricação própria em{' '}
            <strong className="text-gray-300">Santo Ângelo, Rio Grande do Sul</strong>.
            Cada produto é projetado, testado e validado internamente antes de chegar ao mercado.
            Envio para todo o Brasil, com suporte técnico direto por WhatsApp.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 card-hover"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 p-4 rounded-full">
                  <Target size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Encaixe Milimétrico</h3>
              <p className="text-gray-300 text-lg">
                Sem degrau interno, com curvas planejadas para eliminar turbulência e garantir
                fluxo perfeito. O sistema exclusivo <strong className="text-white">Asprolock</strong> trava
                a corneta mecanicamente com parafusos inox — não solta na pista.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 card-hover"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 p-4 rounded-full">
                  <Thermometer size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Material de Corrida</h3>
              <p className="text-gray-300 text-lg">
                Nylon com fibra de carbono resistente a combustível (gasolina, etanol e metanol)
                e a temperaturas contínuas de até <strong className="text-white">200°C</strong>.
                Desenvolvido para suportar as condições mais extremas de uso em pista e arrancada.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 card-hover"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 p-4 rounded-full">
                  <MapPin size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Fabricação Brasileira</h3>
              <p className="text-gray-300 text-lg">
                Produção 100% própria em Santo Ângelo/RS. Controle de qualidade interno em cada
                lote. Atendemos varejo e B2B com envio rápido para todo o Brasil.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 card-hover"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 p-4 rounded-full">
                  <ShieldCheck size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Garantia e Suporte</h3>
              <p className="text-gray-300 text-lg">
                <strong className="text-white">3 meses</strong> de garantia contra defeitos de fabricação
                em todos os produtos. Suporte técnico direto por WhatsApp para dúvidas de instalação
                e compatibilidade — antes e depois da compra.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;