export const VIP_OPEN = new Date('2026-05-08T19:00:00-03:00').getTime();
export const PUBLIC_OPEN = new Date('2026-05-09T12:00:00-03:00').getTime();

// Alterar para true manualmente quando os 10 cupons forem usados
export const CUPOM_EXHAUSTED = false;

export const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/Ba4CTf3W9sM3Ndm0fhhm3F';
export const LOJA_URL = 'https://loja.asprofort.com';
export const CUPOM_CODE = 'CAMPEONATO_GAUCHO';

export function getLaunchState() {
  const now = Date.now();
  if (now < VIP_OPEN) return 'pre-launch';
  if (now < PUBLIC_OPEN) return 'vip-open';
  return 'public-open';
}

export function calcTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function pad(n) {
  return String(n).padStart(2, '0');
}
