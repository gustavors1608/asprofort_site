const SHOPEE_URL = 'https://shopee.com.br/asprofort';
const LOJA_URL = 'https://loja.asprofort.com';

const CUTOVER_TS = Date.parse('2026-05-09T00:00:00-03:00');

export function getStoreUrl() {
  return Date.now() >= CUTOVER_TS ? LOJA_URL : SHOPEE_URL;
}
