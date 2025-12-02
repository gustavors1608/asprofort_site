import React from 'react';
import { motion } from 'framer-motion';
import { Target, Thermometer } from 'lucide-react';
const About = () => {
  return <section id="sobre" className="py-20 racing-gradient">
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
          <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
            Quem <span className="text-red-500">somos</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">A Asprofort é especializada em Cornetas e acessórios para otimizar Motores e projetos de GearHeads, com foco em oficinas, preparadores e equipes de corrida. Produtos desenvolvidos para encaixe perfeito e máximo desempenho.</p>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
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
          }} className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 card-hover">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 p-4 rounded-full">
                  <Target size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cornetas Com Encaixe Milimétrico</h3>
              <p className="text-gray-300 text-lg">Sem degraus, e com curvas planejadas para garantir fluxo perfeito e máxima eficiência no sistema de admissão.</p>
            </motion.div>

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
          }} className="bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-red-500/20 card-hover">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-red-500 p-4 rounded-full">
                  <Thermometer size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Materiais Resistentes</h3>
              <p className="text-gray-300 text-lg">
                Resistente a combustível e temperatura, desenvolvido para suportar as condições mais extremas.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default About;