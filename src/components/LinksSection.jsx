import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ShoppingBag, FileText, MessageCircle } from 'lucide-react';

const LinksSection = () => {

  const handleLinkClick = (platform) => {
    let url = '';
    switch (platform) {
      case 'Instagram':
        url = 'https://instagram.com/asprofort';
        break;
      case 'Shopee':
        url = 'https://shopee.com/asprofort';
        break;
      case 'Catálogo PDF':
        url = 'catalogo.pdf';
        break;
      case 'WhatsApp':
        url = 'https://wa.me/5555996835911';
        break;
      default:
        return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const links = [
    {
      name: 'Instagram',
      icon: Instagram,
      description: 'Siga nosso perfil',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Shopee',
      icon: ShoppingBag,
      description: 'Nossa loja online',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Catálogo PDF',
      icon: FileText,
      description: 'Download direto',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      description: 'Fale conosco',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            Central de <span className="text-red-500">Acesso</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Todos os nossos canais em um só lugar
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {links.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLinkClick(link.name)}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-red-500/20 cursor-pointer card-hover group"
              >
                <div className={`bg-gradient-to-r ${link.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <link.icon size={32} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{link.name}</h3>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LinksSection;