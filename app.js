/**
 * D-BEAUTY — Catálogo Web & Cotizador WhatsApp
 * Implementación calibrada con la especificación de diseño Impeccable (DESIGN.md)
 */

(function () {
  'use strict';

  // ==========================================
  // ICONOGRAFÍA VECTORIAL CONSISTENTE (SVG)
  // ==========================================
  const ICONS = {
    cart: `<svg class="icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
    whatsapp: `<svg class="icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.2c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.84-3.05-.2-.32a8.212 8.212 0 0 1-1.26-4.41c0-4.57 3.72-8.29 8.29-8.29 2.21 0 4.29.86 5.86 2.42 1.56 1.57 2.42 3.65 2.42 5.86 0 4.58-3.72 8.31-8.3 8.31zm4.55-6.21c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/></svg>`,
    search: `<svg class="icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    star: `<svg class="icon-svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.4-6.2 4.4 2.3-7.1-6.1-4.5h7.6z"/></svg>`,
    info: `<svg class="icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
  };

  // ==========================================
  // ESTADO GLOBAL DE LA APLICACIÓN
  // ==========================================
  const state = {
    catalog: null,
    products: [],
    filteredProducts: [],
    categories: [],
    marcas: [],
    config: {},

    activeCategory: 'all',
    searchQuery: '',
    selectedBrand: 'all',
    selectedStock: 'all',
    selectedSort: 'destacados',

    cart: [],
    clientType: 'menudeo',
    customerName: '',
    customerLocation: ''
  };

  // ==========================================
  // SELECTORES DEL DOM
  // ==========================================
  const DOM = {
    announcementText: document.getElementById('announcementText'),
    brandName: document.getElementById('brandName'),
    brandTagline: document.getElementById('brandTagline'),
    headerWaBtn: document.getElementById('headerWaBtn'),
    floatingWaBtn: document.getElementById('floatingWaBtn'),
    cartCountBadge: document.getElementById('cartCountBadge'),
    totalCountBadge: document.getElementById('totalCountBadge'),
    openCartBtn: document.getElementById('openCartBtn'),

    categoriesNav: document.getElementById('categoriesNav'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    brandSelect: document.getElementById('brandSelect'),
    stockSelect: document.getElementById('stockSelect'),
    sortSelect: document.getElementById('sortSelect'),
    resultsCountText: document.getElementById('resultsCountText'),
    productsGrid: document.getElementById('productsGrid'),
    emptyState: document.getElementById('emptyState'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),

    productModal: document.getElementById('productModal'),
    modalProductDetails: document.getElementById('modalProductDetails'),
    closeModalBtn: document.getElementById('closeModalBtn'),

    cartDrawer: document.getElementById('cartDrawer'),
    cartBackdrop: document.getElementById('cartBackdrop'),
    closeCartBtn: document.getElementById('closeCartBtn'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartFooter: document.getElementById('cartFooter'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartWholesaleNote: document.getElementById('cartWholesaleNote'),
    radioMenudeo: document.getElementById('radioMenudeo'),
    radioMayoreo: document.getElementById('radioMayoreo'),
    cartCustomerName: document.getElementById('cartCustomerName'),
    cartCustomerLocation: document.getElementById('cartCustomerLocation'),
    sendWhatsAppOrderBtn: document.getElementById('sendWhatsAppOrderBtn'),
    clearCartBtn: document.getElementById('clearCartBtn'),

    toastContainer: document.getElementById('toastContainer'),
    footerDesc: document.getElementById('footerDesc'),
    footerPolicyLocal: document.getElementById('footerPolicyLocal'),
    footerPolicyNational: document.getElementById('footerPolicyNational'),
    footerHours: document.getElementById('footerHours'),
    footerLocation: document.getElementById('footerLocation')
  };

  // ==========================================
  // INICIALIZACIÓN
  // ==========================================
  async function init() {
    loadSavedCart();
    await loadCatalogData();
    setupEventListeners();
    applyFilters();
  }

  // ==========================================
  // CARGA DE DATOS
  // ==========================================
  async function loadCatalogData() {
    try {
      if (window.__CATALOG_DATA__ && window.__CATALOG_DATA__.productos) {
        state.catalog = window.__CATALOG_DATA__;
      } else {
        const response = await fetch('data/catalog.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo data/catalog.json');
        state.catalog = await response.json();
      }

      state.products = state.catalog.productos || [];
      state.categories = state.catalog.categorias || [];
      state.marcas = state.catalog.marcas || [];
      state.config = state.catalog.configuracion || {};

      renderConfig();
      renderCategoriesNav();
      renderBrandsDropdown();
    } catch (err) {
      console.error('Error al inicializar catálogo:', err);
      showToast('No se pudo cargar el catálogo de productos.', 5000);
    }
  }

  function renderConfig() {
    const cfg = state.config;
    if (!cfg) return;

    if (cfg.banner_texto && DOM.announcementText) {
      DOM.announcementText.textContent = cfg.banner_texto;
    }
    if (cfg.nombre_comercial && DOM.brandName) {
      DOM.brandName.textContent = cfg.nombre_comercial;
    }
    if (cfg.eslogan && DOM.brandTagline) {
      DOM.brandTagline.textContent = cfg.eslogan;
    }

    const phone = cfg.telefono_whatsapp || '5215512345678';
    const waBaseUrl = `https://wa.me/${phone}`;

    if (DOM.headerWaBtn) {
      DOM.headerWaBtn.href = `${waBaseUrl}?text=${encodeURIComponent('Hola D-BEAUTY, me gustaría solicitar informes de su catálogo.')}`;
    }
    if (DOM.floatingWaBtn) {
      DOM.floatingWaBtn.href = `${waBaseUrl}?text=${encodeURIComponent('Hola D-BEAUTY, tengo una consulta sobre insumos para salón.')}`;
    }

    if (DOM.footerPolicyLocal && cfg.politica_envio_local) {
      DOM.footerPolicyLocal.innerHTML = `<strong>Local:</strong> ${cfg.politica_envio_local}`;
    }
    if (DOM.footerPolicyNational && cfg.politica_envio_nacional) {
      DOM.footerPolicyNational.innerHTML = `<strong>Nacional:</strong> ${cfg.politica_envio_nacional}`;
    }
    if (DOM.footerHours && cfg.horario_atencion) {
      DOM.footerHours.innerHTML = `<strong>Horario:</strong> ${cfg.horario_atencion}`;
    }
    if (DOM.footerLocation && cfg.direccion_fisica) {
      DOM.footerLocation.innerHTML = `<strong>Cobertura:</strong> ${cfg.direccion_fisica}`;
    }
  }

  function renderCategoriesNav() {
    if (!DOM.categoriesNav) return;

    if (DOM.totalCountBadge) {
      DOM.totalCountBadge.textContent = state.products.length;
    }

    const allBtn = DOM.categoriesNav.querySelector('[data-category="all"]');
    DOM.categoriesNav.innerHTML = '';
    if (allBtn) DOM.categoriesNav.appendChild(allBtn);

    state.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-pill ${state.activeCategory === cat.slug ? 'active' : ''}`;
      btn.dataset.category = cat.slug;
      btn.innerHTML = `${escapeHtml(cat.nombre)} <span class="cat-counter">${cat.total_productos}</span>`;
      btn.addEventListener('click', () => {
        state.activeCategory = cat.slug;
        updateActiveCategoryUI();
        applyFilters();
      });
      DOM.categoriesNav.appendChild(btn);
    });
  }

  function renderBrandsDropdown() {
    if (!DOM.brandSelect) return;
    DOM.brandSelect.innerHTML = '<option value="all">Todas las marcas</option>';
    state.marcas.forEach(marca => {
      const opt = document.createElement('option');
      opt.value = marca;
      opt.textContent = marca;
      DOM.brandSelect.appendChild(opt);
    });
  }

  function updateActiveCategoryUI() {
    const pills = DOM.categoriesNav.querySelectorAll('.cat-pill');
    pills.forEach(pill => {
      if (pill.dataset.category === state.activeCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // ==========================================
  // FILTRADO Y ORDENAMIENTO
  // ==========================================
  function applyFilters() {
    let list = [...state.products];

    if (state.activeCategory !== 'all') {
      list = list.filter(p => p.categoria === state.activeCategory);
    }

    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(p => {
        const idMatch = (p.id || '').toLowerCase().includes(q);
        const nameMatch = (p.nombre || '').toLowerCase().includes(q);
        const brandMatch = (p.marca || '').toLowerCase().includes(q);
        const descMatch = (p.descripcion || '').toLowerCase().includes(q);
        return idMatch || nameMatch || brandMatch || descMatch;
      });
    }

    if (state.selectedBrand !== 'all') {
      list = list.filter(p => p.marca === state.selectedBrand);
    }

    if (state.selectedStock !== 'all') {
      list = list.filter(p => (p.estatus || 'disponible') === state.selectedStock);
    }

    if (state.selectedSort === 'destacados') {
      list.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
    } else if (state.selectedSort === 'precio-asc') {
      list.sort((a, b) => (a.precio_menudeo || 0) - (b.precio_menudeo || 0));
    } else if (state.selectedSort === 'precio-desc') {
      list.sort((a, b) => (b.precio_menudeo || 0) - (a.precio_menudeo || 0));
    } else if (state.selectedSort === 'nombre-asc') {
      list.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
    }

    state.filteredProducts = list;
    renderProducts();
  }

  // ==========================================
  // RENDERIZADO DE PRODUCTOS
  // ==========================================
  function renderProducts() {
    const grid = DOM.productsGrid;
    const empty = DOM.emptyState;
    if (!grid) return;

    grid.innerHTML = '';
    const total = state.filteredProducts.length;
    DOM.resultsCountText.textContent = `Mostrando ${total} insumo${total === 1 ? '' : 's'}`;

    if (total === 0) {
      grid.style.display = 'none';
      if (empty) empty.style.display = 'block';
      return;
    }

    grid.style.display = 'grid';
    if (empty) empty.style.display = 'none';

    state.filteredProducts.forEach(prod => {
      const isOutOfStock = (prod.estatus || 'disponible') === 'agotado';
      const card = document.createElement('article');
      card.className = `product-card ${isOutOfStock ? 'is-out-of-stock' : ''}`;

      const placeholderImg = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80';
      const imgSrc = prod.imagen_url || placeholderImg;

      card.innerHTML = `
        <div class="card-img-wrapper" data-action="view-detail">
          <img src="${imgSrc}" alt="${escapeHtml(prod.nombre)}" class="card-img" loading="lazy" onerror="this.src='${placeholderImg}'">
          
          <div class="card-badges">
            ${prod.destacado ? `<span class="badge-featured">${ICONS.star} Destacado</span>` : '<span></span>'}
            <span class="badge-stock ${isOutOfStock ? 'agotado' : 'disponible'}">
              ${isOutOfStock ? 'Agotado (Bajo pedido)' : 'En Existencia'}
            </span>
          </div>
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span class="card-brand">${escapeHtml(prod.marca || 'D-BEAUTY')}</span>
            <span class="card-id">${escapeHtml(prod.id || '')}</span>
          </div>

          <h3 class="card-title" data-action="view-detail" title="${escapeHtml(prod.nombre)}">${escapeHtml(prod.nombre)}</h3>
          <p class="card-desc">${escapeHtml(prod.descripcion || '')}</p>

          <div class="card-pricing">
            <div class="price-menudeo-row">
              <span class="price-amount tabular-nums">$${formatPrice(prod.precio_menudeo)}</span>
              <span class="price-label">MXN menudeo</span>
            </div>
            ${prod.precio_mayoreo_sugerido ? `
              <div class="price-mayoreo-badge tabular-nums">
                Mayoreo aprox: <strong>$${formatPrice(prod.precio_mayoreo_sugerido)}</strong> (desde ${prod.piezas_minimo_mayoreo || 3} pzas)
              </div>
            ` : ''}
          </div>

          <div class="card-actions">
            ${isOutOfStock ? `
              <button class="btn btn-out-of-stock" data-action="ask-whatsapp" title="Consultar reabastecimiento por WhatsApp">
                ${ICONS.whatsapp} <span>Consultar pedido</span>
              </button>
            ` : `
              <button class="btn btn-add-cart" data-action="add-cart">
                ${ICONS.cart} <span>Agregar</span>
              </button>
            `}
            <button class="btn btn-details" data-action="view-detail" title="Ver especificaciones técnicas">
              ${ICONS.search}
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        const targetAction = e.target.closest('[data-action]');
        if (!targetAction) return;

        const action = targetAction.dataset.action;
        if (action === 'view-detail') {
          openProductModal(prod);
        } else if (action === 'add-cart') {
          addToCart(prod, 1);
        } else if (action === 'ask-whatsapp') {
          inquireOutOfStockOnWhatsApp(prod);
        }
      });

      grid.appendChild(card);
    });
  }

  // ==========================================
  // MODAL DE DETALLE DE PRODUCTO
  // ==========================================
  function openProductModal(prod) {
    if (!DOM.modalProductDetails) return;
    const isOutOfStock = (prod.estatus || 'disponible') === 'agotado';
    const placeholderImg = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80';
    const imgSrc = prod.imagen_url || placeholderImg;

    let specsHtml = '';
    if (prod.especificaciones && Array.isArray(prod.especificaciones) && prod.especificaciones.length > 0) {
      specsHtml = `
        <h4 class="modal-desc-title">Especificaciones Técnicas</h4>
        <ul class="modal-specs-list">
          ${prod.especificaciones.map(s => `
            <li>
              <strong>${escapeHtml(s.label || 'Detalle')}:</strong>
              <span>${escapeHtml(s.val || '')}</span>
            </li>
          `).join('')}
        </ul>
      `;
    }

    DOM.modalProductDetails.innerHTML = `
      <div class="modal-grid">
        <div class="modal-img-wrap">
          <img src="${imgSrc}" alt="${escapeHtml(prod.nombre)}" class="modal-img" onerror="this.src='${placeholderImg}'">
        </div>

        <div class="modal-info">
          <div class="modal-meta">
            <span>${escapeHtml(prod.marca || 'D-BEAUTY')}</span>
            <span>•</span>
            <span>Ref: ${escapeHtml(prod.id || '')}</span>
          </div>

          <h2 class="modal-title">${escapeHtml(prod.nombre)}</h2>

          <div class="modal-prices">
            <div class="modal-menudeo-price tabular-nums">$${formatPrice(prod.precio_menudeo)} MXN <small style="font-size:0.8rem; font-weight:normal; color:var(--color-gray);">(Precio menudeo de lista)</small></div>
            ${prod.precio_mayoreo_sugerido ? `
              <div class="modal-mayoreo-info tabular-nums">
                <strong>Precio Mayoreo Sugerido:</strong> $${formatPrice(prod.precio_mayoreo_sugerido)} MXN a partir de ${prod.piezas_minimo_mayoreo || 3} unidades.
              </div>
            ` : ''}
            <div style="margin-top: 8px;">
              <span class="badge-stock ${isOutOfStock ? 'agotado' : 'disponible'}">
                ${isOutOfStock ? 'Agotado temporalmente en bodega' : 'En existencia para entrega inmediata'}
              </span>
            </div>
          </div>

          <h4 class="modal-desc-title">Descripción</h4>
          <p class="modal-desc">${escapeHtml(prod.descripcion || 'Sin descripción disponible.')}</p>

          ${specsHtml}

          <div class="modal-actions">
            ${isOutOfStock ? `
              <button class="btn btn-whatsapp-checkout" id="modalAskWaBtn" style="width:100%;">
                ${ICONS.whatsapp} <span>Consultar disponibilidad / Pedir bajo demanda</span>
              </button>
            ` : `
              <div class="qty-control">
                <button type="button" class="qty-btn" id="modalQtyMinus">-</button>
                <input type="number" class="qty-input tabular-nums" id="modalQtyInput" value="1" min="1" max="99">
                <button type="button" class="qty-btn" id="modalQtyPlus">+</button>
              </div>
              <button class="btn btn-add-cart" id="modalAddToCartBtn" style="flex:1;">
                ${ICONS.cart} Agregar al Cotizador
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    if (!isOutOfStock) {
      const qtyInput = document.getElementById('modalQtyInput');
      document.getElementById('modalQtyMinus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
      document.getElementById('modalQtyPlus').addEventListener('click', () => {
        let val = parseInt(qtyInput.value) || 1;
        qtyInput.value = val + 1;
      });
      document.getElementById('modalAddToCartBtn').addEventListener('click', () => {
        const qty = parseInt(qtyInput.value) || 1;
        addToCart(prod, qty);
        closeProductModal();
      });
    } else {
      const askBtn = document.getElementById('modalAskWaBtn');
      if (askBtn) {
        askBtn.addEventListener('click', () => {
          inquireOutOfStockOnWhatsApp(prod);
        });
      }
    }

    DOM.productModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    DOM.productModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // ==========================================
  // CARRITO / COTIZADOR LOGIC
  // ==========================================
  function addToCart(prod, qty = 1) {
    const existingIndex = state.cart.findIndex(item => item.id === prod.id);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += qty;
    } else {
      state.cart.push({
        id: prod.id,
        nombre: prod.nombre,
        marca: prod.marca,
        precio_menudeo: prod.precio_menudeo || 0,
        precio_mayoreo_sugerido: prod.precio_mayoreo_sugerido || prod.precio_menudeo,
        piezas_minimo_mayoreo: prod.piezas_minimo_mayoreo || 3,
        imagen_url: prod.imagen_url,
        quantity: qty
      });
    }

    saveCart();
    renderCart();
    showToast(`Se agregó "${prod.nombre}" (${qty} pza${qty > 1 ? 's' : ''}) al cotizador.`);
  }

  function removeFromCart(prodId) {
    state.cart = state.cart.filter(item => item.id !== prodId);
    saveCart();
    renderCart();
  }

  function updateItemQty(prodId, delta) {
    const item = state.cart.find(i => i.id === prodId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(prodId);
    } else {
      saveCart();
      renderCart();
    }
  }

  function clearCart() {
    if (state.cart.length === 0) return;
    if (confirm('¿Deseas vaciar todos los artículos de tu cotizador?')) {
      state.cart = [];
      saveCart();
      renderCart();
      showToast('Cotizador vaciado correctamente.');
    }
  }

  function renderCart() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (DOM.cartCountBadge) DOM.cartCountBadge.textContent = count;

    if (!DOM.cartItemsList) return;

    if (state.cart.length === 0) {
      DOM.cartItemsList.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon-wrap">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p><strong>Tu cotizador está vacío</strong></p>
          <small>Explora el catálogo y agrega los insumos que requiere tu salón.</small>
        </div>
      `;
      if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = '$0.00 MXN';
      if (DOM.sendWhatsAppOrderBtn) DOM.sendWhatsAppOrderBtn.disabled = true;
      return;
    }

    if (DOM.sendWhatsAppOrderBtn) DOM.sendWhatsAppOrderBtn.disabled = false;

    DOM.cartItemsList.innerHTML = '';
    let subtotal = 0;

    state.cart.forEach(item => {
      const itemSubtotal = item.precio_menudeo * item.quantity;
      subtotal += itemSubtotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.imagen_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80'}" class="cart-item-img" alt="${escapeHtml(item.nombre)}">
        <div class="cart-item-details">
          <h4 class="cart-item-title" title="${escapeHtml(item.nombre)}">${escapeHtml(item.nombre)}</h4>
          <div class="cart-item-price tabular-nums">$${formatPrice(item.precio_menudeo)} c/u</div>
          
          <div class="cart-item-controls">
            <div class="cart-qty-group">
              <button type="button" class="cart-qty-btn btn-minus" data-id="${item.id}" aria-label="Disminuir">-</button>
              <span class="cart-qty-num tabular-nums">${item.quantity}</span>
              <button type="button" class="cart-qty-btn btn-plus" data-id="${item.id}" aria-label="Aumentar">+</button>
            </div>
            <button type="button" class="cart-item-remove" data-id="${item.id}">Quitar</button>
          </div>
        </div>
      `;

      div.querySelector('.btn-minus').addEventListener('click', () => updateItemQty(item.id, -1));
      div.querySelector('.btn-plus').addEventListener('click', () => updateItemQty(item.id, 1));
      div.querySelector('.cart-item-remove').addEventListener('click', () => removeFromCart(item.id));

      DOM.cartItemsList.appendChild(div);
    });

    if (DOM.cartSubtotal) {
      DOM.cartSubtotal.textContent = `$${formatPrice(subtotal)} MXN`;
    }

    if (DOM.cartWholesaleNote) {
      DOM.cartWholesaleNote.style.display = state.clientType === 'mayoreo' ? 'block' : 'none';
    }
  }

  function openCartDrawer() {
    DOM.cartDrawer.classList.add('open');
    DOM.cartBackdrop.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    DOM.cartDrawer.classList.remove('open');
    DOM.cartBackdrop.style.display = 'none';
    document.body.style.overflow = '';
  }

  // ==========================================
  // GENERADOR DE MENSAJE Y ENLACE DE WHATSAPP
  // ==========================================
  function generateWhatsAppOrderUrl() {
    if (state.cart.length === 0) {
      showToast('Agrega al menos un insumo a tu cotizador.');
      return null;
    }

    const cfg = state.config;
    const phone = cfg.telefono_whatsapp || '5215512345678';

    const customerName = (DOM.cartCustomerName ? DOM.cartCustomerName.value : state.customerName) || 'Salón / Cliente';
    const customerLocation = (DOM.cartCustomerLocation ? DOM.cartCustomerLocation.value : state.customerLocation) || 'Por confirmar';
    const isWholesale = state.clientType === 'mayoreo';

    state.customerName = customerName;
    state.customerLocation = customerLocation;
    saveCustomerData();

    let subtotal = 0;
    const itemsLines = state.cart.map(item => {
      const itemSubtotal = item.precio_menudeo * item.quantity;
      subtotal += itemSubtotal;
      return `• ${item.quantity}x ${item.nombre} (Ref: ${item.id}) - $${formatPrice(item.precio_menudeo)} c/u`;
    }).join('\n');

    const msg = [
      '🌸 *¡Hola D-BEAUTY! Me interesa ordenar/cotizar los siguientes productos:*',
      '--------------------------------------------------',
      itemsLines,
      '--------------------------------------------------',
      `💰 *Total estimado (menudeo):* $${formatPrice(subtotal)} MXN`,
      `🏷️ *Modalidad de compra:* ${isWholesale ? '[x] Dueña de Negocio (Mayoreo) 💼' : '[x] Menudeo / Consumo personal ✨'}`,
      `👤 *Nombre / Salón:* ${customerName}`,
      `📦 *Destino de envío:* ${customerLocation}`,
      '--------------------------------------------------',
      isWholesale
        ? '¿Me podrían confirmar disponibilidad, cotización de mayoreo por volumen y tiempo de entrega? ¡Gracias!'
        : '¿Me podrían confirmar disponibilidad para entrega y opciones de pago? ¡Muchas gracias!'
    ].join('\n');

    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }

  function sendWhatsAppOrder() {
    const url = generateWhatsAppOrderUrl();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  function inquireOutOfStockOnWhatsApp(prod) {
    const phone = state.config.telefono_whatsapp || '5215512345678';
    const msg = [
      `🌸 *¡Hola D-BEAUTY!* Me interesa el siguiente producto que vi en su catálogo como agotado:`,
      `• *${prod.nombre}* (Ref: ${prod.id})`,
      `• Marca: ${prod.marca || 'N/A'}`,
      `• Precio menudeo visto: $${formatPrice(prod.precio_menudeo)} MXN`,
      `¿Tienen fecha estimada de reabastecimiento o lo puedo solicitar bajo pedido especial? ¡Gracias!`
    ].join('\n');

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // ==========================================
  // PERSISTENCIA
  // ==========================================
  function saveCart() {
    try {
      localStorage.setItem('dbeauty_cart', JSON.stringify(state.cart));
    } catch (e) {}
  }

  function loadSavedCart() {
    try {
      const saved = localStorage.getItem('dbeauty_cart');
      if (saved) state.cart = JSON.parse(saved);

      const savedName = localStorage.getItem('dbeauty_cust_name');
      if (savedName && DOM.cartCustomerName) DOM.cartCustomerName.value = savedName;

      const savedLoc = localStorage.getItem('dbeauty_cust_loc');
      if (savedLoc && DOM.cartCustomerLocation) DOM.cartCustomerLocation.value = savedLoc;
    } catch (e) {
      state.cart = [];
    }
  }

  function saveCustomerData() {
    try {
      localStorage.setItem('dbeauty_cust_name', state.customerName);
      localStorage.setItem('dbeauty_cust_loc', state.customerLocation);
    } catch (e) {}
  }

  // ==========================================
  // EVENT LISTENERS GLOBALES
  // ==========================================
  function setupEventListeners() {
    if (DOM.openCartBtn) DOM.openCartBtn.addEventListener('click', openCartDrawer);
    if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener('click', closeCartDrawer);
    if (DOM.cartBackdrop) DOM.cartBackdrop.addEventListener('click', closeCartDrawer);
    if (DOM.clearCartBtn) DOM.clearCartBtn.addEventListener('click', clearCart);
    if (DOM.sendWhatsAppOrderBtn) DOM.sendWhatsAppOrderBtn.addEventListener('click', sendWhatsAppOrder);

    if (DOM.radioMenudeo) {
      DOM.radioMenudeo.addEventListener('change', () => {
        state.clientType = 'menudeo';
        renderCart();
      });
    }
    if (DOM.radioMayoreo) {
      DOM.radioMayoreo.addEventListener('change', () => {
        state.clientType = 'mayoreo';
        renderCart();
      });
    }

    let searchTimer = null;
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        state.searchQuery = val;
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.style.display = val ? 'block' : 'none';
        }
        clearTimeout(searchTimer);
        searchTimer = setTimeout(applyFilters, 180);
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        state.searchQuery = '';
        DOM.clearSearchBtn.style.display = 'none';
        applyFilters();
      });
    }

    if (DOM.brandSelect) {
      DOM.brandSelect.addEventListener('change', (e) => {
        state.selectedBrand = e.target.value;
        applyFilters();
      });
    }
    if (DOM.stockSelect) {
      DOM.stockSelect.addEventListener('change', (e) => {
        state.selectedStock = e.target.value;
        applyFilters();
      });
    }
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        state.selectedSort = e.target.value;
        applyFilters();
      });
    }

    const allCatBtn = DOM.categoriesNav.querySelector('[data-category="all"]');
    if (allCatBtn) {
      allCatBtn.addEventListener('click', () => {
        state.activeCategory = 'all';
        updateActiveCategoryUI();
        applyFilters();
      });
    }

    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.searchQuery = '';
        state.selectedBrand = 'all';
        state.selectedStock = 'all';
        state.selectedSort = 'destacados';

        if (DOM.searchInput) DOM.searchInput.value = '';
        if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = 'none';
        if (DOM.brandSelect) DOM.brandSelect.value = 'all';
        if (DOM.stockSelect) DOM.stockSelect.value = 'all';
        if (DOM.sortSelect) DOM.sortSelect.value = 'destacados';

        updateActiveCategoryUI();
        applyFilters();
      });
    }

    if (DOM.closeModalBtn) DOM.closeModalBtn.addEventListener('click', closeProductModal);
    if (DOM.productModal) {
      DOM.productModal.addEventListener('click', (e) => {
        if (e.target === DOM.productModal) closeProductModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
        closeCartDrawer();
      }
    });
  }

  // ==========================================
  // HELPERS
  // ==========================================
  function formatPrice(num) {
    if (typeof num !== 'number') return '0.00';
    return num.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast(message, duration = 3000) {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${ICONS.info} <span>${escapeHtml(message)}</span>`;

    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.22s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  document.addEventListener('DOMContentLoaded', init);

})();
