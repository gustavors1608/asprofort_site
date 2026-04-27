# Plano de Redesign — Site Asprofort
**Versão:** 1.0 — Abril 2026  
**Objetivo:** Aumentar impacto visual, clareza de proposta de valor e conversão separada B2C/B2B.  
**Restrição:** Manter estrutura de componentes, todo o conteúdo existente e toda a estrutura de SEO/GEO.

---

## Diagnóstico

### O que está bom — não mexer
- Estrutura de componentes (Header → Hero → About → Catalog → B2BSection → FAQ → LinksSection → LocalMaps → Footer)
- SEO completo: JSON-LD (Organization, LocalBusiness, ItemList, FAQPage), meta tags, Open Graph, geo tags
- Tema escuro, framer-motion, Tailwind
- Conteúdo técnico dos produtos, FAQ e dados legais

### Problemas identificados

| Problema | Localização | Impacto |
|---|---|---|
| Copy do hero é superlativo vago, sem dado | `Hero.jsx:47` | Baixo impacto, não nomeia a dor do preparador |
| Vermelho errado `#dc2626` | `index.css:7` | Diverge do `#E63946` do manual de marca |
| Fonte errada (Montserrat) | `index.css:1` | Manual especifica Barlow Condensed + Inter |
| Sem arco problema → solução | Geral | Visitante não se reconhece antes de ver produto |
| Imagens de produto 80×80px | `Catalog.jsx:81` | Não ativa o efeito halo do produto |
| Dado de 200°C atribuído incorretamente à corneta | `About.jsx:68` | Temperatura é dado do respiro em nylon — não da corneta |
| Zero prova social | Toda a página | Nenhum dado valida a promessa técnica |
| CTAs não segmentam B2C e B2B | `Hero.jsx`, `B2BSection` | Mecânico e consumidor final recebem tratamento idêntico |
| Links apontando para Shopee | `Hero.jsx`, `Catalog.jsx`, `B2BSection.jsx`, `App.jsx` JSON-LD | Precisa migrar para `loja.asprofort.com` |

---

## Princípios de Design Aplicados

**Efeito UAU:** Os primeiros 3 segundos determinam se o visitante fica. O UAU vem da combinação: produto dominando visualmente + headline que nomeia a dor do preparador de forma técnica e direta.

**Efeito Halo:** Se o site é percebido como técnico e sério, o produto também é. Tipografia correta, cor exata e hierarquia visual coerente transferem credibilidade para a peça antes mesmo de o visitante ler uma linha.

**Narrativa Problema → Solução:** O visitante precisa se reconhecer no problema antes de ouvir a solução. Hoje o site pula direto para o produto. A sequência certa: *problema real do preparador* → *por que as soluções comuns falham* → *Asprofort resolve dessa forma* → *aqui está a prova*.

---

## Fases de Execução

---

### Fase 1 — Fundação
**Estimativa:** 30–60 min  
**Risco:** Zero — apenas correções de variáveis e strings

#### 1.1 — Corrigir cor vermelha
**Arquivo:** `src/index.css`

```css
/* DE */
--racing-red: #dc2626;
--racing-red-dark: #b91c1c;

/* PARA */
--racing-red: #E63946;
--racing-red-dark: #c1121f;
```

#### 1.2 — Trocar tipografia
**Arquivo:** `src/index.css` e `index.html`

Remover Montserrat. Adicionar no `<head>` do `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

Em `index.css`:
```css
/* DE */
@import url('https://fonts.googleapis.com/css2?family=Montserrat...');
body { font-family: 'Montserrat', sans-serif; }

/* PARA */
body { font-family: 'Inter', sans-serif; }
h1, h2, h3, .font-black, .font-bold { font-family: 'Barlow Condensed', sans-serif; }
```

#### 1.3 — Migrar links Shopee → loja.asprofort.com

Arquivos afetados: `Hero.jsx`, `Catalog.jsx`, `B2BSection.jsx`, `App.jsx` (JSON-LD)

```jsx
// DE
const SHOPEE_URL = 'https://shopee.com.br/asprofort';

// PARA
const LOJA_URL = 'https://loja.asprofort.com';
```

Atualizar também os `sameAs` e `url` de produto no JSON-LD do `App.jsx`.

#### 1.4 — Atualizar texto dos botões de compra

```jsx
// DE: "Loja Shopee"
// PARA: "Acessar Loja"
```

---

### Fase 2 — Hero Redesign
**Estimativa:** 3–4h  
**Impacto:** Alto — primeira seção, define toda a percepção do site

#### 2.1 — Novo copy do headline

```jsx
// REMOVER:
"Criado para quem não aceita o comum, apenas o excepcional"

// SUBSTITUIR POR (duas linhas):
<span className="text-white block">Calculada pra gerar potência.</span>
<span className="text-red-500 block">Asprolock. Não solta. Nunca.</span>
```

**Subtítulo** (manter mas melhorar):
```
Cornetas de admissão com encaixe milimétrico para carburadores e TBI.
Fixação mecânica com parafusos inox. Sem degrau interno. Feito pra pista.
```

#### 2.2 — Microdiferenciais abaixo do headline

Adicionar 3 badges inline antes dos botões:

| Ícone | Texto |
|---|---|
| `Shield` | Asprolock System |
| `Zap` | Sem degrau interno |
| `FlaskConical` | Gasolina, etanol e metanol |

**Implementação:**
```jsx
<div className="flex flex-wrap gap-4 justify-center mb-8">
  <span className="flex items-center gap-2 text-sm text-gray-300 border border-red-500/30 px-3 py-1 rounded-full">
    <ShieldCheck size={14} className="text-red-500" /> Asprolock System
  </span>
  <span className="flex items-center gap-2 text-sm text-gray-300 border border-red-500/30 px-3 py-1 rounded-full">
    <Zap size={14} className="text-red-500" /> Sem degrau interno
  </span>
  <span className="flex items-center gap-2 text-sm text-gray-300 border border-red-500/30 px-3 py-1 rounded-full">
    <Droplets size={14} className="text-red-500" /> Gasolina, etanol e metanol
  </span>
</div>
```

#### 2.3 — CTAs segmentados com contexto

```jsx
{/* B2C — primário */}
<Button onClick={handleLoja} className="btn-racing ...">
  <ShoppingBag size={20} />
  Comprar na Loja
</Button>

{/* B2B — secundário, com label de contexto */}
<div className="flex flex-col items-center gap-1">
  <span className="text-xs text-gray-500 uppercase tracking-widest">Oficina ou revendedor?</span>
  <Button onClick={handleWhatsApp} variant="outline" className="border-2 border-red-500 ...">
    <MessageCircle size={20} />
    Falar no Comercial
  </Button>
</div>
```

#### 2.4 — Corrigir Footer
```jsx
// DE: "Criado para quem não aceita o comum, apenas o excepcional."
// PARA: slogan oficial do manual
"Componentes para potência repetível e uso severo."
```

---

### Fase 3 — About: Problema Primeiro
**Estimativa:** 2h  
**Impacto:** Médio-alto — contexto que prepara o visitante para entender os diferenciais

#### 3.1 — Bloco narrativo antes do grid de cards

Inserir antes do `<div className="grid md:grid-cols-2 ...">`:

```jsx
<div className="bg-black/40 border border-red-500/20 rounded-lg p-8 mb-12 text-left max-w-3xl mx-auto">
  <p className="text-gray-400 text-lg leading-relaxed">
    O mercado de preparação estava cheio de peça bonita que não aguentava uso real.{' '}
    Corneta que soltava na vibração. Degrau interno que criava turbulência.{' '}
    Material que não resistia a metanol.{' '}
    <span className="text-white font-semibold">
      A Asprofort nasceu pra resolver isso — com fabricação própria e teste em pista.
    </span>
  </p>
</div>
```

#### 3.2 — Corrigir card "Material de Corrida" (dado de temperatura incorreto)

O dado de 200°C pertence ao respiro em nylon com fibra de carbono — não às cornetas.

```jsx
// REMOVER do card:
"...a temperaturas contínuas de até 200°C..."

// SUBSTITUIR o parágrafo por:
<p className="text-gray-300 text-lg">
  Nylon com fibra de carbono resistente a combustível —
  gasolina, etanol e metanol. Não deforma, não resseca,
  não trinca com o tempo. Desenvolvido pra aguentar uso
  real em pista e arrancada, não só em bancada.
</p>
```

#### 3.3 — Atualizar título da seção (tag `id` mantida para SEO)

```jsx
// DE:
<h2>Quem <span>somos</span></h2>

// PARA:
<h2>Por que a <span>Asprofort existe</span></h2>
```

---

### Fase 4 — Catálogo: Produto com Impacto Visual
**Estimativa:** 3–4h  
**Impacto:** Alto — é o momento de decisão de compra

#### 4.1 — Redesenhar cards de produto

De: imagem 80×80px + texto à direita  
Para: imagem 200×200px acima + texto abaixo + CTA individual por produto

```jsx
<div className="bg-black/50 rounded-lg border border-red-500/20 overflow-hidden card-hover">
  <img
    src="corneta.webp"
    alt="..."
    className="w-full h-48 object-contain bg-[#111] p-4"
    loading="lazy"
  />
  <div className="p-6">
    <h3 className="text-xl font-bold text-white mb-2">Cornetas Linha AFair</h3>
    <p className="text-gray-300 text-sm leading-relaxed mb-4">...</p>
    <Button onClick={handleLoja} size="sm" className="btn-racing w-full">
      Ver na Loja
    </Button>
  </div>
</div>
```

#### 4.2 — Grid ajustado para 3 colunas em desktop

```jsx
<div className="grid md:grid-cols-3 gap-6">
  {/* card corneta */}
  {/* card suporte */}
  {/* card flange */}
</div>
```

#### 4.3 — Mover o bloco de download do PDF

O card do catálogo em PDF passa a ser um CTA secundário e discreto no final da seção:
```jsx
<div className="text-center mt-12 pt-8 border-t border-red-500/10">
  <p className="text-gray-400 text-sm mb-3">Especificações técnicas e tabela de compatibilidade completa:</p>
  <Button onClick={handleDownloadCatalog} variant="outline" size="sm" className="border-red-500/40 text-gray-300">
    <Download size={16} /> Baixar Catálogo PDF
  </Button>
</div>
```

---

### Fase 5 — B2B: Narrativa Mais Forte
**Estimativa:** 1–2h

#### 5.1 — Adicionar label de contexto antes da seção

```jsx
<div className="text-center mb-4">
  <span className="text-xs text-gray-500 uppercase tracking-widest border border-gray-700 px-4 py-1 rounded-full">
    Para oficinas, preparadores e distribuidores
  </span>
</div>
```

#### 5.2 — Reescrever headline com problema

```jsx
// DE:
"É mecânico ou tem oficina?"

// PARA:
<h2>
  Você monta a preparação.<br />
  <span className="text-red-500">A Asprofort garante a peça que não falha.</span>
</h2>
```

#### 5.3 — Adicionar números concretos nos cards do grid

```jsx
// Card 1
<h3>Margem Real pra Sua Oficina</h3>
<p>Revenda com condições de atacado. Pedido mínimo de R$ 399 com CNPJ ativo.
Prazo de envio de até 72h úteis após confirmação.</p>

// Card 2
<h3>Suporte Técnico Incluído</h3>
<p>Material fotográfico em alta, FAQ completo e plaqueta de Revendedor Autorizado
a partir do 2º pedido. Você explica com segurança — o cliente compra com confiança.</p>
```

#### 5.4 — CTA do B2B aponta para WhatsApp B2B (número correto)

```jsx
// Verificar que o link usa o número SAC/Comercial correto: 55 99683-5911
// e o texto pré-preenchido é adequado para revendedor
window.open('https://wa.me/5555996835911?text=...', '_blank');
```

---

### Fase 6 — Prova Social (nova seção)
**Estimativa:** 2–3h de código + conteúdo real quando disponível  
**Posição:** Entre `<Catalog />` e `<B2BSection />` no `App.jsx`  
**Novo componente:** `src/components/SocialProof.jsx`

#### 6.1 — Números de validação (usar imediatamente)

```jsx
<div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-16">
  <div className="text-center">
    <p className="text-5xl font-black text-red-500">+500</p>
    <p className="text-gray-300 mt-2">cornetas instaladas</p>
  </div>
  <div className="text-center">
    <p className="text-5xl font-black text-red-500">+15</p>
    <p className="text-gray-300 mt-2">oficinas e revendedores parceiros</p>
  </div>
</div>
```

#### 6.2 — Depoimentos sugeridos (substituir por reais quando disponível)

Os 3 perfis abaixo são sugestões de formato e tom — **substituir por depoimentos reais de clientes antes de publicar.**

---

**Depoimento 1 — Preparador de arrancada**
> "Já usei corneta de outros fabricante e sempre tinha problema com vibração na pista. Com a Asprofort o Asprolock trava de verdade. Instalei, regulei a carburação e esqueci. Moto foi leve na saída de linha."
> 
> — *Carlos H., preparador, CG 160 TBI — Caxias do Sul/RS*

---

**Depoimento 2 — Mecânico / Oficina**
> "Indico pra todos os clientes que querem montar uma admissão decente. O encaixe é exato, sem folga, sem degrau. E quando o cliente pergunta se a peça aguenta, eu mostro o parafuso inox e o problema se resolve."
> 
> — *Marcos T., mecânico preparador — Porto Alegre/RS*

---

**Depoimento 3 — Entusiasta / cliente direto**
> "Comprei a corneta média pra minha Twister preparada. Chegou rápido, o encaixe foi perfeito no carburador Koso. Moto puxou diferente desde o primeiro teste. Nenhuma vibração, nenhum afrouxamento depois de dois meses."
> 
> — *João P., Twister 250 carburada — Florianópolis/SC*

---

**Formato visual do card de depoimento:**
```jsx
<div className="bg-black/50 border border-red-500/20 rounded-lg p-6">
  <div className="flex gap-1 mb-3">
    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-red-500 fill-red-500" />)}
  </div>
  <p className="text-gray-300 text-sm leading-relaxed mb-4 italic">"{texto}"</p>
  <div>
    <p className="text-white font-semibold text-sm">{nome}</p>
    <p className="text-gray-500 text-xs">{moto} — {cidade}</p>
  </div>
</div>
```

#### 6.3 — Resultado de dyno (quando disponível)

Reservar espaço para um bloco de resultado técnico:
```
[Foto do setup] | Moto: CG 160 / Preparação: corneta média AFair
                | Antes: X cv  →  Depois: X+3 cv
                | "Ganho documentado em dynamômetro"
```

---

## Sequência de Execução Recomendada

```
Fase 1    →    Fase 2    →    Fase 4    →    Fase 3    →    Fase 5    →    Fase 6
Fundação       Hero          Catálogo        About          B2B           Prova Social
30–60min       3–4h          3–4h            2h             1–2h          2–3h + conteúdo real
```

**Total estimado:** 12–17h de desenvolvimento

Fases 1 e 2 juntas já geram diferença perceptível. Fase 4 é o maior ganho visual. Fase 6 é o maior ganho de conversão mas depende de conteúdo real — os depoimentos sugeridos são ponto de partida, não de chegada.

---

## Checklist de SEO/GEO — O que não pode mudar

- [ ] Todos os `id` de seção mantidos: `#inicio`, `#sobre`, `#catalogo`, `#contato`
- [ ] JSON-LD Organization, LocalBusiness, ItemList e FAQPage mantidos em `App.jsx`
- [ ] Meta description, keywords, geo tags mantidos em `index.html`
- [ ] Facebook domain verification mantida
- [ ] Google Analytics mantido
- [ ] Canonical URL mantida
- [ ] Atualizar `sameAs` do JSON-LD: trocar URL da Shopee por `https://loja.asprofort.com`
- [ ] Atualizar `url` de cada produto no ItemList JSON-LD para `https://loja.asprofort.com`

---

## Notas de Implementação

- **Imagens de produto:** Verificar se `corneta.webp`, `suporte.webp` e `flange.webp` em `/public` têm resolução adequada para os novos cards maiores. Se não, substituir pelos arquivos da pasta `imagen de produtos`.
- **loja.asprofort.com:** Enquanto a Nuvemshop não estiver no ar, o botão pode aparecer com badge "Em breve" ou redirecionar para uma página de aviso. Não apontar para Shopee após a migração.
- **Depoimentos:** Nunca publicar os depoimentos sugeridos como se fossem reais. São referência de formato e tom para coletar os depoimentos verdadeiros.
- **Respiro de cárter:** O dado de resistência a 200°C pertence ao produto respiro em nylon com fibra de carbono — **não** às cornetas. Não usar esse dado na seção de cornetas em nenhum contexto.

---

*Versão 1.0 — Abril 2026*
