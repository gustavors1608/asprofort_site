import React from 'react';
import { motion } from 'framer-motion';
import { Download, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from "@/components/img/hero.jpg";


const Hero = () => {
  const handleDownloadCatalog = () => {
    window.open('catalogo.pdf', '_blank', 'noopener,noreferrer');
  };
  const handleWhatsApp = () => {
    window.open('https://wa.me/5555996835911', '_blank', 'noopener,noreferrer');
  };
  return <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover opacity-40" alt="Detalhe de velocity stack em close-up" src={heroImage} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pb-24"> {/* Added padding-bottom to create space */}
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="max-w-4xl mx-auto">
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-4xl md:text-7xl font-black mb-6 mt-6 text-shadow">
            <span className="text-white">Criado para quem não aceita o comum, apenas o</span>{' '}
            <span className="text-red-500">excepcional</span>{' '}
          </motion.h1>

          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">Cornetas e acessórios de competição para Carburadores e Tbi.</motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleDownloadCatalog} className="btn-racing px-8 py-4 text-lg font-bold flex items-center gap-3 min-w-[200px]">
              <Download size={24} />
              Baixar Catálogo
            </Button>

            <Button onClick={handleWhatsApp} variant="outline" className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-bold flex items-center gap-3 min-w-[200px] transition-all duration-300">
              <MessageCircle size={24} />
              Falar no WhatsApp
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 1
    }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center">
          <motion.div animate={{
          y: [0, 12, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="w-1 h-3 bg-red-500 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>;
};
export default Hero;