/**
 * BAKERY & CO. · PASTELERÍA DE AUTOR & BAKERY
 * Aplicación Web / Lógica Comercial & Carrito Interactivo
 */

// =============================================================================
// 0. DATOS DEL NEGOCIO (cambiar acá al personalizar la demo para cada pastelería)
// =============================================================================
const BUSINESS_CONFIG = {
  // Número de WhatsApp en formato internacional, solo dígitos (54 9 + área + número)
  whatsappNumber: '5491123456789'
};

// =============================================================================
// 1. BASE DE DATOS DE PRODUCTOS DE LA PASTELERÍA
// =============================================================================
const PRODUCTS_DATA = [
  {
    id: 'torta-velvet',
    name: 'Torta Velvet Frambuesa & Pistacho',
    category: 'tortas',
    basePrice: 18500,
    servings: '10-12 porciones',
    badge: 'Más Pedida · Estrella',
    badgeType: 'chef',
    image: 'assets/images/torta_frambuesa.jpg',
    description: 'Bizcocho húmedo de vainilla bourbon y suave cacao, relleno con compota artesanal de frambuesas silvestres y crema diplomata de pistacho. Decorada con frambuesas frescas y flores comestibles.',
    allergens: 'Contiene: Harina de trigo, huevos de campo, manteca y pistachos.',
    available: true,
    variants: [
      { name: 'Mediana (16cm · 10 a 12 porciones)', price: 18500 },
      { name: 'Grande (22cm · 18 a 22 porciones)', price: 26500 }
    ]
  },
  {
    id: 'cookies-chunky-box',
    name: 'Box New York Cookies Chunky (x6)',
    category: 'cookies',
    basePrice: 11800,
    servings: 'Caja x 6 unidades XL',
    badge: 'El Más Pedido',
    badgeType: 'gold',
    image: 'assets/images/cookies_pack.jpg',
    description: 'Nuestras famosas cookies artesanales gigantes de estilo Manhattan: doradas y crocantes por fuera con centro fudge y fundente. Surtido: Triple Chocolate Belga, Frambuesa & Sal Marina, y Pistacho.',
    allergens: 'Contiene: Manteca pura, chocolate belga 70%, frutos secos y gluten.',
    available: true,
    variants: [
      { name: 'Caja x 6 unidades XL surtidas', price: 11800 },
      { name: 'Caja x 12 unidades XL degustación', price: 21500 }
    ]
  },
  {
    id: 'alfajores-pistacho',
    name: 'Alfajores Sablée de Pistacho & DDL (x6)',
    category: 'alfajores',
    basePrice: 9800,
    servings: 'Caja x 6 unidades',
    badge: 'Creación de Autor',
    badgeType: 'chef',
    image: 'assets/images/alfajores_pistacho.jpg',
    description: 'Masa sablée suave a base de harina de almendras y manteca pura, rellenos con generosa porción de dulce de leche repostero artesanal y bañados en chocolate semi-amargo con pistachos tostados de Sicilia.',
    allergens: 'Contiene: Frutos secos (almendras, pistachos), lácteos, huevos y gluten.',
    available: true,
    variants: [
      { name: 'Caja x 6 unidades artesanales', price: 9800 },
      { name: 'Caja x 12 unidades artesanales', price: 18000 }
    ]
  },
  {
    id: 'sweet-box-delight',
    name: 'Box Sweet Delight · Regalo Boutique',
    category: 'boxes',
    basePrice: 24500,
    servings: 'Ideal para festejo o regalo',
    badge: 'Edición Regalo',
    badgeType: 'gold',
    image: 'assets/images/box_degustacion.jpg',
    description: 'Presentación soñada en caja rígida con lazo de raso y tarjeta para dedicatoria. Incluye: 4 macarons franceses, 2 mini tartas frutales, 4 bocados fudge de brownie belga, y 4 cookies glaseadas.',
    allergens: 'Contiene: Frutos secos, lácteos, huevos y harina de trigo.',
    available: true,
    variants: [
      { name: 'Box Clásico Sweet Delight', price: 24500 },
      { name: 'Box Premium con Mini Espumante', price: 32000 }
    ]
  },
  {
    id: 'croissant-paris',
    name: 'Croissant Francés de Almendras (x2)',
    category: 'facturas',
    basePrice: 6200,
    servings: 'Pack x 2 unidades',
    badge: 'Horneado Diario',
    badgeType: 'chef',
    image: 'assets/images/croissant_paris.jpg',
    description: 'Hojaldre tradicional con 72 capas de manteca pura de campo, relleno con untuosa crema frangipane de almendras y cubierto con almendras fileteadas tostadas y azúcar impalpable.',
    allergens: 'Contiene: Manteca, almendras, huevos y gluten.',
    available: true,
    variants: [
      { name: 'Pack x 2 unidades', price: 6200 },
      { name: 'Pack x 4 unidades', price: 11500 }
    ]
  },
  {
    id: 'cheesecake-frutosrojos',
    name: 'New York Cheesecake Frutos Rojos',
    category: 'tortas',
    basePrice: 17900,
    servings: '8 a 10 porciones',
    badge: 'Clásico Cremoso',
    badgeType: 'chef',
    image: 'assets/images/cheesecake_frutosrojos.jpg',
    description: 'Horneado lento a baño María con queso crema aterciopelado y suave ralladura de cítricos, sobre crujiente base de galletas caseras a la manteca, coronado con coulis espeso de frambuesas y moras.',
    allergens: 'Contiene: Queso crema, lácteos, huevos y gluten.',
    available: true,
    variants: [
      { name: 'Entera (18cm · 8 a 10 porciones)', price: 17900 },
      { name: 'Grande (24cm · 14 a 16 porciones)', price: 24900 }
    ]
  }
];

// =============================================================================
// CONEXIÓN DINÁMICA CON GOOGLE SHEETS & GOOGLE DRIVE
// =============================================================================
const GOOGLE_SHEET_CONFIG = {
  // Enlace conectado a tu Google Sheet
  sheetId: '1MaMit8ozCnofBDDFWgggsAVcoE8fzyPz4XJKferyjMA',
  tabs: ['Tortas', 'Cookies', 'Alfajores', 'Cajas y Regalos', 'Facturas'],
  timeoutMs: 8000
};

const TAB_CATEGORY_MAP = {
  'Tortas': 'tortas',
  'Cookies': 'cookies',
  'Alfajores': 'alfajores',
  'Cajas y Regalos': 'boxes',
  'Facturas': 'facturas',
  'Croissants': 'facturas'
};

// Nombre visible de cada categoría en las tarjetas
const CATEGORY_LABELS = {
  tortas: 'Tortas',
  cookies: 'Cookies',
  alfajores: 'Alfajores',
  boxes: 'Boxes & Regalos',
  facturas: 'Facturas',
  croissants: 'Facturas'
};

const CATEGORY_FALLBACK_IMAGES = {
  cookies: 'assets/images/cookies_pack.jpg',
  alfajores: 'assets/images/alfajores_pistacho.jpg',
  boxes: 'assets/images/box_degustacion.jpg',
  facturas: 'assets/images/croissant_paris.jpg',
  croissants: 'assets/images/croissant_paris.jpg'
};
const DEFAULT_PRODUCT_IMG = 'assets/images/hero_cake_pistachio.jpg';

// Columnas del Sheet: se buscan por título y, si no aparece, por posición
const SHEET_COLUMN_ALIASES = {
  price: ['precio'],
  servings: ['porciones', 'porcion', 'presentacion'],
  description: ['descripcion'],
  allergens: ['alergenos'],
  badge: ['etiqueta'],
  image: ['foto'],
  available: ['disponible', 'stock']
};
const SHEET_DEFAULT_COLUMNS = { name: 0, price: 1, servings: 2, description: 3, allergens: 4, badge: 5, image: 6, available: 7 };

const CATALOG_CACHE_KEY = 'bakery_and_co_catalog_cache';

// Escapa texto que viene del Sheet o del usuario antes de insertarlo como HTML
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Minúsculas y sin tildes, para comparar y buscar
function normalizeText(value) {
  return String(value ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function slugify(value) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Acepta 18500, "18500", "$18.500" o "18,500"
function parsePrice(raw) {
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : 0;
  const digits = String(raw ?? '').replace(/[.,]\d{1,2}$/, '').replace(/\D/g, '');
  return digits ? Number(digits) : 0;
}

function parseAvailability(raw) {
  if (raw === false) return false;
  const value = normalizeText(raw);
  return !['no', 'false', '0', 'sin stock', 'agotado'].includes(value);
}

function getFallbackImage(name, category) {
  const lowerName = normalizeText(name);
  if (lowerName.includes('velvet') || lowerName.includes('frambuesa')) return 'assets/images/torta_frambuesa.jpg';
  if (lowerName.includes('cheesecake')) return 'assets/images/cheesecake_frutosrojos.jpg';
  return CATEGORY_FALLBACK_IMAGES[category] || DEFAULT_PRODUCT_IMG;
}

// Conversor inteligente de URLs compartidas de Google Drive a URLs de imagen directas
function formatGoogleDriveImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('assets/')) return trimmed;

  // Si es enlace de Google Drive, extraemos el ID
  const driveMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    if (fileId.startsWith('EJEMPLO_')) return ''; // Indicador de plantilla
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }
  return /^https?:\/\//i.test(trimmed) ? trimmed : '';
}

// Extractor de Sheet ID en caso de que se pase la URL completa
function extractGoogleSheetId(input) {
  if (!input) return '';
  const match = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : input.trim();
}

function resolveSheetColumns(labels) {
  const columns = { ...SHEET_DEFAULT_COLUMNS };
  Object.entries(SHEET_COLUMN_ALIASES).forEach(([key, aliases]) => {
    const idx = labels.findIndex((label, i) => i > 0 && aliases.some(alias => label.startsWith(alias)));
    if (idx !== -1) columns[key] = idx;
  });
  return columns;
}

async function fetchGoogleSheetTab(sheetId, tabName) {
  const cleanId = extractGoogleSheetId(sheetId);
  const url = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(tabName)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GOOGLE_SHEET_CONFIG.timeoutMs);
  let text;
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    text = await res.text();
  } finally {
    clearTimeout(timer);
  }
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) throw new Error('Formato inválido de Google Sheets');
  const parsed = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
  let rows = parsed.table?.rows || [];
  const cellValue = (row, idx) => {
    const cell = (row.c || [])[idx];
    return (cell && cell.v !== null && cell.v !== undefined) ? cell.v : '';
  };

  // Si Google no detectó la fila de títulos, llega como primera fila de datos
  let labels = (parsed.table?.cols || []).map(col => normalizeText(col.label));
  if (labels.every(label => !label) && rows.length && normalizeText(cellValue(rows[0], 0)).startsWith('producto')) {
    labels = (rows[0].c || []).map((_, i) => normalizeText(cellValue(rows[0], i)));
    rows = rows.slice(1);
  }

  // Si la pestaña no existe, Google devuelve la primera hoja sin avisar: la descartamos
  const headerTab = (labels[0] || '').match(/^producto:\s*(.+)$/);
  if (headerTab && slugify(headerTab[1]) !== slugify(tabName)) {
    throw new Error(`La pestaña "${tabName}" no existe en el Sheet`);
  }

  const columns = resolveSheetColumns(labels);
  const category = TAB_CATEGORY_MAP[tabName] || 'tortas';

  const products = rows.map((row) => {
    const name = String(cellValue(row, columns.name)).trim();
    if (!name) return null;

    const price = parsePrice(cellValue(row, columns.price));
    const servings = String(cellValue(row, columns.servings)).trim();
    const badge = String(cellValue(row, columns.badge)).trim();
    const allergens = String(cellValue(row, columns.allergens)).trim();
    const fallbackImage = getFallbackImage(name, category);
    const lowerBadge = normalizeText(badge);

    return {
      id: `${category}-${slugify(name)}`,
      name,
      category,
      basePrice: price,
      servings: servings || 'Elaboración artesanal',
      badge: badge || null,
      badgeType: lowerBadge.includes('chef') || lowerBadge.includes('estrella') ? 'chef' : 'gold',
      // Fallback para fotos de muestra o enlaces incompletos
      image: formatGoogleDriveImageUrl(String(cellValue(row, columns.image))) || fallbackImage,
      fallbackImage,
      description: String(cellValue(row, columns.description)).trim(),
      allergens: allergens || 'Consultar con el atelier por alérgenos e ingredientes.',
      available: parseAvailability(cellValue(row, columns.available)),
      variants: [
        { name: servings || 'Estándar', price: price }
      ]
    };
  }).filter(Boolean);

  return { sig: parsed.sig, products };
}

function readCatalogCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CATALOG_CACHE_KEY));
    return cached && Array.isArray(cached.products) && cached.products.length ? cached.products : null;
  } catch (err) {
    return null;
  }
}

function replaceCatalog(products) {
  PRODUCTS_DATA.length = 0;
  PRODUCTS_DATA.push(...products);
  syncCartWithCatalog();
}

// Actualiza precio, nombre y foto de lo que ya estaba en la canasta
function syncCartWithCatalog() {
  let changed = false;
  cart.forEach(item => {
    const product = PRODUCTS_DATA.find(p => p.id === item.id);
    if (!product) return;
    const variant = (product.variants || []).find(v => v.name === item.variantName) || (product.variants || [])[0];
    const price = variant ? variant.price : product.basePrice;
    if (item.price !== price || item.name !== product.name || item.image !== product.image) {
      item.price = price;
      item.name = product.name;
      item.image = product.image;
      if (variant) item.variantName = variant.name;
      changed = true;
    }
  });
  if (changed) {
    saveCartToStorage();
    updateCartUI();
  }
}

async function initGoogleSheetsCatalog() {
  const cleanId = extractGoogleSheetId(GOOGLE_SHEET_CONFIG.sheetId);
  if (!cleanId) return;

  // Mientras llega el Sheet mostramos la última carta conocida (o un esqueleto de carga)
  const cachedProducts = readCatalogCache();
  if (cachedProducts) {
    replaceCatalog(cachedProducts);
  } else {
    catalogLoading = true;
  }
  renderCatalog();

  try {
    const tabs = GOOGLE_SHEET_CONFIG.tabs;
    const results = await Promise.allSettled(
      tabs.map(tab => fetchGoogleSheetTab(cleanId, tab))
    );

    const loadedProducts = [];
    const seenSigs = new Set();
    const usedIds = new Set();
    results.forEach((res, i) => {
      if (res.status !== 'fulfilled') {
        console.warn(`[Google Sheets] Pestaña "${tabs[i]}" omitida:`, res.reason?.message || res.reason);
        return;
      }
      const { sig, products } = res.value;
      if (sig && seenSigs.has(sig)) return; // Misma hoja devuelta dos veces
      if (sig) seenSigs.add(sig);
      products.forEach(product => {
        let id = product.id;
        for (let n = 2; usedIds.has(id); n++) id = `${product.id}-${n}`;
        usedIds.add(id);
        loadedProducts.push({ ...product, id });
      });
    });

    if (loadedProducts.length > 0) {
      replaceCatalog(loadedProducts);
      try {
        localStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), products: loadedProducts }));
      } catch (err) { /* sin espacio en el navegador: seguimos sin caché */ }
      console.log(`[Google Sheets] ¡${loadedProducts.length} productos sincronizados con éxito!`);
    }
  } catch (err) {
    console.warn('[Google Sheets] No se pudieron cargar los datos remotos, se mantienen los productos base:', err);
  } finally {
    catalogLoading = false;
    renderCatalog();
  }
}

// =============================================================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// =============================================================================
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'featured';
let catalogLoading = false;

// Carrito cargado de localStorage si existe
let cart = [];
try {
  const storedCart = JSON.parse(localStorage.getItem('bakery_and_co_cart'));
  if (Array.isArray(storedCart)) cart = storedCart;
} catch (err) { /* canasta guardada ilegible: arrancamos vacía */ }

const REWARD_GOAL = 25000; // Monto para desbloquear cookie gratis

// Formato de moneda local (ARS)
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);
}

// Fecha local en formato YYYY-MM-DD (toISOString usa UTC y de noche adelanta un día)
function localDateInputValue(daysFromToday = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// "2026-10-09" -> "viernes 09/10/2026"
function formatDateForMessage(isoDate) {
  const [year, month, day] = String(isoDate || '').split('-').map(Number);
  if (!year || !month || !day) return isoDate || '';
  const weekday = new Date(year, month - 1, day).toLocaleDateString('es-AR', { weekday: 'long' });
  return `${weekday} ${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function whatsappUrl(message) {
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Guardar en Storage
function saveCartToStorage() {
  try {
    localStorage.setItem('bakery_and_co_cart', JSON.stringify(cart));
  } catch (err) {
    console.warn('No se pudo guardar la canasta en el navegador:', err);
  }
}

// =============================================================================
// 3. RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
// =============================================================================
const productsGrid = document.getElementById('productsGrid');
const noResultsState = document.getElementById('noResultsState');

const SKELETON_CARD_HTML = `
  <article class="product-card is-skeleton" aria-hidden="true">
    <div class="product-card-thumb-wrapper skeleton-block"></div>
    <div class="product-card-body">
      <span class="skeleton-line short"></span>
      <span class="skeleton-line title"></span>
      <span class="skeleton-line"></span>
      <span class="skeleton-line medium"></span>
    </div>
  </article>
`;

function renderCatalog() {
  if (!productsGrid) return;

  if (catalogLoading) {
    productsGrid.style.display = 'grid';
    noResultsState.style.display = 'none';
    productsGrid.setAttribute('aria-busy', 'true');
    productsGrid.innerHTML = SKELETON_CARD_HTML.repeat(6);
    return;
  }
  productsGrid.removeAttribute('aria-busy');

  // Filtrado
  const query = normalizeText(currentSearch);
  let filtered = PRODUCTS_DATA.filter(product => {
    const matchesCategory = currentFilter === 'all' ||
                            product.category === currentFilter ||
                            (currentFilter === 'facturas' && product.category === 'croissants') ||
                            (currentFilter === 'croissants' && product.category === 'facturas');
    const matchesQuery = !query ||
                         normalizeText(product.name).includes(query) ||
                         normalizeText(product.description).includes(query) ||
                         normalizeText(CATEGORY_LABELS[product.category]).includes(query);
    return matchesCategory && matchesQuery;
  });

  // Ordenamiento
  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => a.basePrice - b.basePrice);
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => b.basePrice - a.basePrice);
  } else if (currentSort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  }

  // Comprobar si hay resultados
  if (filtered.length === 0) {
    productsGrid.style.display = 'none';
    noResultsState.style.display = 'block';
    return;
  } else {
    productsGrid.style.display = 'grid';
    noResultsState.style.display = 'none';
  }

  // Generar HTML
  productsGrid.innerHTML = filtered.map(product => {
    const isAvailable = product.available !== false;
    const id = escapeHtml(product.id);
    const name = escapeHtml(product.name);
    const hasVariants = product.variants && product.variants.length > 1;
    return `
      <article class="product-card ${isAvailable ? '' : 'is-out-of-stock'}" data-id="${id}">
        <div class="product-card-thumb-wrapper" data-action="quickview" data-id="${id}">
          <img src="${escapeHtml(product.image)}" alt="${name}" class="product-card-img" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-fallback="${escapeHtml(product.fallbackImage || getFallbackImage(product.name, product.category))}">
          ${!isAvailable
            ? `<span class="product-badge out-of-stock"><i class="fa-solid fa-ban"></i> Sin Stock</span>`
            : (product.badge ? `<span class="product-badge ${product.badgeType === 'chef' ? 'chef' : 'gold'}">${escapeHtml(product.badge)}</span>` : '')}
          <button class="product-quick-view-btn" data-action="quickview" data-id="${id}" title="Ver detalles e ingredientes" aria-label="Ver detalles de ${name}">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="product-card-body">
          <div class="product-card-meta">
            <span class="product-category-tag">${escapeHtml(CATEGORY_LABELS[product.category] || product.category)}</span>
            <span class="product-servings-tag"><i class="fa-regular fa-user"></i> ${escapeHtml(product.servings)}</span>
          </div>

          <h3 class="product-card-title" data-action="quickview" data-id="${id}">${name}</h3>
          <p class="product-card-desc">${escapeHtml(product.description)}</p>

          <div class="product-card-footer">
            <div class="product-card-price-box">
              <span class="product-card-price-label">${hasVariants ? 'Desde' : 'Precio'}</span>
              <span class="product-card-price">${product.basePrice > 0 ? formatCurrency(product.basePrice) : 'Consultar'}</span>
            </div>
            ${isAvailable ? `
              <button class="product-add-btn" data-action="${hasVariants ? 'quickview' : 'add-simple'}" data-id="${id}" aria-label="${hasVariants ? 'Elegir presentación de' : 'Agregar'} ${name}">
                <i class="fa-solid fa-plus"></i> <span>${hasVariants ? 'Elegir' : 'Agregar'}</span>
              </button>
            ` : `
              <button class="product-add-btn out-of-stock" disabled title="Producto temporalmente sin stock">
                <i class="fa-solid fa-ban"></i> <span>Sin Stock</span>
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Si una foto de Drive no carga, mostramos la imagen de respaldo de la categoría
document.addEventListener('error', (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || !img.dataset.fallback) return;
  const fallback = img.dataset.fallback;
  delete img.dataset.fallback;
  img.src = fallback;
}, true);

// =============================================================================
// 4. LÓGICA DEL CARRITO DE COMPRAS
// =============================================================================
const cartDrawer = document.getElementById('cartDrawer');
const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
const cartBadge = document.getElementById('cartBadge');
const cartHeaderTotal = document.getElementById('cartHeaderTotal');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartEmptyState = document.getElementById('cartEmptyState');
const cartSubtotalText = document.getElementById('cartSubtotalText');
const cartDiscountRow = document.getElementById('cartDiscountRow');
const cartDiscountText = document.getElementById('cartDiscountText');
const discountCodeLabel = document.getElementById('discountCodeLabel');
const cartTotalText = document.getElementById('cartTotalText');
const cartRewardText = document.getElementById('cartRewardText');
const cartRewardFill = document.getElementById('cartRewardFill');

// Abrir / Cerrar Carrito
function openCart() {
  cartDrawer.classList.add('open');
  cartDrawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Agregar Item al Carrito
function addToCart(productId, variantIndex = 0, quantity = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  if (product.available === false) {
    showToast(`<strong>${escapeHtml(product.name)}</strong> se encuentra actualmente sin stock.`, '<i class="fa-solid fa-ban"></i>');
    return;
  }

  const variant = product.variants ? product.variants[variantIndex] : { name: 'Estándar', price: product.basePrice };
  const cartItemId = `${product.id}-${variant.name.replace(/\s+/g, '_')}`;

  const existingItem = cart.find(item => item.cartItemId === cartItemId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      cartItemId: cartItemId,
      id: product.id,
      name: product.name,
      variantName: variant.name,
      price: variant.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`¡Agregaste <strong>${escapeHtml(product.name)}</strong> a tu canasta!`, '<i class="fa-solid fa-basket-shopping"></i>');
}

// Modificar Cantidad
function updateItemQuantity(cartItemId, delta) {
  const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += delta;
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
    showToast('Producto quitado de la canasta', '<i class="fa-solid fa-trash-can"></i>');
  }

  saveCartToStorage();
  updateCartUI();
}

// Quitar Producto
function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.cartItemId !== cartItemId);
  saveCartToStorage();
  updateCartUI();
  showToast('Producto eliminado', '<i class="fa-solid fa-trash-can"></i>');
}

// Calcular Totales
function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, total, totalItems };
}

// Actualizar Vista del Carrito
function updateCartUI() {
  const { subtotal, total, totalItems } = calculateTotals();

  // Badges y Headers
  if (cartBadge) cartBadge.textContent = totalItems;
  if (cartHeaderTotal) cartHeaderTotal.textContent = formatCurrency(total);
  if (cartDrawerCount) cartDrawerCount.textContent = `${totalItems} producto${totalItems === 1 ? '' : 's'}`;

  // Subtotal & Total Textos
  if (cartSubtotalText) cartSubtotalText.textContent = formatCurrency(subtotal);
  if (cartTotalText) cartTotalText.textContent = formatCurrency(total);

  // Barra de Recompensa
  const cartRewardBar = document.getElementById('cartRewardBar');
  const cartRewardFill = document.getElementById('cartRewardFill');
  const cartRewardText = document.getElementById('cartRewardText');

  if (cartRewardBar && cartRewardFill && cartRewardText) {
    if (subtotal === 0) {
      cartRewardFill.style.width = '0%';
      cartRewardText.textContent = `¡Sumá ${formatCurrency(REWARD_GOAL)} para ganar una Cookie Artesanal de regalo!`;
    } else if (subtotal >= REWARD_GOAL) {
      cartRewardFill.style.width = '100%';
      cartRewardText.innerHTML = `<strong>¡Felicitaciones!</strong> Desbloqueaste una Cookie Artesanal de cortesía.`;
    } else {
      const remaining = REWARD_GOAL - subtotal;
      const percent = Math.min(100, Math.round((subtotal / REWARD_GOAL) * 100));
      cartRewardFill.style.width = `${percent}%`;
      cartRewardText.innerHTML = `¡Sumá <strong>${formatCurrency(remaining)}</strong> más para ganar una Cookie de regalo!`;
    }
  }

  // Renderizar Items en el Drawer
  if (cart.length === 0) {
    cartEmptyState.style.display = 'block';
    const items = cartItemsContainer.querySelectorAll('.cart-item');
    items.forEach(el => el.remove());
  } else {
    cartEmptyState.style.display = 'none';

    // Limpiar items existentes y reconstruir
    const oldItems = cartItemsContainer.querySelectorAll('.cart-item');
    oldItems.forEach(el => el.remove());

    cart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      const itemId = escapeHtml(item.cartItemId);
      itemEl.innerHTML = `
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" class="cart-item-img" referrerpolicy="no-referrer" data-fallback="${DEFAULT_PRODUCT_IMG}">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
          <span class="cart-item-variant">${escapeHtml(item.variantName)}</span>
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button class="qty-btn" data-action="decrease-qty" data-id="${itemId}" aria-label="Disminuir"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" data-action="increase-qty" data-id="${itemId}" aria-label="Aumentar"><i class="fa-solid fa-plus"></i></button>
            </div>
            <span class="cart-item-price">${formatCurrency(item.price * item.quantity)}</span>
          </div>
        </div>
        <button class="cart-item-remove-btn" data-action="remove-item" data-id="${itemId}" title="Eliminar de la canasta" aria-label="Eliminar">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  }
}

// =============================================================================
// 6. QUICK VIEW (MODAL DE DETALLES DEL PRODUCTO)
// =============================================================================
const quickViewModal = document.getElementById('quickViewModal');
const quickViewContent = document.getElementById('quickViewContent');
const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');

let selectedQuickViewVariant = 0;

function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  selectedQuickViewVariant = 0;

  quickViewContent.innerHTML = `
    <div class="quick-view-grid">
      <div>
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" class="qv-image" referrerpolicy="no-referrer" data-fallback="${escapeHtml(product.fallbackImage || getFallbackImage(product.name, product.category))}">
      </div>
      <div class="qv-details">
        <span class="qv-category">${escapeHtml(CATEGORY_LABELS[product.category] || product.category)} · ${escapeHtml(product.servings)}</span>
        <h3 class="qv-title">${escapeHtml(product.name)}</h3>
        <div class="qv-price" id="qvModalPrice">${formatCurrency(product.variants[0].price)}</div>
        <p class="qv-desc">${escapeHtml(product.description)}</p>

        <div class="qv-allergens">
          <strong><i class="fa-solid fa-wheat-awn-circle-exclamation"></i> Información de alérgenos:</strong>
          <p>${escapeHtml(product.allergens)}</p>
        </div>

        ${product.variants.length > 1 ? `
          <div class="qv-variants-label">Elegí la presentación:</div>
          <div class="qv-variants-options" id="qvVariantsList">
            ${product.variants.map((v, i) => `
              <button class="qv-variant-pill ${i === 0 ? 'active' : ''}" data-index="${i}">
                ${escapeHtml(v.name)}
              </button>
            `).join('')}
          </div>
        ` : ''}

        <div style="margin-top: auto; padding-top: 1rem;">
          ${product.available !== false ? `
            <button class="btn btn-primary btn-block" id="qvAddToCartBtn">
              <i class="fa-solid fa-basket-shopping"></i> Agregar a la Canasta
            </button>
          ` : `
            <button class="btn btn-secondary btn-block" disabled style="opacity: 0.65; cursor: not-allowed; background: #e5e7eb; color: #4b5563; border: 1px solid #d1d5db;">
              <i class="fa-solid fa-ban"></i> Sin Stock Disponible
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  // Listener para cambiar de variantes
  const variantPills = quickViewContent.querySelectorAll('.qv-variant-pill');
  variantPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      variantPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedQuickViewVariant = parseInt(pill.dataset.index);
      const newPrice = product.variants[selectedQuickViewVariant].price;
      document.getElementById('qvModalPrice').textContent = formatCurrency(newPrice);
    });
  });

  // Botón agregar al carrito desde el modal (si está disponible)
  const addBtn = quickViewContent.querySelector('#qvAddToCartBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      addToCart(product.id, selectedQuickViewVariant, 1);
      closeQuickView();
      openCart();
    });
  }

  quickViewModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  quickViewModal.classList.remove('open');
  document.body.style.overflow = '';
}

// =============================================================================
// 7. "TU TORTA, A TU MANERA" · CUSTOM CAKE STUDIO INTERACTIVO
// =============================================================================
const customCakeForm = document.getElementById('customCakeForm');
const customCakeEstimatePrice = document.getElementById('customCakeEstimatePrice');
const previewFormatTitle = document.getElementById('previewFormatTitle');
const previewServingsBadge = document.getElementById('previewServingsBadge');
const chipSpongeName = document.getElementById('chipSpongeName');
const chipTierName = document.getElementById('chipTierName');
const chipFillingsText = document.getElementById('chipFillingsText');
const chipPhotoRefNotice = document.getElementById('chipPhotoRefNotice');
const cakeCustomPhrase = document.getElementById('cakeCustomPhrase');
const cakeCustomNotes = document.getElementById('cakeCustomNotes');
const cakeScriptPreview = document.getElementById('cakeScriptPreview');
const cakePhraseOverlay = document.getElementById('cakePhraseOverlay');
const cakeEventDate = document.getElementById('cakeEventDate');
const sendCustomCakeWhatsappBtn = document.getElementById('sendCustomCakeWhatsappBtn');
const addCustomCakeToCartBtn = document.getElementById('addCustomCakeToCartBtn');

// Upload de fotos de referencia
const cakePhotoUpload = document.getElementById('cakePhotoUpload');
const photoDropzone = document.getElementById('photoDropzone');
const attachedPreviewsGrid = document.getElementById('attachedPreviewsGrid');
const customCakePreviewImg = document.getElementById('customCakePreviewImg');
const DEFAULT_CAKE_IMG = 'assets/images/custom_cake_vintage.jpg';

// Fotos subidas en memoria
let uploadedRefPhotos = [];

// Especificaciones exactas de tamaños y porciones (desde Instagram)
const CAKE_SPECS = {
  '16cm': {
    name: 'Torta 16 cm',
    tiers: {
      '2': { servings: '8 a 10 porciones', price: 18500, label: '8 / 10 porciones' },
      '3': { servings: '10 a 12 porciones', price: 21500, label: '10 / 12 porciones' }
    }
  },
  '22cm': {
    name: 'Torta 22 cm',
    tiers: {
      '2': { servings: '25 a 30 porciones', price: 28500, label: '25 / 30 porciones' },
      '3': { servings: '30 a 35 porciones', price: 32500, label: '30 / 35 porciones' }
    }
  },
  '26cm': {
    name: 'Torta 26 cm',
    tiers: {
      '2': { servings: '35 a 40 porciones', price: 38500, label: '35 / 40 porciones' },
      '3': { servings: '40 a 45 porciones', price: 43500, label: '40 / 45 porciones' }
    }
  }
};

function updateCustomCakeStudio() {
  if (!customCakeForm) return;

  // 1. Tamaño y Capas de Relleno (Paso 1)
  const diameterRadio = customCakeForm.querySelector('input[name="cakeDiameter"]:checked') ||
                        customCakeForm.querySelector('input[name="cakeDiameter"]');
  const diameter = diameterRadio ? diameterRadio.value : '16cm';
  const spec = CAKE_SPECS[diameter] || CAKE_SPECS['16cm'];

  // Actualizar labels de porciones en los botones de tier
  const tierLabel2 = document.getElementById('tierServingsLabel2');
  const tierLabel3 = document.getElementById('tierServingsLabel3');
  if (tierLabel2) tierLabel2.textContent = spec.tiers['2'].label;
  if (tierLabel3) tierLabel3.textContent = spec.tiers['3'].label;

  const tierRadio = customCakeForm.querySelector('input[name="cakeFillingsTier"]:checked') ||
                    customCakeForm.querySelector('input[name="cakeFillingsTier"]');
  const tier = tierRadio ? tierRadio.value : '2';
  const maxFillings = parseInt(tier, 10);
  const currentTier = spec.tiers[tier] || spec.tiers['2'];

  // Actualizar indicación en Paso 3
  const fillingStepInstruction = document.getElementById('fillingStepInstruction');
  if (fillingStepInstruction) {
    fillingStepInstruction.textContent = `Seleccioná hasta ${maxFillings} rellenos artesanales:`;
  }

  // 2. Bizcochuelo (Paso 2)
  const spongeRadio = customCakeForm.querySelector('input[name="cakeSponge"]:checked');
  const sponge = spongeRadio ? spongeRadio.value : 'Chocolate';

  // 3. Rellenos (Paso 3)
  const fillingCheckboxes = Array.from(customCakeForm.querySelectorAll('input[name="cakeFillings"]'));
  const checkedBoxes = fillingCheckboxes.filter(cb => cb.checked);

  // Si hay más marcados de lo permitido (por ejemplo, cambió de 3 a 2), desmarcar el excedente
  if (checkedBoxes.length > maxFillings) {
    while (checkedBoxes.length > maxFillings) {
      const removed = checkedBoxes.pop();
      removed.checked = false;
    }
  }

  // Bloquear otros si se alcanzó el límite
  const maxReached = checkedBoxes.length >= maxFillings;
  const warningEl = document.getElementById('fillingsMaxWarning');
  if (warningEl) {
    warningEl.style.display = maxReached ? 'block' : 'none';
  }

  fillingCheckboxes.forEach(cb => {
    const parentCard = cb.closest('.filling-check-card');
    if (!cb.checked && maxReached) {
      if (parentCard) parentCard.classList.add('disabled');
      cb.disabled = true;
    } else {
      if (parentCard) parentCard.classList.remove('disabled');
      cb.disabled = false;
    }
  });

  const selectedFillings = checkedBoxes.map(cb => cb.value);

  // Contador de rellenos
  const fillingsCounterPill = document.getElementById('fillingsCounterPill');
  if (fillingsCounterPill) {
    fillingsCounterPill.textContent = `${selectedFillings.length} / ${maxFillings} elegidos`;
  }

  // 4. Frase y Fecha (Paso 4)
  const phrase = cakeCustomPhrase ? cakeCustomPhrase.value.trim() : '';
  const notes = cakeCustomNotes ? cakeCustomNotes.value.trim() : '';
  const eventDate = cakeEventDate ? cakeEventDate.value : '';

  // Actualizar Tarjeta de Previsualización en Vivo
  if (previewFormatTitle) previewFormatTitle.textContent = spec.name;
  if (previewServingsBadge) previewServingsBadge.textContent = currentTier.servings;
  if (chipSpongeName) chipSpongeName.textContent = `Bizcochuelo ${sponge}`;
  if (chipTierName) chipTierName.textContent = `${tier} Rellenos`;
  if (chipFillingsText) {
    chipFillingsText.textContent = selectedFillings.length > 0 
      ? selectedFillings.join(' + ') 
      : `Sin rellenos (${maxFillings} a elección)`;
  }

  if (chipPhotoRefNotice) {
    chipPhotoRefNotice.style.display = uploadedRefPhotos.length > 0 ? 'inline-flex' : 'none';
  }

  if (customCakeEstimatePrice) {
    customCakeEstimatePrice.textContent = formatCurrency(currentTier.price);
  }

  // Actualizar Frase Caligráfica en Torta
  if (cakeScriptPreview) {
    if (phrase) {
      cakeScriptPreview.textContent = `"${phrase}"`;
      if (cakePhraseOverlay) cakePhraseOverlay.style.display = 'flex';
    } else {
      cakeScriptPreview.textContent = '"Feliz Cumpleaños"';
      if (cakePhraseOverlay) cakePhraseOverlay.style.display = 'flex';
    }
  }

  return {
    diameter: spec.name,
    tier: `${tier} Rellenos`,
    maxFillings,
    servings: currentTier.servings,
    sponge,
    fillings: selectedFillings,
    phrase,
    notes,
    eventDate,
    price: currentTier.price,
    hasUploadedPhoto: uploadedRefPhotos.length > 0,
    previewImgSrc: customCakePreviewImg ? customCakePreviewImg.src : DEFAULT_CAKE_IMG
  };
}

// Configuración de fecha mínima (48hs anticipación)
if (cakeEventDate) {
  cakeEventDate.min = localDateInputValue(2);
  cakeEventDate.value = localDateInputValue(3);
}

// Miniatura liviana de la foto de referencia (la original no entra en localStorage)
function createPhotoThumbnail(dataUrl, size = 160) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      canvas.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = () => resolve('');
    img.src = dataUrl;
  });
}

// Manejo de Fotos de Referencia (Drag, Drop y File Input)
if (cakePhotoUpload) {
  cakePhotoUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = async (event) => {
        const photoData = {
          name: file.name,
          url: event.target.result,
          thumb: await createPhotoThumbnail(event.target.result)
        };
        uploadedRefPhotos.push(photoData);
        renderAttachedPhotos();
        updateCustomCakeStudio();
      };
      reader.readAsDataURL(file);
    });
    // Permite volver a elegir la misma foto después de quitarla
    e.target.value = '';
  });
}

function renderAttachedPhotos() {
  if (!attachedPreviewsGrid) return;

  if (uploadedRefPhotos.length === 0) {
    attachedPreviewsGrid.style.display = 'none';
    attachedPreviewsGrid.innerHTML = '';
    if (customCakePreviewImg) customCakePreviewImg.src = DEFAULT_CAKE_IMG;
    return;
  }

  attachedPreviewsGrid.style.display = 'flex';
  attachedPreviewsGrid.innerHTML = uploadedRefPhotos.map((photo, index) => `
    <div class="attached-preview-thumb">
      <img src="${photo.url}" alt="${escapeHtml(photo.name)}">
      <button type="button" class="btn-remove-thumb" data-photo-index="${index}" aria-label="Eliminar foto">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join('');

  // Actualizar imagen principal del preview con la última o primera subida
  if (customCakePreviewImg && uploadedRefPhotos.length > 0) {
    customCakePreviewImg.src = uploadedRefPhotos[0].url;
  }

  // Listener para botones de eliminar
  const removeBtns = attachedPreviewsGrid.querySelectorAll('.btn-remove-thumb');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.photoIndex, 10);
      uploadedRefPhotos.splice(idx, 1);
      renderAttachedPhotos();
      updateCustomCakeStudio();
    });
  });
}

// Escuchar cambios en vivo del estudio
if (customCakeForm) {
  customCakeForm.addEventListener('change', updateCustomCakeStudio);
}
if (cakeCustomPhrase) {
  cakeCustomPhrase.addEventListener('input', updateCustomCakeStudio);
}
if (cakeCustomNotes) {
  cakeCustomNotes.addEventListener('input', updateCustomCakeStudio);
}

// Enviar Cotización de Torta Personalizada a WhatsApp
if (sendCustomCakeWhatsappBtn) {
  sendCustomCakeWhatsappBtn.addEventListener('click', () => {
    const config = updateCustomCakeStudio() || {};
    
    let message = `*COTIZACIÓN DE TORTA PERSONALIZADA - BAKERY & CO.*\n\n`;
    message += `• *Tamaño:* ${config.diameter || 'Torta 16 cm'} (${config.tier || '2 Rellenos'} · ${config.servings || ''})\n`;
    message += `• *Bizcochuelo:* ${config.sponge || 'Chocolate'}\n`;
    message += `• *Rellenos elegidos:* ${config.fillings && config.fillings.length ? config.fillings.join(', ') : 'A definir con la pastelera'}\n`;
    if (config.phrase) {
      message += `• *Frase en la torta:* "${config.phrase}"\n`;
    }
    if (config.notes) {
      message += `• *Detalles / Temática / Colores:* ${config.notes}\n`;
    }
    if (config.eventDate) {
      message += `• *Fecha solicitada:* ${formatDateForMessage(config.eventDate)}\n`;
    }
    if (config.hasUploadedPhoto) {
      message += `• *Foto de referencia:* Te adjunto la foto de inspiración a continuación en este chat.\n`;
    }
    message += `• *Presupuesto Estimado:* ${formatCurrency(config.price || 18500)}\n\n`;
    message += `¡Hola! Quisiera consultar disponibilidad en el atelier para encargar esta torta personalizada. Muchas gracias.`;

    window.open(whatsappUrl(message), '_blank', 'noopener');
  });
}

// Agregar Torta Personalizada directamente a la Canasta de Compras
if (addCustomCakeToCartBtn) {
  addCustomCakeToCartBtn.addEventListener('click', () => {
    const config = updateCustomCakeStudio() || {};

    const fillingsSummary = config.fillings && config.fillings.length 
      ? config.fillings.join(' + ') 
      : 'Rellenos a coordinar';

    const cartItemId = `custom-cake-${Date.now()}`;
    const customItem = {
      cartItemId: cartItemId,
      id: 'custom-cake-builder',
      name: `${config.diameter} (${config.tier})`,
      variantName: `Bizcochuelo ${config.sponge} · ${fillingsSummary}${config.phrase ? ` · Frase: "${config.phrase}"` : ''}`,
      price: config.price || 18500,
      image: (config.hasUploadedPhoto && uploadedRefPhotos[0] && uploadedRefPhotos[0].thumb) || DEFAULT_CAKE_IMG,
      // Detalles que solo viajan en el mensaje de WhatsApp
      notes: config.notes || '',
      eventDate: config.eventDate || '',
      hasRefPhoto: Boolean(config.hasUploadedPhoto),
      quantity: 1
    };

    cart.push(customItem);
    saveCartToStorage();
    updateCartUI();
    openCart();
    showToast(`¡Torta personalizada agregada a tu canasta!`, '<i class="fa-solid fa-basket-shopping"></i>');
  });
}

// =============================================================================
// 8. CHECKOUT Y ENVÍO DEL PEDIDO A WHATSAPP
// =============================================================================
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const proceedToCheckoutBtn = document.getElementById('proceedToCheckoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutItemCount = document.getElementById('checkoutItemCount');
const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
const orderDateInput = document.getElementById('orderDate');
const shippingFields = document.getElementById('shippingFields');
const orderSuccessModal = document.getElementById('orderSuccessModal');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const successOrderCode = document.getElementById('successOrderCode');
const manualWhatsappLink = document.getElementById('manualWhatsappLink');

// Restringir fecha mínima a mañana
if (orderDateInput) {
  const minDate = localDateInputValue(1);
  orderDateInput.min = minDate;
  orderDateInput.value = minDate;
}

// Mostrar/ocultar campos de dirección según entrega
const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
deliveryRadios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.value === 'shipping') {
      if (shippingFields) shippingFields.style.display = 'block';
      const addr = document.getElementById('custAddress');
      const city = document.getElementById('custCity');
      if (addr) addr.setAttribute('required', 'true');
      if (city) city.setAttribute('required', 'true');
    } else {
      if (shippingFields) shippingFields.style.display = 'none';
      const addr = document.getElementById('custAddress');
      const city = document.getElementById('custCity');
      if (addr) addr.removeAttribute('required');
      if (city) city.removeAttribute('required');
    }
  });
});

function openCheckout() {
  if (cart.length === 0) {
    showToast('Tu canasta está vacía. ¡Agregá una delicia primero!', '<i class="fa-solid fa-circle-exclamation"></i>');
    return;
  }

  const { total, totalItems } = calculateTotals();
  if (checkoutItemCount) checkoutItemCount.textContent = `${totalItems} producto${totalItems === 1 ? '' : 's'}`;
  if (checkoutTotalAmount) checkoutTotalAmount.textContent = formatCurrency(total);

  closeCart();
  if (checkoutModal) checkoutModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  if (checkoutModal) checkoutModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Generación del Mensaje de WhatsApp
if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const deliveryRadioChecked = document.querySelector('input[name="deliveryType"]:checked');
    const deliveryType = deliveryRadioChecked ? deliveryRadioChecked.value : 'pickup';
    const isShipping = deliveryType === 'shipping';
    const address = isShipping ? document.getElementById('custAddress').value.trim() : 'Retiro por Atelier Boutique';
    const city = isShipping ? document.getElementById('custCity').value.trim() : '';
    const reference = isShipping ? document.getElementById('custRef').value.trim() : '';
    
    const date = document.getElementById('orderDate').value;
    const time = document.getElementById('orderTime').value;
    const dedication = document.getElementById('orderDedication').value.trim();
    const paymentRadioChecked = document.querySelector('input[name="paymentMethod"]:checked');
    const payment = paymentRadioChecked ? paymentRadioChecked.value : 'Transferencia Bancaria';

    const { subtotal, total } = calculateTotals();
    const orderCode = `BCO-${Math.floor(1000 + Math.random() * 9000)}`;

    // Armado estructurado del mensaje de WhatsApp
    let waMessage = `*NUEVO PEDIDO - BAKERY & CO.*\n`;
    waMessage += `Orden: #${orderCode}\n\n`;

    waMessage += `*DATOS DEL CLIENTE*\n`;
    waMessage += `• Nombre: ${name}\n`;
    waMessage += `• Tel/WhatsApp: ${phone}\n\n`;

    waMessage += `*PRODUCTOS SELECCIONADOS*\n`;
    cart.forEach(item => {
      waMessage += `• ${item.quantity}x ${item.name} (${item.variantName}) - ${formatCurrency(item.price * item.quantity)}\n`;
      if (item.notes) waMessage += `   Detalles: ${item.notes}\n`;
      if (item.eventDate) waMessage += `   Fecha del evento: ${formatDateForMessage(item.eventDate)}\n`;
      if (item.hasRefPhoto) waMessage += `   Foto de referencia: la adjunto en este chat.\n`;
    });

    if (subtotal >= REWARD_GOAL) {
      waMessage += `• Regalo de cortesía: 1x Cookie Artesanal (Meta de canasta alcanzada)\n`;
    }

    waMessage += `\n*RESUMEN DE PAGO*\n`;
    waMessage += `• *TOTAL FINAL: ${formatCurrency(total)}*\n`;
    waMessage += `• Forma de Pago: ${payment}\n\n`;

    waMessage += `*DETALLES DE ENTREGA*\n`;
    waMessage += `• Método: ${isShipping ? 'Envío a Domicilio' : 'Retiro en Atelier Boutique'}\n`;
    if (isShipping) {
      waMessage += `• Dirección: ${address}\n`;
      if (city) waMessage += `• Barrio/Localidad: ${city}\n`;
      if (reference) waMessage += `• Timbre/Referencia: ${reference}\n`;
    }
    waMessage += `• Fecha solicitada: ${formatDateForMessage(date)}\n`;
    waMessage += `• Franja horaria: ${time}\n\n`;

    if (dedication) {
      waMessage += `*TARJETA / NOTAS ESPECIALES*\n`;
      waMessage += `"${dedication}"\n\n`;
    }

    waMessage += `¡Hola! Acabo de armar mi pedido en la web y quisiera confirmarlo para coordinar el pago. Muchas gracias.`;

    const waUrl = whatsappUrl(waMessage);

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, '_blank', 'noopener');

    // Mostrar modal de éxito
    closeCheckout();
    if (successOrderCode) successOrderCode.textContent = `#${orderCode}`;
    if (manualWhatsappLink) manualWhatsappLink.href = waUrl;
    if (orderSuccessModal) {
      orderSuccessModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    // Vaciar carrito
    cart = [];
    saveCartToStorage();
    updateCartUI();
  });
}

// =============================================================================
// 9. TOAST NOTIFICATIONS
// =============================================================================
const toastContainer = document.getElementById('toastContainer');

function showToast(message, icon = '<i class="fa-solid fa-check"></i>') {
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// =============================================================================
// 10. LISTENERS Y EVENTOS DOM
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartUI();
  updateCustomCakeStudio();
  initGoogleSheetsCatalog();

  // Todos los enlaces de WhatsApp usan el número de BUSINESS_CONFIG
  document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
    link.href = link.href.replace(/wa\.me\/\d+/, `wa.me/${BUSINESS_CONFIG.whatsappNumber}`);
  });

  // Scroll Header Effect
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Resaltar en el menú la sección que se está viendo
  const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const navSections = navLinks
    .map(link => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);
  if ('IntersectionObserver' in window && navSections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navSections.forEach(section => spy.observe(section));
  }

  // Cerrar un modal al hacer clic fuera del cuadro
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('mousedown', (e) => {
      if (e.target !== overlay) return;
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Mobile Navigation Drawer (Off-Canvas)
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // Cart Triggers
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const closeCartDrawerBtn = document.getElementById('closeCartDrawerBtn');
  const btnExploreFromEmpty = document.getElementById('btnExploreFromEmpty');

  if (cartTriggerBtn) cartTriggerBtn.addEventListener('click', openCart);
  if (closeCartDrawerBtn) closeCartDrawerBtn.addEventListener('click', closeCart);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);
  if (btnExploreFromEmpty) {
    btnExploreFromEmpty.addEventListener('click', () => {
      closeCart();
      const catEl = document.getElementById('catalogo');
      if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (proceedToCheckoutBtn) proceedToCheckoutBtn.addEventListener('click', openCheckout);
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
  if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickView);

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      orderSuccessModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Delegación de eventos en Grid de Productos
  if (productsGrid) {
    productsGrid.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-action="add-simple"]');
      const quickViewBtn = e.target.closest('[data-action="quickview"]');

      if (addBtn) {
        const id = addBtn.dataset.id;
        addToCart(id, 0, 1);
        openCart();
      } else if (quickViewBtn) {
        const id = quickViewBtn.dataset.id;
        openQuickView(id);
      }
    });
  }

  // Delegación de eventos en el Carrito Drawer
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const incBtn = e.target.closest('[data-action="increase-qty"]');
      const decBtn = e.target.closest('[data-action="decrease-qty"]');
      const removeBtn = e.target.closest('[data-action="remove-item"]');

      if (incBtn) updateItemQuantity(incBtn.dataset.id, 1);
      if (decBtn) updateItemQuantity(decBtn.dataset.id, -1);
      if (removeBtn) removeFromCart(removeBtn.dataset.id);
    });
  }

  // Filtros de Categoría
  const categoryPills = document.querySelectorAll('.category-pill-card');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderCatalog();
    });
  });

  // Footer Category Links
  const footerCategoryLinks = document.querySelectorAll('.footer-links a[data-filter]');
  footerCategoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.dataset.filter;
      categoryPills.forEach(p => {
        p.classList.toggle('active', p.dataset.filter === filter);
      });
      currentFilter = filter;
      renderCatalog();
    });
  });

  // Buscador de Catálogo
  const catalogSearchInput = document.getElementById('catalogSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      clearSearchBtn.style.display = currentSearch ? 'block' : 'none';
      renderCatalog();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      catalogSearchInput.value = '';
      currentSearch = '';
      clearSearchBtn.style.display = 'none';
      renderCatalog();
    });
  }

  // Reset Filters Button
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      currentSearch = '';
      currentFilter = 'all';
      if (catalogSearchInput) catalogSearchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      categoryPills.forEach(p => p.classList.toggle('active', p.dataset.filter === 'all'));
      renderCatalog();
    });
  }

  // Selector de Ordenamiento
  const catalogSortSelect = document.getElementById('catalogSortSelect');
  if (catalogSortSelect) {
    catalogSortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // =============================================================================
  // 11. SLIDER CONTINUO AUTOMÁTICO DE TORTAS DESTACADAS (HERO)
  // =============================================================================
  const FEATURED_CAKES = [
    {
      image: 'assets/images/hero_cake_pistachio.jpg',
      caption: 'Torta Pistacho & Frutillas Silvestres',
      alt: 'Torta Pistacho & Frutillas Silvestres'
    },
    {
      image: 'assets/images/custom_cake_vintage.jpg',
      caption: 'Torta Celebración Vintage Lambeth con Frase Escrita',
      alt: 'Torta Vintage Lambeth de Autor'
    },
    {
      image: 'assets/images/torta_frambuesa.jpg',
      caption: 'Torta Velvet Frambuesa & Flores Silvestres',
      alt: 'Torta Velvet Frambuesa & Flores'
    },
    {
      image: 'assets/images/cheesecake_frutosrojos.jpg',
      caption: 'New York Baked Cheesecake con Coulis de Moras',
      alt: 'Baked Cheesecake Frutos Rojos'
    }
  ];

  let currentCakeIndex = 0;
  let autoSlideTimer = null;
  const AUTO_SLIDE_INTERVAL_MS = 3500; // Cambio continuo constante cada 3.5 segundos

  const featuredCakeImg = document.getElementById('featuredCakeImg');
  const featuredCakeCaption = document.getElementById('featuredCakeCaption');
  const prevCakeBtn = document.getElementById('prevCakeBtn');
  const nextCakeBtn = document.getElementById('nextCakeBtn');
  const dotBtns = document.querySelectorAll('.dot-btn');
  const heroShowcaseCard = document.getElementById('heroShowcaseCard');

  function updateFeaturedCake(newIndex) {
    if (!featuredCakeImg) return;
    
    currentCakeIndex = (newIndex + FEATURED_CAKES.length) % FEATURED_CAKES.length;
    const cake = FEATURED_CAKES[currentCakeIndex];

    featuredCakeImg.classList.add('fade');
    setTimeout(() => {
      featuredCakeImg.src = cake.image;
      featuredCakeImg.alt = cake.alt;
      if (featuredCakeCaption) featuredCakeCaption.textContent = cake.caption;
      featuredCakeImg.classList.remove('fade');
    }, 180);

    dotBtns.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentCakeIndex);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      updateFeaturedCake(currentCakeIndex + 1);
    }, AUTO_SLIDE_INTERVAL_MS);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  if (prevCakeBtn) {
    prevCakeBtn.addEventListener('click', () => {
      updateFeaturedCake(currentCakeIndex - 1);
      startAutoSlide();
    });
  }
  if (nextCakeBtn) {
    nextCakeBtn.addEventListener('click', () => {
      updateFeaturedCake(currentCakeIndex + 1);
      startAutoSlide();
    });
  }
  dotBtns.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      updateFeaturedCake(idx);
      startAutoSlide();
    });
  });

  // Pausar rotación automática al pasar el mouse y reanudar al salir
  if (heroShowcaseCard) {
    heroShowcaseCard.addEventListener('mouseenter', stopAutoSlide);
    heroShowcaseCard.addEventListener('mouseleave', startAutoSlide);
  }

  // Iniciar rotación continua automática
  startAutoSlide();

  // Miniaturas del Hero (Acceso rápido a categorías)
  const heroPreviewCards = document.querySelectorAll('.previews-cards-row .hero-mini-card');
  heroPreviewCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCategory = card.dataset.category;
      if (targetCategory) {
        currentFilter = targetCategory;
        categoryPills.forEach(p => {
          p.classList.toggle('active', p.dataset.filter === targetCategory);
        });
        renderCatalog();
        const catEl = document.getElementById('catalogo');
        if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Cerrar modales con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeQuickView();
      closeCheckout();
      closeMobileNav();
      if (orderSuccessModal) orderSuccessModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

