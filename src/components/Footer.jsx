import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, CreditCard } from 'lucide-react';

const Footer = () => {
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
              src="https://horizons-cdn.hostinger.com/229498c8-5943-41cd-9068-552bb35f809c/f6c94607f83e7688261da5e78d4a68b7.png"
              alt="Asprofort Logo"
              className="h-16 w-auto mx-auto mb-6"
            />
            <p className="text-xl text-gray-300">
              Performance sob medida para cada motor
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-white">E-mail</span>
              <p className="text-gray-300 mt-2">contato@asprofort.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Localização</span>
              <p className="text-gray-300 mt-2">Santo Ângelo, RS</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-red-500 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CreditCard size={24} className="text-white" />
              </div>
              <span className="text-lg font-semibold text-white">Contato</span>
              <p className="text-gray-300 mt-2">55 99683-5911</p>
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