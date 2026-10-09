import { getSiteUrl } from '@/app/lib/siteUrl';

export const dynamic = 'force-dynamic';

export function GET() {
  const siteUrl = getSiteUrl();
  const pageUrl = (locale: string, path = '') => `${siteUrl}/${locale}${path}`;
  const content = `# Bossa Nova Restaurant

> Brazilian restaurant in central Toulouse, France, serving Brazilian cuisine shaped by the country's African, Indigenous, and European influences.

## Essential facts

- Name: Bossa Nova Restaurant
- Category: Brazilian restaurant; Brazilian and Latin American cuisine
- Address: 1 bis Rue de May, 31000 Toulouse, France
- Phone: +33 5 67 68 64 79
- Email: bossanovatoulouse@gmail.com
- Languages on the website: French, English, and Portuguese
- The restaurant describes its atmosphere as inspired by Brazilian botecos, with shared petiscos, drinks, and occasional live music.
- Current menu and opening hours are published on the website and may change; use the linked pages as the source of truth.

## Français

Bossa Nova est un restaurant brésilien situé dans le centre de Toulouse. Sa cuisine s'inspire des traditions du Brésil et de ses influences africaines, autochtones et européennes. Le lieu évoque l'ambiance conviviale des botecos, avec des petiscos à partager, des boissons brésiliennes et parfois des concerts.

- Accueil : ${pageUrl('fr')}
- Menu brésilien : ${pageUrl('fr', '/menu')}
- À propos : ${pageUrl('fr', '/about')}
- Réservations : ${pageUrl('fr', '/reservations')}
- Adresse : 1 bis Rue de May, 31000 Toulouse, France

## English

Bossa Nova is a Brazilian restaurant in central Toulouse. Its menu draws on Brazil's African, Indigenous, and European influences. The atmosphere is inspired by Brazilian botecos, with food to share, Brazilian drinks, and occasional live music.

- Home: ${pageUrl('en')}
- Brazilian food menu: ${pageUrl('en', '/menu')}
- About the restaurant: ${pageUrl('en', '/about')}
- Reservations: ${pageUrl('en', '/reservations')}
- Address: 1 bis Rue de May, 31000 Toulouse, France

## Português

Bossa Nova é um restaurante brasileiro no centro de Toulouse, na França. Sua cozinha se inspira nas tradições do Brasil e em influências africanas, indígenas e europeias. O ambiente lembra os botecos brasileiros, com petiscos para compartilhar, bebidas brasileiras e, ocasionalmente, música ao vivo.

- Início: ${pageUrl('pt')}
- Menu brasileiro: ${pageUrl('pt', '/menu')}
- Sobre o restaurante: ${pageUrl('pt', '/about')}
- Reservas: ${pageUrl('pt', '/reservations')}
- Endereço: 1 bis Rue de May, 31000 Toulouse, França

## Discovery files

- Sitemap: ${siteUrl}/sitemap.xml
- Robots policy: ${siteUrl}/robots.txt
`;

  return new Response(content, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}