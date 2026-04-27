import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const depoimentos = [
  {
    texto:
      'Já usei corneta de outros fabricante e sempre dava problema com vibração na pista. O sistema de fixação Asprolock trava de verdade. Instalei, regulei o bura e esqueci. Moto ficou top!',
    nome: 'Carlos H.',
    detalhe: 'Preparador — CG 160 · Douradina/PR',
  },
  {
    texto:
      'Comprei a corneta pra minha CB300. E encaixe ficou top. Moto já respondeu mais, logo na primeira andada!',
    nome: 'João P.',
    detalhe: 'CB300 · Parnaíba/PI',
  },
  {
    texto:
      'Indico pra todos os clientes que querem montar uma admissão decente. O encaixe é exato, sem folga, sem degrau. E quando o cliente pergunta se aguenta, eu mostro as motos de arrancada que usam também!',
    nome: 'Marcos T.',
    detalhe: 'Mecânico preparador · Porto Alegre/RS',
  },

];

const Estrelas = () => (
  <div className="flex gap-1 mb-3">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={14} className="text-red-500 fill-red-500" />
    ))}
  </div>
);

const SocialProof = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Números de validação */}
          <div className="grid grid-cols-2 gap-8 mb-16 max-w-lg mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-black text-red-500">+500</p>
              <p className="text-gray-400 mt-2 text-sm uppercase tracking-wide">cornetas instaladas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-5xl md:text-6xl font-black text-red-500">+15</p>
              <p className="text-gray-400 mt-2 text-sm uppercase tracking-wide">oficinas parceiras</p>
            </motion.div>
          </div>

          {/* Título */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Quem usa, <span className="text-red-500">confirma</span>
            </h2>
          </div>

          {/* Cards de depoimentos */}
          <div className="grid md:grid-cols-3 gap-6">
            {depoimentos.map((d, i) => (
              <motion.div
                key={d.nome}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-[#111] border border-red-500/20 rounded-xl p-6 flex flex-col card-hover"
              >
                <Estrelas />
                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1 italic">
                  "{d.texto}"
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">{d.nome}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{d.detalhe}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
