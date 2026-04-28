import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    category: 'Cornetas de Admissão',
    items: [
      {
        question: 'Corneta curta, média ou longa — qual escolher?',
        answer: 'Cada comprimento muda o comportamento do motor. A curta favorece potência em rotações altas, ideal pra quem busca pico de RPM. A longa favorece torque em baixa e média rotação, útil pra saída de linha em arrancada. A média equilibra os dois. A escolha depende do tipo de uso (arrancada, pista, rua) e de como o motor está preparado.',
      },
      {
        question: 'A corneta média serve na Honda Twister carburada?',
        answer: 'Não. Na Twister carburada usando o carburador original, só cabe a corneta curta. A média e a longa batem no amortecedor traseiro por falta de espaço. Se a Twister estiver com outro carburador (Koso, CrFlat), entre em contato — passamos as medidas para você verificar.',
      },
      {
        question: 'A corneta não solta com vibração na pista?',
        answer: 'Não. Toda corneta Asprofort vem com o sistema exclusivo Asprolock — abraçadeira mecânica com parafusos inox que trava a peça no corpo do carburador ou TBI. A fixação é mecânica, não depende só de pressão ou encaixe por atrito. Isso resolve o problema clássico de cornetas que soltam na arrancada ou em uso prolongado.',
      },
      {
        question: 'Tem degrau interno entre a corneta e o carburador?',
        answer: 'Não. A transição entre a corneta e o carburador ou TBI é suave, sem degrau. Degrau interno gera turbulência e rouba fluxo de ar. A Asprofort projeta cada modelo com medidas exatas para cada TBI ou carburador, garantindo encaixe perfeito e fluxo otimizado.',
      },
      {
        question: 'A corneta vai atrapalhar a passagem de ar ou esquentar o motor?',
        answer: 'Não. A corneta faz o oposto: melhora o fluxo de ar na admissão. A geometria é projetada para direcionar mais ar para o carburador ou TBI de forma organizada. O motor respira melhor. Já registramos ganhos de 1,2cv em motos originais e até 3cv em motos preparadas.',
      },
      {
        question: 'Quais cores de corneta estão disponíveis?',
        answer: 'Vermelho, Azul, Roxo e Preto.',
      },
    ],
  },
  {
    category: 'Flanges para Cuba de Carburador',
    items: [
      {
        question: 'Pra que serve a flange de cuba?',
        answer: 'É um espaçador de 10mm que aumenta o volume de combustível disponível dentro da cuba do carburador. Em rotações altas, o motor pode consumir combustível mais rápido do que a bóia consegue repor — o resultado é o motor dar falta (engasgar). A flange aumenta essa reserva imediata e resolve o problema.',
      },
      {
        question: 'Funciona com metanol?',
        answer: 'Sim. As flanges são compatíveis com gasolina, etanol e metanol. Com metanol a flange é ainda mais necessária, porque o volume consumido de combustível é quase o dobro.',
      },
      {
        question: 'Pra quais carburadores tem flange?',
        answer: 'Falcon, Twister, Koso (todos os modelos), Strada e CrFlat.',
      },
      {
        question: 'Minha moto engasga em aceleração forte. É a cuba?',
        answer: 'Pode ser. Se a ignição e o acerto do carburador estão em dia, e o motor dá falta só em alta rotação prolongada, a cuba esvaziando é uma das causas principais. A flange Asprofort resolve isso.',
      },
    ],
  },
  {
    category: 'Compra, Frete e Garantia',
    items: [
      {
        question: 'Qual o preço das peças?',
        answer: 'Os preços variam de R$ 45 a R$ 220 no varejo, dependendo do produto e aplicação. Frete grátis em compras acima de R$ 99 (exceto Norte e Nordeste). Acesse loja.asprofort.com ou entre em contato pelo WhatsApp.',
      },
      {
        question: 'Vocês enviam para todo o Brasil?',
        answer: 'Sim. Enviamos para todo o território nacional pelos Correios ou transportadora, com despacho em até 24 horas úteis após confirmação do pagamento.',
      },
      {
        question: 'As peças têm garantia?',
        answer: 'Sim. Todos os produtos possuem garantia Asprofort de 3 meses contra defeitos de fabricação. Em caso de problema, entre em contato pelo SAC: (55) 99683-5911 — resolvemos online com envio de imagens.',
      },
    ],
  },
  {
    category: 'Revenda e Atacado',
    items: [
      {
        question: 'Como me tornar revendedor Asprofort?',
        answer: 'Entre em contato pelo WhatsApp do setor comercial: (55) 99683-5911. O programa é voltado para oficinas e lojas com CNPJ. O pedido mínimo inicial para aderir à rede parceira é de R$ 399. Oferecemos margens atrativas, material fotográfico em alta qualidade e plaqueta oficial de revendedor autorizado.',
      },
      {
        question: 'Preciso ter CNPJ para comprar no atacado?',
        answer: 'Sim. Nosso programa de revenda é focado em empresas, lojas de peças e oficinas mecânicas do segmento.',
      },
    ],
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-red-500/20 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-black/40 hover:bg-black/60 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-red-500/50"
        aria-expanded={isOpen}
      >
        <span className="text-white font-semibold pr-4">{question}</span>
        <m.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className="text-red-500" />
        </m.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="p-5 pt-0 bg-black/20 border-t border-red-500/10">
              <p className="text-gray-300 leading-relaxed pt-4">{answer}</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Perguntas <span className="text-red-500">Frequentes</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Dúvidas sobre compatibilidade, instalação e compra — respondidas por quem fabrica.
            </p>
          </div>

          <div className="space-y-10">
            {faqData.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4">
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Não achou o que procurava?</p>
            <a
              href="https://wa.me/5555999713752?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20um%20produto%20Asprofort"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Pergunte no WhatsApp
            </a>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default FAQ;
