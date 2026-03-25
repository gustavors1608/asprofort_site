import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocalMaps = () => {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4968.18224882596!2d-54.253507846492326!3d-28.29725303050858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94fe9b4eea4f0393%3A0x545e5334da42d4a3!2sASPROFORT%20LTDA!5e0!3m2!1sen!2sbr!4v1764705328366!5m2!1sen!2sbr";

  const handleOpenMaps = () => {
    // URL "normal" do Maps (não embed) para abrir rota
    window.open(
      "https://maps.app.goo.gl/kWbZ9VGcVQMGdBoS6",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-black/70 backdrop-blur-sm p-10 md:p-12 rounded-2xl border border-red-500/20 card-hover">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-500 p-3 rounded-full">
                    <MapPin size={28} className="text-white" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] text-red-400">
                    Localização
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                  Onde fica a <span className="text-red-500">Asprofort</span>
                </h2>

                <p className="text-lg text-gray-300 mb-4">
                  Produzimos soluções de performance direto do interior
                  do RS, com estrutura preparada para atender oficinas, mecânicos e
                  equipes de corrida em todo o Brasil.
                </p>

                <Button
                  onClick={handleOpenMaps}
                  className="btn-racing px-6 py-3 text-base font-bold flex items-center gap-2"
                >
                  <Navigation size={20} />
                  Abrir no Google Maps
                </Button>
              </div>

              <div className="w-full md:w-[420px]">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-red-500/30 shadow-lg shadow-red-500/20">
                  <iframe
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    aria-label="Mapa da localização da Asprofort"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center md:text-right">
              * Agende sua visita com antecedência. Atendimentos presenciais são
              focados para retiradas de pedidos de oficinas, preparadores e parceiros.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalMaps;
