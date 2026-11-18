export const DEMO_USERS = [
  {
    id: 'usr-admin-1',
    name: 'Renata & Juan',
    email: 'admin@ambrosiabakery.com',
    phone: '3442 600219',
    address: 'Bv. Ricardo Balbín 2067, Concepción del Uruguay',
    password: 'ambrosia2026',
    role: 'admin',
    loyaltyStamps: 8,
    createdAt: '2026-01-10'
  },
  {
    id: 'usr-cust-1',
    name: 'Valentina Rossi',
    email: 'valentina@ejemplo.com',
    phone: '3442 612480',
    address: 'Bv. Yrigoyen 1140, Concepción del Uruguay',
    password: 'cookies123',
    role: 'customer',
    loyaltyStamps: 5,
    createdAt: '2026-08-14'
  },
  {
    id: 'usr-cust-2',
    name: 'Mateo Fernández',
    email: 'mateo@ejemplo.com',
    phone: '3442 548910',
    address: '9 de Julio 785, Concepción del Uruguay',
    password: 'cookies123',
    role: 'customer',
    loyaltyStamps: 3,
    createdAt: '2026-09-22'
  },
  {
    id: 'usr-cust-3',
    name: 'Lucía Pereyra',
    email: 'lucia@ejemplo.com',
    phone: '3442 490321',
    address: 'Rocamora 412, Concepción del Uruguay',
    password: 'cookies123',
    role: 'customer',
    loyaltyStamps: 7,
    createdAt: '2026-10-05'
  }
];

export const ORDER_STATUS_META = {
  pendiente: {
    label: 'Pendiente',
    icon: 'fa-regular fa-clock',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  horneando: {
    label: 'En el horno',
    icon: 'fa-solid fa-fire-burner',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-300'
  },
  listo: {
    label: 'Listo p/ entregar',
    icon: 'fa-solid fa-box-open',
    badgeClass: 'bg-sky-100 text-sky-900 border-sky-300'
  },
  entregado: {
    label: 'Entregado',
    icon: 'fa-solid fa-circle-check',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  cancelado: {
    label: 'Cancelado',
    icon: 'fa-solid fa-ban',
    badgeClass: 'bg-rose-100 text-rose-900 border-rose-300'
  }
};

export const CATEGORY_OPTIONS = [
  { id: 'cookies', label: 'Cookies Clásicas' },
  { id: 'rellenas', label: 'Cookies Rellenas' },
  { id: 'tortas', label: 'Tortas Clásicas' },
  { id: 'salados', label: 'Chipá & Scones' },
  { id: 'boxes', label: 'Boxes & Regalos' }
];

export const PRODUCT_IMAGE_PRESETS = [
  { label: 'Cookies Chips Clásicas', url: '/assets/images/cookies_pack.jpg' },
  { label: 'Cookies Rellenas DDL', url: '/assets/images/cookies_rellenas.jpg' },
  { label: 'Cookies Kinder', url: '/assets/images/real_cookies_kinder.png' },
  { label: 'Box Regalo x4', url: '/assets/images/real_box_x4.png' },
  { label: 'Box Cookies Regalo', url: '/assets/images/box_cookies_regalo.jpg' },
  { label: 'Box Desayuno', url: '/assets/images/box_desayuno.jpg' },
  { label: 'Chipá Recién Horneado', url: '/assets/images/chipa.jpg' },
  { label: 'Scones de Queso', url: '/assets/images/scones.jpg' },
  { label: 'Torta Brownie', url: '/assets/images/torta_brownie.jpg' },
  { label: 'Torta Rogel', url: '/assets/images/torta_rogel.jpg' },
  { label: 'Lemon Pie', url: '/assets/images/lemon_pie.jpg' }
];

export const INITIAL_ORDERS = [
  {
    id: 'AMB-4821',
    customerName: 'Valentina Rossi',
    customerEmail: 'valentina@ejemplo.com',
    customerPhone: '3442 612480',
    deliveryType: 'pickup',
    address: 'Retiro en Bv. Ricardo Balbín 2067',
    deliveryDate: '2026-11-18',
    deliveryTime: 'Tarde (16:00 a 19:30 hs)',
    paymentMethod: 'Mercado Pago',
    status: 'horneando',
    notes: 'Tarjeta con dedicatoria: "¡Feliz cumple Sofi!"',
    total: 19500,
    createdAt: '2026-11-18 10:15',
    items: [
      { name: 'Box x6 Cookies Rellenas', variantName: 'Nutella, DDL, Red Velvet', quantity: 1, price: 19500 }
    ]
  },
  {
    id: 'AMB-4820',
    customerName: 'Mateo Fernández',
    customerEmail: 'mateo@ejemplo.com',
    customerPhone: '3442 548910',
    deliveryType: 'shipping',
    address: '9 de Julio 785, Centro',
    deliveryDate: '2026-11-18',
    deliveryTime: 'Mañana (8:30 a 12:00 hs)',
    paymentMethod: 'Transferencia Bancaria',
    status: 'pendiente',
    notes: 'Tocar timbre 2B.',
    total: 20300,
    createdAt: '2026-11-18 09:42',
    items: [
      { name: 'Cookie Clásica Chips de Chocolate', variantName: 'Caja x 6 unidades', quantity: 1, price: 15500 },
      { name: 'Chipá Recién Horneado', variantName: '1/4 kg', quantity: 1, price: 4800 }
    ]
  },
  {
    id: 'AMB-4819',
    customerName: 'Lucía Pereyra',
    customerEmail: 'lucia@ejemplo.com',
    customerPhone: '3442 490321',
    deliveryType: 'pickup',
    address: 'Retiro en Bv. Ricardo Balbín 2067',
    deliveryDate: '2026-11-18',
    deliveryTime: 'Tarde (16:00 a 19:30 hs)',
    paymentMethod: 'Efectivo',
    status: 'listo',
    notes: '',
    total: 26500,
    createdAt: '2026-11-17 18:20',
    items: [
      { name: 'Torta Rogel Artesanal', variantName: 'Mediana (12 porciones)', quantity: 1, price: 26500 }
    ]
  },
  {
    id: 'AMB-4817',
    customerName: 'Camila Benítez',
    customerEmail: 'camila.b@ejemplo.com',
    customerPhone: '3442 511092',
    deliveryType: 'shipping',
    address: 'Galarza 1320',
    deliveryDate: '2026-11-17',
    deliveryTime: 'Mañana (8:30 a 12:00 hs)',
    paymentMethod: 'Transferencia Bancaria',
    status: 'entregado',
    notes: 'Desayuno sorpresa.',
    total: 24800,
    createdAt: '2026-11-17 08:10',
    items: [
      { name: 'Box Desayuno & Merienda', variantName: 'Completa', quantity: 1, price: 24800 }
    ]
  },
  {
    id: 'AMB-4815',
    customerName: 'Valentina Rossi',
    customerEmail: 'valentina@ejemplo.com',
    customerPhone: '3442 612480',
    deliveryType: 'pickup',
    address: 'Retiro en Bv. Ricardo Balbín 2067',
    deliveryDate: '2026-11-12',
    deliveryTime: 'Tarde (16:00 a 19:30 hs)',
    paymentMethod: 'Mercado Pago',
    status: 'entregado',
    notes: '',
    total: 15500,
    createdAt: '2026-11-12 14:05',
    items: [
      { name: 'Cookie Clásica Chips de Chocolate', variantName: 'Caja x 6 unidades', quantity: 1, price: 15500 }
    ]
  }
];
