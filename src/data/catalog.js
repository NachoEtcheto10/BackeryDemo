export const BUSINESS_CONFIG = {
  name: 'Ambrosía Bakery',
  whatsappNumber: '5493442600219',
  address: 'Bv. Ricardo Balbín 2067, E3260CED Concepción del Uruguay, Entre Ríos',
  shortAddress: 'Bv. Ricardo Balbín 2067',
  instagramUrl: 'https://www.instagram.com/ambrosiabakery_cdelu/',
  instagramHandle: '@ambrosiabakery_cdelu',
  mapsPlaceUrl:
    'https://www.google.com/maps/place/AMBROS%C3%8DA+BAKERY/@-32.4792822,-58.2625093,17z/data=!3m1!4b1!4m6!3m5!1s0x67b8d5773575caf5:0x1b53389b14b19d58!8m2!3d-32.4792868!4d-58.259929!16s%2Fg%2F11nv0w00c1',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=AMBROS%C3%8DA+BAKERY,+Bv.+Ricardo+Balb%C3%ADn+2067,+Concepci%C3%B3n+del+Uruguay,+Entre+R%C3%ADos&ll=-32.4792868,-58.259929&z=17&output=embed'
};

export const REWARD_GOAL = 25000;
export const LOYALTY_GOAL = 8;

export const PRODUCTS_DATA = [
  {
    id: 'cookie-chocolate-chips',
    name: 'Cookie Clásica Chips de Chocolate',
    category: 'cookies',
    basePrice: 2800,
    servings: 'Unidad XL · 120 g',
    badge: 'La Favorita',
    badgeType: 'gold',
    image: '/assets/images/cookies_pack.jpg',
    description:
      'Nuestra cookie insignia: bordes dorados y crocantes, centro húmedo que se derrite y abundantes chips de chocolate semiamargo. Horneada en el día.',
    allergens:
      'Contiene: Harina de trigo, manteca, huevos y chocolate (puede contener trazas de frutos secos).',
    available: true,
    variants: [
      { name: 'Unidad XL', price: 2800 },
      { name: 'Caja x 6 unidades', price: 15500 },
      { name: 'Caja x 12 unidades', price: 29000 }
    ]
  },
  {
    id: 'cookie-red-velvet',
    name: 'Cookie Red Velvet & Chocolate Blanco',
    category: 'cookies',
    basePrice: 3000,
    servings: 'Unidad XL · 120 g',
    badge: 'Nueva',
    badgeType: 'chef',
    image: '/assets/images/box_cookies_regalo.jpg',
    description:
      'Masa red velvet suave con un toque de cacao y trozos generosos de chocolate blanco que se funden en cada mordida.',
    allergens: 'Contiene: Harina de trigo, manteca, huevos, lácteos y chocolate blanco.',
    available: true,
    variants: [
      { name: 'Unidad XL', price: 3000 },
      { name: 'Caja x 6 unidades', price: 16500 }
    ]
  },
  {
    id: 'cookie-rellena-ddl',
    name: 'Cookie Rellena de Dulce de Leche',
    category: 'rellenas',
    basePrice: 3600,
    servings: 'Unidad XL rellena',
    badge: 'Derrite',
    badgeType: 'gold',
    image: '/assets/images/cookies_rellenas.jpg',
    description:
      'Cookie gruesa con corazón de dulce de leche repostero que se derrite al partirla. Para los que no se conforman con poco.',
    allergens: 'Contiene: Harina de trigo, manteca, huevos y lácteos.',
    available: true,
    variants: [
      { name: 'Unidad XL rellena', price: 3600 },
      { name: 'Caja x 4 rellenas', price: 13500 }
    ]
  },
  {
    id: 'cookie-rellena-nutella',
    name: 'Cookie Rellena de Nutella',
    category: 'rellenas',
    basePrice: 3900,
    servings: 'Unidad XL rellena',
    badge: 'Más Pedida',
    badgeType: 'chef',
    image: '/assets/images/hero_cookies.jpg',
    description:
      'Masa de chocolate con chips y un centro de Nutella fundente. Recomendamos calentarla 10 segundos antes de comerla.',
    allergens: 'Contiene: Harina de trigo, manteca, huevos, lácteos y avellanas.',
    available: true,
    variants: [
      { name: 'Unidad XL rellena', price: 3900 },
      { name: 'Caja x 4 rellenas', price: 14500 }
    ]
  },
  {
    id: 'chipa',
    name: 'Chipá Recién Horneado',
    category: 'salados',
    basePrice: 4800,
    servings: 'Por peso',
    badge: 'Calentito',
    badgeType: 'gold',
    image: '/assets/images/chipa.jpg',
    description:
      'Chipá bien quesoso, crocante por fuera y tierno por dentro. Ideal para el mate, el desayuno o la merienda.',
    allergens:
      'Contiene: Lácteos y huevos. Elaborado con almidón de mandioca (consultar por trazas de gluten).',
    available: true,
    variants: [
      { name: '1/4 kg', price: 4800 },
      { name: '1/2 kg', price: 9000 },
      { name: '1 kg', price: 17000 }
    ]
  },
  {
    id: 'scones-queso',
    name: 'Scones de Queso',
    category: 'salados',
    basePrice: 3800,
    servings: 'Media docena',
    badge: null,
    badgeType: 'gold',
    image: '/assets/images/scones.jpg',
    description:
      'Scones caseros esponjosos con queso, dorados al horno. Perfectos solos o con manteca, para acompañar el café.',
    allergens: 'Contiene: Harina de trigo, manteca, lácteos y huevos.',
    available: true,
    variants: [
      { name: 'Media docena', price: 3800 },
      { name: 'Docena', price: 7000 }
    ]
  },
  {
    id: 'box-desayuno',
    name: 'Box Desayuno / Merienda Ambrosía',
    category: 'boxes',
    basePrice: 24000,
    servings: 'Ideal para 2 personas',
    badge: 'Ideal para Regalar',
    badgeType: 'chef',
    image: '/assets/images/box_desayuno.jpg',
    description:
      'Caja de regalo con cookies surtidas, chipá recién horneado, scones y tarjeta con dedicatoria. La sorpresa perfecta para cumpleaños, aniversarios o simplemente para mimar a alguien.',
    allergens: 'Contiene: Harina de trigo, manteca, huevos y lácteos.',
    available: true,
    variants: [
      { name: 'Box Clásica (para 2)', price: 24000 },
      { name: 'Box Grande (para 4)', price: 38000 }
    ]
  },
  {
    id: 'box-cookies-regalo',
    name: 'Box Regalo Cookies Surtidas',
    category: 'boxes',
    basePrice: 16500,
    servings: 'Caja de regalo',
    badge: 'Edición Regalo',
    badgeType: 'gold',
    image: '/assets/images/box_cookies_regalo.jpg',
    description:
      'Caja con moño y tarjeta para dedicatoria con nuestras cookies más pedidas surtidas. Lista para regalar.',
    allergens:
      'Contiene: Harina de trigo, manteca, huevos, lácteos y chocolate (puede contener trazas de frutos secos).',
    available: true,
    variants: [
      { name: 'Box x 6 cookies surtidas', price: 16500 },
      { name: 'Box x 12 cookies surtidas', price: 31000 }
    ]
  },
  {
    id: 'lemon-pie',
    name: 'Lemon Pie Clásico',
    category: 'tortas',
    basePrice: 18000,
    servings: '8 a 10 porciones',
    badge: 'Clásico',
    badgeType: 'gold',
    image: '/assets/images/lemon_pie.jpg',
    description:
      'Base crocante de masa sablée casera, relleno cremoso de limón natural en su punto justo de acidez y copos altos de merengue italiano dorado.',
    allergens: 'Contiene: Harina de trigo, manteca, huevos y lácteos.',
    available: true,
    variants: [
      { name: 'Mediana (20 cm · 8 a 10 porciones)', price: 18000 },
      { name: 'Grande (24 cm · 12 a 15 porciones)', price: 24500 }
    ]
  },
  {
    id: 'torta-rogel',
    name: 'Torta Rogel Artesanal',
    category: 'tortas',
    basePrice: 22000,
    servings: '10 a 12 porciones',
    badge: 'Más Pedida',
    badgeType: 'chef',
    image: '/assets/images/torta_rogel.jpg',
    description:
      'Capas finitas y bien crocantes de masa hojaldrada horneadas una por una, intercaladas con abundante dulce de leche repostero y coronadas con merengue italiano.',
    allergens: 'Contiene: Harina de trigo, manteca, huevos y lácteos.',
    available: true,
    variants: [
      { name: 'Mediana (20 cm · 10 a 12 porciones)', price: 22000 },
      { name: 'Grande (24 cm · 14 a 18 porciones)', price: 29500 }
    ]
  },
  {
    id: 'torta-brownie',
    name: 'Torta Brownie con DDL & Merengue',
    category: 'tortas',
    basePrice: 21000,
    servings: '10 a 12 porciones',
    badge: 'Puro Chocolate',
    badgeType: 'gold',
    image: '/assets/images/torta_brownie.jpg',
    description:
      'Base húmeda e intensa de brownie de chocolate semiamargo, capa generosa de dulce de leche repostero y merengue italiano suave.',
    allergens:
      'Contiene: Harina de trigo, manteca, huevos, lácteos y chocolate (opcional con nueces).',
    available: true,
    variants: [
      { name: 'Mediana (20 cm · 10 a 12 porciones)', price: 21000 },
      { name: 'Grande (24 cm · 14 a 16 porciones)', price: 27500 }
    ]
  },
  {
    id: 'selva-negra',
    name: 'Torta Selva Negra',
    category: 'tortas',
    basePrice: 24000,
    servings: '12 a 14 porciones',
    badge: 'Especialidad',
    badgeType: 'chef',
    image: '/assets/images/selva_negra.jpg',
    description:
      'Bizcochuelo húmedo de cacao intenso embebido en almíbar suave, crema chantilly fresca, cerezas negras y virutas de chocolate amargo.',
    allergens: 'Contiene: Harina de trigo, huevos, lácteos y chocolate.',
    available: true,
    variants: [
      { name: 'Mediana (20 cm · 12 a 14 porciones)', price: 24000 },
      { name: 'Grande (24 cm · 16 a 20 porciones)', price: 32000 }
    ]
  },
  {
    id: 'cheesecake-frutos-rojos',
    name: 'Cheesecake de Frutos Rojos',
    category: 'tortas',
    basePrice: 23000,
    servings: '10 a 12 porciones',
    badge: 'Cremosa',
    badgeType: 'gold',
    image: '/assets/images/cheesecake_frutosrojos.jpg',
    description:
      'Cheesecake horneado súper cremoso sobre base crocante de galletitas a la manteca, cubierto con salsa artesanal de frambuesas, moras y arándanos.',
    allergens: 'Contiene: Harina de trigo, manteca, queso crema, lácteos y huevos.',
    available: true,
    variants: [
      { name: 'Mediana (20 cm · 10 a 12 porciones)', price: 23000 },
      { name: 'Grande (24 cm · 14 a 16 porciones)', price: 30000 }
    ]
  }
];

export const CATEGORY_LABELS = {
  cookies: 'Cookies',
  rellenas: 'Cookies Rellenas',
  tortas: 'Tortas Clásicas',
  salados: 'Chipá & Scones',
  boxes: 'Boxes & Regalos'
};

export const CATEGORY_FILTERS = [
  { id: 'all', name: 'Toda la Carta', icon: 'fa-solid fa-layer-group' },
  { id: 'cookies', name: 'Cookies', icon: 'fa-solid fa-cookie' },
  { id: 'rellenas', name: 'Cookies Rellenas', icon: 'fa-solid fa-cookie-bite' },
  { id: 'tortas', name: 'Tortas Clásicas', icon: 'fa-solid fa-cake-candles' },
  { id: 'salados', name: 'Chipá & Scones', icon: 'fa-solid fa-cheese' },
  { id: 'boxes', name: 'Boxes & Regalos', icon: 'fa-solid fa-gift' }
];

export const DEFAULT_PRODUCT_IMG = '/assets/images/hero_cookies.jpg';

export const BOX_SPECS = {
  box4: {
    name: 'Box x4 Cookies',
    units: 4,
    maxFlavors: 2,
    ringClass: 'ring-16',
    shortLabel: 'x4',
    tiers: {
      clasicas: { price: 11000, label: 'Clásicas' },
      rellenas: { price: 13500, label: 'Rellenas' }
    }
  },
  box6: {
    name: 'Box x6 Cookies',
    units: 6,
    maxFlavors: 3,
    ringClass: 'ring-22',
    shortLabel: 'x6',
    badge: 'Más Elegida',
    tiers: {
      clasicas: { price: 15500, label: 'Clásicas' },
      rellenas: { price: 19500, label: 'Rellenas' }
    }
  },
  box12: {
    name: 'Box x12 Cookies',
    units: 12,
    maxFlavors: 4,
    ringClass: 'ring-26',
    shortLabel: 'x12',
    tiers: {
      clasicas: { price: 29000, label: 'Clásicas' },
      rellenas: { price: 37000, label: 'Rellenas' }
    }
  }
};

export const BOX_EXTRAS = [
  { value: 'Sin extra', label: 'Solo cookies', desc: 'Sin agregados', icon: 'fa-solid fa-cookie-bite', price: 0 },
  { value: 'Chipá 1/4 kg', label: '+ Chipá', desc: '1/4 kg · +$4.800', icon: 'fa-solid fa-cheese', price: 4800 },
  { value: 'Scones x6', label: '+ Scones', desc: 'x6 de queso · +$3.800', icon: 'fa-solid fa-bread-slice', price: 3800 }
];

export const BOX_FLAVORS = [
  { name: 'Chips de chocolate', icon: 'fa-solid fa-cookie' },
  { name: 'Triple chocolate', icon: 'fa-solid fa-layer-group' },
  { name: 'Red velvet', icon: 'fa-solid fa-heart' },
  { name: 'Dulce de leche', icon: 'fa-solid fa-spoon' },
  { name: 'Nutella', icon: 'fa-solid fa-droplet' },
  { name: 'Oreo', icon: 'fa-solid fa-circle-half-stroke' },
  { name: 'Pistacho', icon: 'fa-solid fa-seedling' },
  { name: 'Chocolate blanco', icon: 'fa-regular fa-snowflake' },
  { name: 'Limón', icon: 'fa-solid fa-lemon' }
];

export const FEATURED_HERO_SLIDES = [
  {
    image: '/assets/images/hero_cookies.jpg',
    caption: 'Cookies chunky que se derriten',
    alt: 'Pila de cookies artesanales con chocolate derretido'
  },
  {
    image: '/assets/images/cookies_rellenas.jpg',
    caption: 'Cookies rellenas de dulce de leche y Nutella',
    alt: 'Cookie rellena partida al medio'
  },
  {
    image: '/assets/images/chipa.jpg',
    caption: 'Chipá recién horneado',
    alt: 'Chipá recién horneado en canasta'
  },
  {
    image: '/assets/images/box_desayuno.jpg',
    caption: 'Box desayuno & merienda para regalar',
    alt: 'Box de regalo con cookies, chipá y scones'
  }
];

export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);
}

export function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function localDateInputValue(daysFromToday = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDateForMessage(isoDate) {
  const [year, month, day] = String(isoDate || '').split('-').map(Number);
  if (!year || !month || !day) return isoDate || '';
  const weekday = new Date(year, month - 1, day).toLocaleDateString('es-AR', { weekday: 'long' });
  return `${weekday} ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

export function whatsappUrl(message) {
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
