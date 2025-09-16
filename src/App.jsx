import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Catalog from '@/components/Catalog';
import B2BSection from '@/components/B2BSection';
import LinksSection from '@/components/LinksSection';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Asprofort - Performance sob medida para cada motor</title>
        <meta name="description" content="Velocity stacks e acessórios para carburadores. Especializada em produtos para oficinas, preparadores e equipes de corrida com encaixe perfeito e máximo desempenho." />
        <meta property="og:title" content="Asprofort - Performance sob medida para cada motor" />
        <meta property="og:description" content="Velocity stacks e acessórios para carburadores. Se tem corneta, tem performance." />
        <meta property="og:type" content="website" />
        <meta name="keywords" content="velocity stacks, carburadores, performance, racing, oficinas, preparadores, cornetas" />
      </Helmet>
      
      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <Hero />
          <About />
          <Catalog />
          <B2BSection />
          <LinksSection />
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;