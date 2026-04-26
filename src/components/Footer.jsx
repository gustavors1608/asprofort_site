import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, CreditCard } from 'lucide-react';

const Footer = () => {
  const handleEmail = () => {
    window.location.href = "mailto:contato@asprofort.com";
  };

  const handleLocation = () => {
    window.open(
      "https://www.google.com/maps/place/ASPROFORT+LTDA/@-28.297253,-54.2535078,17z",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handlePhone = () => {
    window.open(
      "https://wa.me/5555999713752?text=Ol%C3%A1%2C%20vi%20no%20site%20e%20tenho%20interesse%20em%20um%20produto%2C%20pode%20me%20ajudar%3F",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <footer id="contato" className="bg-black border-t border-red-500/20 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >

          {/* Logo and Main Info */}
          <div className="text-center mb-12">
            <img
              src={'/asprofort_branco_bg.webp'}
              alt="Asprofort — Cornetas e Acessórios de Alta Performance"
              className="h-16 w-auto mx-auto mb-6"
              loading="lazy"
              width="200"
              height="64"
            />
            <p className="text-xl text-gray-300">
              Criado para quem não aceita o comum, apenas o excepcional.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">

            {/* EMAIL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center cursor-pointer"
            >
              <button
                onClick={handleEmail}
                className="group focus:outline-none"
              >
                <div className="bg-red-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition">
                  <Mail size={24} className="text-white" />
                </div>
                <span className="text-lg font-semibold text-white">E-mail</span>
                <p className="text-gray-300 mt-2 group-hover:text-white transition">
                  contato@asprofort.com
                </p>
              </button>
            </motion.div>

            {/* LOCALIZAÇÃO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center cursor-pointer"
            >
              <button
                onClick={handleLocation}
                className="group focus:outline-none"
              >
                <div className="bg-red-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition">
                  <MapPin size={24} className="text-white" />
                </div>
                <span className="text-lg font-semibold text-white">Localização</span>
                <p className="text-gray-300 mt-2 group-hover:text-white transition">
                  Santo Ângelo, RS
                </p>
              </button>
            </motion.div>

            {/* CONTATO / TELEFONE */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center cursor-pointer"
            >
              <button
                onClick={handlePhone}
                className="group focus:outline-none"
              >
                <div className="bg-red-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition">
                  <CreditCard size={24} className="text-white" />
                </div>
                <span className="text-lg font-semibold text-white">Contato</span>
                <p className="text-gray-300 mt-2 group-hover:text-white transition">
                  55 99971-3752
                </p>
              </button>
            </motion.div>

          </div>

          {/* Divider */}
          <div className="section-divider"></div>

          {/* Dados Legais */}
          <div className="text-center mt-6 mb-4 space-y-1">
            <p className="text-xs text-gray-500">
              ASPROFORT LTDA — CNPJ: 63.389.432/0001-56
            </p>
            <p className="text-xs text-gray-500">
              Rua General Ernesto Dornelles, 752 / Apt 2 — Bairro Pippi — Santo Ângelo/RS — CEP: 98.805-410
            </p>
            <p className="text-xs text-gray-500">
              SAC: (55) 99683-5911 · E-mail fiscal: asprofort04@gmail.com
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Asprofort. Todos os direitos reservados.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
