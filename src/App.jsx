import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

// Above-the-fold — carregamento imediato (impactam FCP/LCP)
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Below-the-fold — lazy (reduz JS inicial ~40%)
const About = lazy(() => import('@/components/About'));
const Catalog = lazy(() => import('@/components/Catalog'));
const SocialProof = lazy(() => import('@/components/SocialProof'));
const B2BSection = lazy(() => import('@/components/B2BSection'));
const FAQ = lazy(() => import('@/components/FAQ'));
const LinksSection = lazy(() => import('@/components/LinksSection'));
const LocalMaps = lazy(() => import('@/components/LocalMaps'));
const Footer = lazy(() => import('@/components/Footer'));

// Toaster é lazy: não bloqueia o carregamento inicial (Radix sai do critical path)
const Toaster = lazy(() =>
  import('@/components/ui/toaster').then(({ Toaster: T }) => ({ default: T }))
);
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
        <meta property="og:image" content="https://asprofort.com/asprofort_branco_bg.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Asprofort - Cornetas e Acessórios de Alta Performance" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Asprofort - Cornetas e Acessórios de Alta Performance" />
        <meta name="twitter:description" content="Cornetas de admissão e acessórios para carburadores e TBI. Encaixe milimétrico, sistema Asprolock exclusivo." />
        <meta name="twitter:image" content="https://asprofort.com/asprofort_branco_bg.webp" />

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
            "image": "https://asprofort.com/asprofort_branco_bg.webp",
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
              },
              {
                "@type": "Question",
                "name": "Qual é a garantia dos produtos Asprofort?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Todos os produtos Asprofort têm garantia de 3 meses contra defeitos de fabricação, contados a partir da data de entrega ao cliente. A garantia não cobre danos decorrentes de instalação incorreta, uso inadequado ou esforços mecânicos além dos limites técnicos do produto."
                }
              },
              {
                "@type": "Question",
                "name": "Como acionar a garantia de um produto Asprofort?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Para acionar a garantia, tire uma foto ou vídeo mostrando o defeito e envie pelo WhatsApp do SAC: (55) 99683-5911. O prazo de análise técnica é de até 48 horas úteis. Se o defeito de fabricação for confirmado, a Asprofort envia uma peça substituta diretamente ao cliente, sem necessidade de devolução do item com defeito e com o frete por conta da empresa."
                }
              },
              {
                "@type": "Question",
                "name": "Quanto de potência ganha com uma corneta Asprofort?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Em motos originais (stock), o ganho documentado é de 0,8 a 1,5 cv, dependendo do modelo e configuração. Em motos de arrancada ou com preparação mais avançada, o ganho pode chegar a até 3 cv, conforme medições em dinamômetro realizadas com a linha AFair."
                }
              },
              {
                "@type": "Question",
                "name": "A Asprofort tem política de troca ou devolução?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim. Produtos com defeito de fabricação são substituídos dentro do prazo de garantia de 3 meses, com envio da peça substituta diretamente ao cliente e frete por conta da Asprofort. Para outros casos, entre em contato pelo WhatsApp (55) 99971-3752 ou pelo e-mail contato@asprofort.com."
                }
              }
            ]
          }
        `}</script>

        {/* JSON-LD: WebSite com SearchAction */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Asprofort",
            "url": "https://asprofort.com",
            "description": "Cornetas de admissão, flanges e acessórios de alta performance para motocicletas. Fabricação brasileira, sistema Asprolock exclusivo.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://loja.asprofort.com/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }
        `}</script>

        {/* JSON-LD: BreadcrumbList */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Início",
                "item": "https://asprofort.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Catálogo",
                "item": "https://asprofort.com/#catalogo"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Perguntas Frequentes",
                "item": "https://asprofort.com/#faq"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Contato",
                "item": "https://asprofort.com/#contato"
              }
            ]
          }
        `}</script>

        {/* JSON-LD: Product principal com AggregateRating e Reviews (habilita estrelas no SERP) */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Corneta de Admissão Asprofort — Linha AFair",
            "description": "Corneta de admissão com encaixe milimétrico para carburadores e TBI. Sistema exclusivo Asprolock com fixação mecânica em parafusos inox. Sem degrau interno. Disponível nos comprimentos curto, médio e longo. Cores: vermelho, azul, roxo e preto.",
            "image": "https://asprofort.com/corneta.webp",
            "brand": {
              "@type": "Brand",
              "name": "Asprofort"
            },
            "category": "Acessórios de Performance Automotiva",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "BRL",
              "lowPrice": "45",
              "highPrice": "220",
              "availability": "https://schema.org/InStock",
              "url": "https://loja.asprofort.com"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "3",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Carlos H." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Encaixe perfeito na CG 160. Produto de alta qualidade, sem folga. Recomendo para qualquer preparador.",
                "datePublished": "2026-01-15"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "João P." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Instalei na CB300 e o resultado foi imediato. Produto sólido, acabamento excelente.",
                "datePublished": "2026-02-10"
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Marcos T." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Uso em todas as preparações da minha oficina em Porto Alegre. Qualidade consistente, não volta mais.",
                "datePublished": "2026-03-05"
              }
            ]
          }
        `}</script>
      </Helmet>


      <div className="min-h-screen bg-black">
        <Header />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Catalog />
            <SocialProof />
            <B2BSection />
            <FAQ />
            <LinksSection />
            <LocalMaps />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}><Toaster /></Suspense>
        <Analytics />
      </div>
    </>
  );
}

export default App;