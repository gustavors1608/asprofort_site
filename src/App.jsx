import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Catalog from '@/components/Catalog';
import B2BSection from '@/components/B2BSection';
import SocialProof from '@/components/SocialProof';
import LinksSection from '@/components/LinksSection';
import LocalMaps from '@/components/LocalMaps';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from "@vercel/analytics/react"



function App() {
  return (
    <>
      <Helmet>
        {/* Título SEO */}
        <title>Asprofort - Cornetas e Acessórios de Alta Performance</title>

        {/* SEO Básico */}
        <meta name="description" content="Cornetas de admissão e acessórios para carburadores e TBI desenvolvidos para máxima performance. Encaixe milimétrico, sistema Asprolock exclusivo. Para motos, kartcross e projetos de corrida. Santo Ângelo/RS." />
        <meta name="keywords" content="corneta de admissão, velocity stack, corneta carburador, corneta TBI, acessórios performance moto, flange carburador, suporte wideband, arrancada moto, preparação motor, Asprofort, Santo Ângelo RS" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Asprofort" />

        {/* Canonical */}
        <link rel="canonical" href="https://asprofort.com" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:url" content="https://asprofort.com" />
        <meta property="og:site_name" content="Asprofort" />
        <meta property="og:title" content="Asprofort - Cornetas e Acessórios de Alta Performance" />
        <meta property="og:description" content="Cornetas de admissão e acessórios para carburadores e TBI. Encaixe milimétrico, sistema Asprolock exclusivo. Desempenho comprovado em pista e na rua." />
        <meta property="og:image" content="https://asprofort.com/asprofort_branco_bg.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Asprofort - Cornetas e Acessórios de Alta Performance" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Asprofort - Cornetas e Acessórios de Alta Performance" />
        <meta name="twitter:description" content="Cornetas de admissão e acessórios para carburadores e TBI. Encaixe milimétrico, sistema Asprolock exclusivo." />
        <meta name="twitter:image" content="https://asprofort.com/asprofort_branco_bg.png" />

        {/* Localização */}
        <meta name="geo.region" content="BR-RS" />
        <meta name="geo.placename" content="Santo Ângelo, Rio Grande do Sul, Brasil" />

        {/* JSON-LD: Organization */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Asprofort",
            "url": "https://asprofort.com",
            "logo": "https://asprofort.com/asprofort_branco_bg.png",
            "description": "Fabricante brasileiro de cornetas de admissão (velocity stacks) e acessórios para carburadores e TBI. Sistema exclusivo Asprolock. Foco em motos, kartcross e projetos de corrida.",
            "email": "contato@asprofort.com",
            "telephone": "+55-55-99971-3752",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua General Ernesto Dornelles, 752",
              "addressLocality": "Santo Ângelo",
              "addressRegion": "RS",
              "postalCode": "98805-410",
              "addressCountry": "BR"
            },
            "sameAs": [
              "https://instagram.com/asprofort",
              "https://loja.asprofort.com"
            ],
            "foundingLocation": {
              "@type": "Place",
              "name": "Santo Ângelo, RS, Brasil"
            }
          }
        `}</script>

        {/* JSON-LD: LocalBusiness */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Asprofort",
            "image": "https://asprofort.com/asprofort_branco_bg.png",
            "url": "https://asprofort.com",
            "telephone": "+55-55-99971-3752",
            "email": "contato@asprofort.com",
            "priceRange": "R$ 45 – R$ 220",
            "description": "Fabricante de cornetas de admissão e acessórios de performance para carburadores e TBI. Atendimento B2B e varejo, com envio para todo o Brasil.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua General Ernesto Dornelles, 752",
              "addressLocality": "Santo Ângelo",
              "addressRegion": "RS",
              "postalCode": "98805-410",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-28.3003",
              "longitude": "-54.2669"
            },
            "hasMap": "https://maps.google.com/?q=Rua+General+Ernesto+Dornelles+752+Santo+Angelo+RS",
            "areaServed": "BR",
            "openingHours": "Mo-Fr 09:00-18:00",
            "sameAs": [
              "https://instagram.com/asprofort",
              "https://loja.asprofort.com"
            ]
          }
        `}</script>

        {/* JSON-LD: ItemList de Produtos */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Produtos Asprofort",
            "description": "Linha completa de cornetas de admissão e acessórios de performance",
            "numberOfItems": 3,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Product",
                  "name": "Cornetas Linha AFair",
                  "description": "Cornetas de admissão com encaixe milimétrico para carburadores de rua e arrancada. Sistema exclusivo Asprolock com fixação mecânica em parafusos inox. Sem degrau interno, transição suave para fluxo perfeito. Disponíveis nos comprimentos curto, médio e longo. Cores: vermelho, azul, roxo e preto.",
                  "image": "https://asprofort.com/corneta.webp",
                  "brand": { "@type": "Brand", "name": "Asprofort" },
                  "category": "Acessórios de Performance Automotiva",
                  "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "BRL",
                    "lowPrice": "45",
                    "highPrice": "220",
                    "availability": "https://schema.org/InStock",
                    "url": "https://loja.asprofort.com"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Product",
                  "name": "Suportes para Wideband",
                  "description": "Suportes billet para instrumentos de performance (FT Nano, Hallmeter, Injepro WB Mini) em guidões de motos e kartcross. Compatível com guidões tipo Alto, PCX, Twister e Reto. Proteção contra vibração e intempéries.",
                  "image": "https://asprofort.com/suporte.webp",
                  "brand": { "@type": "Brand", "name": "Asprofort" },
                  "category": "Acessórios de Performance Automotiva",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock",
                    "url": "https://loja.asprofort.com"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Product",
                  "name": "Flanges para Cuba de Carburador",
                  "description": "Espaçador de 10mm que aumenta o volume de combustível na cuba do carburador, evitando engasgos em alta rotação. Compatível com gasolina, etanol e metanol. Disponível para Falcon, Twister, Koso (todos os modelos), Strada e CrFlat. Acompanha junta, espaçador térmico, mangueira e parafusos inox.",
                  "image": "https://asprofort.com/flange.webp",
                  "brand": { "@type": "Brand", "name": "Asprofort" },
                  "category": "Acessórios de Performance Automotiva",
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock",
                    "url": "https://loja.asprofort.com"
                  }
                }
              }
            ]
          }
        `}</script>

        {/* JSON-LD: FAQPage */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Corneta curta, média ou longa — qual escolher?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A curta favorece potência em rotações altas, ideal pra pico de RPM. A longa favorece torque em baixa e média rotação, útil pra saída de linha em arrancada. A média equilibra os dois. A escolha depende do uso (arrancada, pista, rua) e da preparação do motor."
                }
              },
              {
                "@type": "Question",
                "name": "A corneta da Asprofort não solta com vibração?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. Toda corneta Asprofort vem com o sistema exclusivo Asprolock — abraçadeira mecânica com parafusos inox que trava a peça no corpo do carburador ou TBI. É fixação mecânica, não depende de pressão. Isso resolve o problema clássico de cornetas que soltam na pista."
                }
              },
              {
                "@type": "Question",
                "name": "A corneta media serve na Honda Twister carburada?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. Na Twister carburada com carburador original, só cabe a corneta curta. A média e a longa batem no amortecedor traseiro. Com outro carburador (Koso, CrFlat), consulte-nos com as medidas."
                }
              },
              {
                "@type": "Question",
                "name": "Tem degrau interno entre a corneta e o carburador?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Não. A transição é suave, sem degrau. Degrau interno gera turbulência e rouba fluxo de ar. A Asprofort projeta cada modelo com medidas exatas para encaixe perfeito em cada TBI ou carburador."
                }
              },
              {
                "@type": "Question",
                "name": "Pra que serve a flange de cuba do carburador?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "É um espaçador de 10mm que aumenta o volume de combustível na cuba. Em rotações altas o motor consome mais rápido do que a bóia repõe, causando engasgo. A flange aumenta essa reserva. Com metanol é ainda mais necessária, pois o consumo volumétrico é quase o dobro."
                }
              },
              {
                "@type": "Question",
                "name": "Quanto custa uma corneta Asprofort?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Os preços variam de R$ 45 a R$ 220 no varejo, dependendo do produto e aplicação. Há frete grátis em compras acima de R$ 99 (exceto Norte e Nordeste). Acesse loja.asprofort.com ou entre em contato pelo WhatsApp."
                }
              },
              {
                "@type": "Question",
                "name": "Vocês vendem para revendedores e oficinas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. Temos programa de revenda para oficinas e lojas com CNPJ. Pedido mínimo de R$ 399 para adesão. Oferecemos margens atrativas, material fotográfico em alta qualidade e suporte dedicado. Contato pelo WhatsApp: (55) 99683-5911."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      
      <div className="min-h-screen bg-black">
        
        <Header />
        <main>
          <Hero />
          <About />
          <Catalog />
          <SocialProof />
          <B2BSection />
          <FAQ />
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