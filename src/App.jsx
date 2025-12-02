import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Catalog from '@/components/Catalog';
import B2BSection from '@/components/B2BSection';
import LinksSection from '@/components/LinksSection';
import LocalMaps from '@/components/LocalMaps';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Helmet>
        <title>Asprofort - Cornetas e acessórios de alta performance</title>
        <meta 
          name="description" 
          content="Cornetas e acessórios para carburadores desenvolvidos para máxima performance. Soluções sob medida para oficinas, preparadores e equipes de corrida que exigem qualidade e encaixe perfeito." 
        />
        <meta 
          property="og:title" 
          content="Asprofort - Cornetas e acessórios de alta performance" 
        />
        <meta 
          property="og:description" 
          content="Cornetas de admissão e acessórios para carburadores. Se tem Asprofort, tem desempenho comprovado em pista e na rua." 
        />
        <meta property="og:type" content="website" />
        <meta 
          name="keywords" 
          content="cornetas, admissão, carburadores,tbi, performance, motos, corrida, oficinas, preparadores, acessórios de carburador" 
        />
      </Helmet>

      
      <div className="min-h-screen bg-black">
        
        <Header />
        <main>
          <Hero />
          <About />
          <Catalog />
          <B2BSection />
          <LinksSection />
          <LocalMaps />
        </main>
        <Footer />
        <Toaster />
        <Analytics />
      </div>
    </>
  );
}

export default App;