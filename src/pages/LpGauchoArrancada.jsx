import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import {
  Gift, Zap, Unlock, Wrench, Flame, BarChart3, Flag,
  Check, X, Copy, CheckCheck, Phone, Instagram, Globe,
  ChevronDown, MessageCircle,
} from 'lucide-react';
import {
  VIP_OPEN, PUBLIC_OPEN, CUPOM_EXHAUSTED, WHATSAPP_GROUP_URL,
  LOJA_URL, CUPOM_CODE, getLaunchState, calcTimeLeft, pad,
} from '@/lib/launchState';

// ─── Toast ─────────────────────────────────────────────────────────────────
function Toast({ visible }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-lg border border-[#25D366] bg-[#141414] text-white text-sm font-medium shadow-xl transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <CheckCheck size={16} className="text-[#25D366] shrink-0" />
      Cupom copiado. Cola no checkout dia 09/05.
    </div>
  );
}

// ─── Countdown Box ──────────────────────────────────────────────────────────
function CountdownBox({ label, time, variant }) {
  const isPrimary = variant === 'primary';
  if (!time) return null;
  return (
    <div className={`rounded-lg p-6 mb-4 ${isPrimary ? 'border-2 border-[#E63946] bg-[#141414]' : 'border border-[#2A2A2A] bg-[#141414] opacity-60'}`}>
      <p className={`text-xs font-bold uppercase tracking-widest mb-3 font-[Barlow_Condensed] ${isPrimary ? 'text-[#E63946]' : 'text-[#6B6B6B]'}`}>
        {label}
      </p>
      <div className={`flex items-end gap-1 font-mono font-bold ${isPrimary ? 'text-4xl md:text-5xl text-white' : 'text-2xl md:text-3xl text-[#6B6B6B]'}`}>
        <span>{pad(time.days)}</span>
        <span className="text-[#E63946] mb-1">:</span>
        <span>{pad(time.hours)}</span>
        <span className="text-[#E63946] mb-1">:</span>
        <span>{pad(time.minutes)}</span>
        <span className="text-[#E63946] mb-1">:</span>
        <span>{pad(time.seconds)}</span>
      </div>
      <div className={`flex gap-4 mt-1 text-[10px] uppercase tracking-widest font-medium ${isPrimary ? 'text-[#6B6B6B]' : 'text-[#3a3a3a]'}`}>
        <span className="w-10">DIAS</span>
        <span className="w-10">HORAS</span>
        <span className="w-8">MIN</span>
        <span className="w-8">SEG</span>
      </div>
    </div>
  );
}

// ─── Inline coupon (compact, for Section 7) ─────────────────────────────────
function CupomInline({ onCopy }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    try { await navigator.clipboard.writeText(CUPOM_CODE); }
    catch { /* fallback handled in main copy fn */ }
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  }, [onCopy]);

  return (
    <div className="flex items-center gap-3 bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 mb-6 max-w-sm mx-auto">
      <span className="font-mono text-base font-bold text-white tracking-wider flex-1">{CUPOM_CODE}</span>
      <button
        onClick={handleCopy}
        className={`text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded transition-colors duration-200 ${copied ? 'bg-[#25D366] text-white' : 'bg-[#E63946] text-white hover:bg-[#B82B38]'}`}
      >
        {copied ? 'COPIADO ✓' : 'COPIAR'}
      </button>
    </div>
  );
}

// ─── WhatsApp Button ─────────────────────────────────────────────────────────
function WhatsAppButton({ label = 'ENTRAR NO GRUPO VIP', location = 'unknown', size = 'large' }) {
  const handleClick = useCallback(() => {
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line no-undef
      gtag('event', 'whatsapp_cta_click', { location });
    }
    if (typeof fbq !== 'undefined') {
      // eslint-disable-next-line no-undef
      fbq('trackCustom', 'WhatsAppCTA', { location });
    }
    window.open(WHATSAPP_GROUP_URL, '_blank', 'noopener,noreferrer');
  }, [location]);

  const base = 'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide rounded-md bg-[#25D366] text-white hover:bg-[#1FAE53] hover:scale-[1.02] transition-all duration-200 cursor-pointer w-full md:w-auto';
  const padding = size === 'large' ? 'px-10 py-5 text-lg' : 'px-5 py-2.5 text-sm';

  return (
    <button onClick={handleClick} className={`${base} ${padding}`}>
      <MessageCircle size={size === 'large' ? 20 : 16} />
      {label}
    </button>
  );
}

// ─── Section wrapper (fade-in on viewport) ──────────────────────────────────
function Section({ children, className = '', id }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </section>
  );
}

// ─── BenefitCard ────────────────────────────────────────────────────────────
function BenefitCard({ icon: Icon, title, body, highlight }) {
  return (
    <div className={`group rounded-lg p-8 border transition-all duration-300 hover:-translate-y-1 hover:border-[#E63946] cursor-default ${highlight ? 'border-[#E63946] bg-[#1a0a0b]' : 'border-[#2A2A2A] bg-[#141414]'}`}>
      <Icon size={40} className="text-[#E63946] mb-4" />
      <h3 className="font-[Barlow_Condensed] font-bold text-lg md:text-xl uppercase text-white mb-2">{title}</h3>
      <p className="text-[#B0B0B0] text-sm leading-relaxed">{body}</p>
    </div>
  );
}

// ─── Main LP ────────────────────────────────────────────────────────────────
export default function LpGauchoArrancada() {
  const [launchState, setLaunchState] = useState(getLaunchState);
  const [vipTime, setVipTime] = useState(() => calcTimeLeft(VIP_OPEN));
  const [publicTime, setPublicTime] = useState(() => calcTimeLeft(PUBLIC_OPEN));
  const [cupomCopied, setCupomCopied] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  // Countdown tick
  useEffect(() => {
    const interval = setInterval(() => {
      setLaunchState(getLaunchState());
      setVipTime(calcTimeLeft(VIP_OPEN));
      setPublicTime(calcTimeLeft(PUBLIC_OPEN));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sticky header on scroll
  useEffect(() => {
    const handler = () => setStickyVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // GA scroll tracking
  useEffect(() => {
    let fired50 = false;
    let fired90 = false;
    const handler = () => {
      const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (!fired50 && pct >= 50) {
        fired50 = true;
        if (typeof gtag !== 'undefined') gtag('event', 'scroll_50'); // eslint-disable-line no-undef
      }
      if (!fired90 && pct >= 90) {
        fired90 = true;
        if (typeof gtag !== 'undefined') gtag('event', 'scroll_90'); // eslint-disable-line no-undef
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleCopyCupom = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CUPOM_CODE);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = CUPOM_CODE;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCupomCopied(true);
    setToastVisible(true);
    if (typeof gtag !== 'undefined') {
      // eslint-disable-next-line no-undef
      gtag('event', 'cupom_copy_click', { cupom_code: CUPOM_CODE });
    }
    if (typeof fbq !== 'undefined') {
      // eslint-disable-next-line no-undef
      fbq('trackCustom', 'CupomCopy', { cupom: CUPOM_CODE });
    }
    setTimeout(() => { setCupomCopied(false); setToastVisible(false); }, 3000);
  }, []);

  const scrollToCupom = useCallback(() => {
    document.getElementById('cupom')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Hero headline based on state
  const heroHeadline = launchState === 'pre-launch'
    ? <>LOJA ABRE <span className="text-[#E63946]">17H ANTES</span> PRO<br />GRUPO VIP.</>
    : launchState === 'vip-open'
    ? <>LOJA ABERTA PRO<br /><span className="text-[#E63946]">GRUPO VIP.</span> ENTRA AGORA.</>
    : <>A LOJA TÁ ABERTA.<br />ENTRA NO GRUPO PRO<br />PRÓXIMO LANÇAMENTO.</>;

  const heroSub = launchState === 'pre-launch'
    ? 'Sexta 08/05 às 19h pro grupo VIP. Sábado 09/05 ao meio-dia pro público geral. Cupom CAMPEONATO_GAUCHO com 8% off + frete grátis acima de R$99 pros 10 primeiros.'
    : launchState === 'vip-open'
    ? `Quem tá no grupo já tá comprando. Faltam ${publicTime ? `${pad(publicTime.hours)}h ${pad(publicTime.minutes)}min` : '—'} pro público geral. Ainda dá tempo.`
    : 'A loja está aberta pra todo mundo. Entra no grupo VIP pra não perder o próximo lançamento.';

  return (
    <>
      <Helmet>
        <title>Campeonato Gaúcho de Arrancada 2026 — Cupom Exclusivo Asprofort</title>
        <meta name="description" content="Cupom CAMPEONATO_GAUCHO com 8% off + frete grátis na loja Asprofort. Apenas 10 unidades. Loja abre 09/05." />
        <link rel="canonical" href="https://asprofort.com/lp_arr_gaucho" />
        <meta property="og:title" content="Campeonato Gaúcho de Arrancada 2026 — Cupom Exclusivo Asprofort" />
        <meta property="og:description" content="Cupom CAMPEONATO_GAUCHO com 8% off + frete grátis. Apenas 10 unidades. Grupo VIP abre 17h antes." />
        <meta property="og:url" content="https://asprofort.com/lp_arr_gaucho" />
        <meta property="og:image" content="https://asprofort.com/asprofort_branco_bg.webp" />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">

        {/* ── Sticky Header (desktop only) ────────────────────────── */}
        <header
          className={`hidden md:flex fixed top-0 left-0 right-0 z-40 h-16 items-center justify-between px-8 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2A2A2A] transition-all duration-300 ${stickyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
        >
          <img src="/asprofort_branco_bg.webp" alt="Asprofort" className="h-8 object-contain" />
          <WhatsAppButton label="ENTRAR NO GRUPO VIP" location="header_sticky" size="small" />
        </header>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 1 — HERO
        ══════════════════════════════════════════════════════════ */}
        <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 max-w-5xl mx-auto">
          {/* Logo + badge */}
          <div className="flex items-center justify-between mb-16">
            <img src="/asprofort_branco_bg.webp" alt="Asprofort" className="h-10 object-contain" />
            <span className="border border-[#E63946] text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-sm">
              Patrocinador Oficial
            </span>
          </div>

          {/* Eyebrow */}
          <p className="text-[#E63946] text-xs md:text-sm font-semibold uppercase tracking-[0.15em] mb-4">
            Patrocinador Oficial — Campeonato Gaúcho de Arrancada 2026
          </p>

          {/* H1 */}
          <h1 className="font-[Barlow_Condensed] font-black text-[40px] md:text-[64px] uppercase leading-none tracking-tight text-white mb-6">
            {heroHeadline}
          </h1>

          {/* Subheadline */}
          <p className="text-[#B0B0B0] text-base md:text-lg leading-relaxed max-w-xl mb-10">
            {heroSub}
          </p>

          {/* CTA */}
          {launchState === 'public-open' ? (
            <a
              href={LOJA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#B82B38] hover:scale-[1.02] text-white font-bold uppercase text-lg px-10 py-5 rounded-md transition-all duration-200 w-full md:w-auto justify-center md:justify-start"
            >
              IR PRA LOJA →
            </a>
          ) : (
            <button
              onClick={scrollToCupom}
              className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#B82B38] hover:scale-[1.02] text-white font-bold uppercase text-lg px-10 py-5 rounded-md transition-all duration-200 w-full md:w-auto justify-center md:justify-start"
            >
              PEGAR MEU CUPOM <ChevronDown size={20} />
            </button>
          )}

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <ChevronDown size={24} className="text-white" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 2 — CUPOM REVELADO
        ══════════════════════════════════════════════════════════ */}
        <Section id="cupom" className="px-6 md:px-16 py-20 md:py-28 max-w-2xl mx-auto">
          <h2 className="font-[Barlow_Condensed] font-black text-3xl md:text-5xl uppercase text-white mb-10">
            TEU CUPOM TÁ AQUI.
          </h2>

          <div className={`border-2 rounded-lg p-8 md:p-10 transition-all duration-500 ${CUPOM_EXHAUSTED ? 'border-[#3a3a3a] relative overflow-hidden' : 'border-[#E63946]'} bg-[#141414]`}>
            {CUPOM_EXHAUSTED && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 rounded-lg">
                <div className="text-center px-6">
                  <p className="font-[Barlow_Condensed] font-black text-xl text-[#E63946] uppercase mb-2">CUPONS ESGOTADOS.</p>
                  <p className="text-[#B0B0B0] text-sm">Entra no grupo pra não perder o próximo.</p>
                </div>
              </div>
            )}

            {/* Coupon code */}
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-md px-6 py-5 mb-6 text-center">
              <p className="font-mono font-bold text-2xl md:text-4xl text-white tracking-widest mb-5">
                {CUPOM_CODE}
              </p>
              <button
                onClick={handleCopyCupom}
                disabled={CUPOM_EXHAUSTED}
                className={`inline-flex items-center gap-2 font-bold uppercase tracking-wide px-6 py-3 rounded-md w-full justify-center transition-all duration-200 ${cupomCopied ? 'bg-[#25D366] text-white' : 'bg-[#E63946] hover:bg-[#B82B38] text-white'} disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {cupomCopied ? <><CheckCheck size={16} /> COPIADO ✓</> : <><Copy size={16} /> COPIAR CUPOM</>}
              </button>
            </div>

            {/* Benefits list */}
            <ul className="space-y-3">
              {[
                '8% OFF na primeira compra',
                'Frete grátis em pedidos acima de R$99',
                'Apenas 10 cupons disponíveis',
                'Válido a partir do dia 09/05',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white font-medium text-sm md:text-base">
                  <Check size={18} className="text-[#E63946] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[#6B6B6B] text-sm italic mt-4 text-center">
            Copia, guarda e usa quando a loja abrir.
          </p>
        </Section>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 3 — TRANSIÇÃO PRO GRUPO VIP
        ══════════════════════════════════════════════════════════ */}
        <Section className="px-6 md:px-16 py-20 md:py-28 max-w-5xl mx-auto">
          <h2 className="font-[Barlow_Condensed] font-black text-3xl md:text-5xl uppercase text-white mb-4">
            MAS O CUPOM É SÓ O COMEÇO.
          </h2>
          <p className="text-[#B0B0B0] text-base md:text-lg mb-12 max-w-xl">
            No grupo VIP do WhatsApp, tu ativa o pacote completo de lançamento:
          </p>

          {/* 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <BenefitCard
              icon={Gift}
              title="BRINDE EXCLUSIVO"
              body="Chaveiro Asprofort do lançamento. Vai junto no envio do teu primeiro pedido com o cupom."
            />
            <BenefitCard
              icon={Zap}
              title="17H ANTES DE TODO MUNDO"
              body="Loja abre pro grupo VIP na sexta-feira, 08/05 às 19h. Pro público geral, só sábado ao meio-dia. 17 horas de vantagem pra garantir o que tu quer antes que esgote."
              highlight
            />
            <BenefitCard
              icon={Unlock}
              title="OFERTAS EXCLUSIVAS"
              body="Promoções relâmpago e descontos que só rodam dentro do grupo."
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <WhatsAppButton location="section_3" />
            <p className="text-[#6B6B6B] text-sm">Sem spam. Comunicação direta da Asprofort.</p>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 4 — COMO FUNCIONA
        ══════════════════════════════════════════════════════════ */}
        <Section className="px-6 md:px-16 py-20 md:py-28 bg-[#0D0D0D] max-w-full">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[Barlow_Condensed] font-black text-3xl md:text-5xl uppercase text-white mb-12">
              COMO FUNCIONA
            </h2>

            <div className="space-y-10">
              {[
                {
                  num: '01',
                  text: `Copia o cupom ${CUPOM_CODE} e entra no grupo VIP do WhatsApp.`,
                },
                {
                  num: '02',
                  text: 'Sexta-feira 08/05 às 19h, a loja abre exclusivamente pro grupo VIP. Tu compra e cola o cupom no checkout — antes do público geral.',
                },
                {
                  num: '03',
                  text: 'Manda o número do teu pedido no grupo e a gente libera o brinde no envio.',
                },
              ].map(({ num, text }) => (
                <div key={num} className="flex items-start gap-6">
                  <span className="font-[Barlow_Condensed] font-black text-5xl md:text-7xl text-[#E63946] leading-none shrink-0">
                    {num}
                  </span>
                  <p className="text-white text-base md:text-lg leading-relaxed pt-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 5 — POR QUE ASPROFORT
        ══════════════════════════════════════════════════════════ */}
        <Section className="px-6 md:px-16 py-20 md:py-28 max-w-5xl mx-auto">
          <h2 className="font-[Barlow_Condensed] font-black text-3xl md:text-5xl uppercase text-white mb-4">
            ENGENHARIA, NÃO DECORAÇÃO.
          </h2>
          <p className="text-[#B0B0B0] text-base md:text-lg mb-12 max-w-xl">
            A Asprofort não vende peça bonita. Vende peça que aguenta o que a tua moto faz na pista.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitCard
              icon={Wrench}
              title="ASPROLOCK SYSTEM"
              body="Sistema proprietário de fixação mecânica em 4 parafusos inox. Corneta firme, alinhada e sem soltar com vibração."
            />
            <BenefitCard
              icon={Flame}
              title="MATERIAIS TÉCNICOS"
              body="Resistência a 200°C contínuos, vibração e combustíveis agressivos. Nylon com fibra de carbono, aço inox."
            />
            <BenefitCard
              icon={BarChart3}
              title="TESTADO EM DINAMÔMETRO"
              body="Cada produto é validado em teste real, não só em projeto. Ganho medido em CV, não em adjetivo."
            />
            <BenefitCard
              icon={Flag}
              title="NA PISTA COM O GAÚCHO"
              body="Patrocinador oficial do Campeonato Gaúcho de Arrancada 2026. Marca presente em projetos de pista, arrancada e rua."
            />
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 6 — O QUE ROLA NO GRUPO VIP
        ══════════════════════════════════════════════════════════ */}
        <Section className="px-6 md:px-16 py-20 md:py-28 bg-[#0D0D0D] max-w-full">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-[Barlow_Condensed] font-black text-3xl md:text-5xl uppercase text-white mb-10">
              O QUE TU VAI VER NO GRUPO
            </h2>

            <ul className="space-y-4 mb-8">
              {[
                'Lançamentos antes de aparecer no Instagram',
                'Ofertas relâmpago só pra quem tá lá',
                'Conteúdo técnico de bastidor (testes, dinos, novos projetos)',
                'Comunicação direta com a Asprofort',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white font-medium text-base md:text-lg">
                  <Check size={20} className="text-[#E63946] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mb-10">
              <li className="flex items-center gap-3 text-[#6B6B6B] font-medium text-base list-none">
                <X size={20} className="text-[#6B6B6B] shrink-0" />
                Sem corrente, sem spam, sem flood.
              </li>
            </div>

            <div className="flex flex-col items-center gap-3">
              <WhatsAppButton location="section_6" />
              <p className="text-[#6B6B6B] text-sm">Sem spam. Comunicação direta da Asprofort.</p>
            </div>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 7 — CTA FINAL + COUNTDOWN DUPLO
        ══════════════════════════════════════════════════════════ */}
        <Section className="px-6 md:px-16 py-20 md:py-28 max-w-2xl mx-auto text-center">

          {/* Countdown states */}
          {launchState === 'pre-launch' && (
            <>
              <CountdownBox label="GRUPO VIP — ABRE SEXTA-FEIRA ÀS 19H" time={vipTime} variant="primary" />
              <CountdownBox label="PÚBLICO GERAL — ABRE SÁBADO AO MEIO-DIA" time={publicTime} variant="muted" />
            </>
          )}

          {launchState === 'vip-open' && (
            <>
              <div className="flex items-center justify-center gap-3 bg-[#1a0a0b] border border-[#E63946] rounded-lg px-6 py-4 mb-4">
                <span className="text-2xl">🔥</span>
                <span className="font-[Barlow_Condensed] font-bold text-xl text-[#E63946] uppercase tracking-wide">
                  LOJA ABERTA PRO GRUPO VIP
                </span>
              </div>
              <CountdownBox label="PÚBLICO GERAL — ABRE EM" time={publicTime} variant="primary" />
              <p className="text-[#B0B0B0] text-sm mb-6">Quem tá no grupo já tá comprando.</p>
            </>
          )}

          {launchState === 'public-open' && (
            <div className="font-[Barlow_Condensed] font-black text-2xl text-white uppercase mb-8">
              A LOJA ESTÁ ABERTA PARA TODOS.
            </div>
          )}

          <h2 className="font-[Barlow_Condensed] font-black text-3xl md:text-5xl uppercase text-white mb-8">
            {launchState === 'public-open' ? 'APROVEITA O LANÇAMENTO.' : 'NÃO PERDE OS 10 CUPONS.'}
          </h2>

          {launchState !== 'public-open' && (
            <CupomInline onCopy={handleCopyCupom} />
          )}

          <div className="flex flex-col items-center gap-3">
            {launchState === 'public-open' ? (
              <>
                <a
                  href={LOJA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#B82B38] hover:scale-[1.02] text-white font-bold uppercase text-lg px-10 py-5 rounded-md transition-all duration-200 w-full md:w-auto"
                >
                  IR PRA LOJA →
                </a>
                <WhatsAppButton label="ENTRAR NO GRUPO VIP" location="section_7" size="large" />
              </>
            ) : (
              <WhatsAppButton
                label={launchState === 'vip-open' ? 'ENTRAR NO GRUPO E COMPRAR' : 'ENTRAR NO GRUPO VIP'}
                location="section_7"
              />
            )}
            <p className="text-[#6B6B6B] text-sm">Sem spam. Comunicação direta da Asprofort.</p>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════════════════
            SEÇÃO 8 — FOOTER
        ══════════════════════════════════════════════════════════ */}
        <footer className="bg-[#141414] border-t border-[#2A2A2A] px-6 md:px-16 py-12">
          <div className="max-w-5xl mx-auto">
            <img src="/asprofort_branco_bg.webp" alt="Asprofort" className="h-8 object-contain mb-4" />
            <p className="text-[#B0B0B0] text-sm italic mb-6">
              Componentes para potência repetível e uso severo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ul className="space-y-2 text-sm text-[#B0B0B0]">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[#6B6B6B]" />
                  <a href="https://wa.me/5555996835911" className="hover:text-white transition-colors">SAC: (55) 9683-5911</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[#6B6B6B]" />
                  <a href="https://wa.me/5555999713752" className="hover:text-white transition-colors">Comercial: (55) 9971-3752</a>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram size={14} className="text-[#6B6B6B]" />
                  <a href="https://instagram.com/asprofort" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@asprofort</a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={14} className="text-[#6B6B6B]" />
                  <a href="https://asprofort.com" className="hover:text-white transition-colors">asprofort.com</a>
                </li>
              </ul>

              <ul className="space-y-2 text-sm text-[#B0B0B0]">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#E63946]" />
                  Garantia de 3 meses contra defeitos de fabricação
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#E63946]" />
                  Frete pra todo o Brasil
                </li>
              </ul>
            </div>

            <div className="border-t border-[#2A2A2A] pt-6 text-[#6B6B6B] text-xs space-y-1">
              <p>Asprofort — CNPJ 63.389.432/0001-56</p>
              <p>Rua Gen. Ernesto Dorneles, 752 — Santo Ângelo/RS</p>
              <p>© 2026 Asprofort. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>

      </div>

      <Toast visible={toastVisible} />
    </>
  );
}
