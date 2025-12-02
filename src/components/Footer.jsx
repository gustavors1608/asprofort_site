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
      "https://wa.me/5555996835911",
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
              src={'/asprofort_branco_bg.png'}
              alt="Asprofort Logo"
              className="h-16 w-auto mx-auto mb-6"
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
                  55 99683-5911
                </p>
              </button>
            </motion.div>

          </div>

          {/* Divider */}
          <div className="section-divider"></div>

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
