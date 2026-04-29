// js/components/ShopPage.js
import { SHOP_OP, SHOP_NARUTO, FALLBACK_SHOP } from '../data/shop.data.js';

export class ShopPage {
  #modal;
  #productStore = {};
  #currentCat = 'all';

  constructor(modal) {
    this.#modal = modal;
  }

  /** Returns the static page shell HTML */
  render() {
    return `
      <section class="page" id="page-shop">
        <div class="section-hero">
          <p class="hero-label">Official Merchandise</p>
          <h1 class="hero-title">Shop</h1>
          <p class="hero-sub">Anime Apparel · Premium Quality</p>
        </div>
        <div class="shop-wrap">
          <div class="filters shop-cat-filters" id="shop-cat-bar">
            <button class="filter-btn active" data-cat="all">Semua</button>
            <button class="filter-btn" data-cat="kaos">Kaos</button>
            <button class="filter-btn" data-cat="kemeja">Jersey</button>
            <button class="filter-btn" data-cat="kemeja">Kemeja</button>
            <button class="filter-btn" data-cat="kolor">Kolor</button>
            <button class="filter-btn" data-cat="casing">Casing HP</button>
            <button class="filter-btn" data-cat="poster">Poster</button>
            <button class="filter-btn" data-cat="gantungan">Gantungan Kunci</button>
          <button class="filter-btn" data-cat="aksesoris">Aksesoris Lainnya</button>
          </div>
          <div class="series-divider" id="divider-op">
            <span class="series-name">One Piece</span>
          </div>
          <div class="shop-grid" id="shop-op"></div>
          <div class="series-divider" id="divider-naruto">
            <span class="series-name">Naruto</span>
          </div>
          <div class="shop-grid" id="shop-naruto"></div>
        </div>
      </section>`;
  }

  /** Bind category bar + grid delegation — call after render() is in the DOM */
  bindEvents() {
    this.#bindCategoryBar();
    this.#bindGridDelegation();
  }

  /** Render skeleton placeholders */
  showSkeleton(containerId, count = 4) {
    document.getElementById(containerId).innerHTML = Array(count).fill(`
      <div class="skeleton-card">
        <div class="sk-img"></div>
        <div class="sk-body">
          <div class="sk-line short"></div>
          <div class="sk-line med"></div>
          <div class="sk-line short"></div>
        </div>
      </div>`).join('');
  }

  /** Render both series grids filtered by category */
  filter(cat = 'all') {
    this.#currentCat = cat;

    const opFiltered = cat === 'all' ? SHOP_OP : SHOP_OP.filter(p => p.category === cat);
    const narutoFiltered = cat === 'all' ? SHOP_NARUTO : SHOP_NARUTO.filter(p => p.category === cat);

    this.#renderGrid('shop-op', opFiltered, 'One Piece');
    this.#renderGrid('shop-naruto', narutoFiltered, 'Naruto');

    document.getElementById('divider-op').style.display = opFiltered.length ? '' : 'none';
    document.getElementById('divider-naruto').style.display = narutoFiltered.length ? '' : 'none';
  }

  // --- Private helpers ---

  #renderGrid(containerId, products, seriesLabel) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';

    if (!products.length) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <div style="font-size:28px;margin-bottom:12px;opacity:0.3">&#x1F6D2;</div>
          <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:6px">Segera Hadir</div>
          <div style="font-size:11px;opacity:0.5">Produk ini sedang dalam persiapan</div>
        </div>`;
      return;
    }

    products.forEach((p, idx) => {
      const imgs = p.imgs?.length ? p.imgs : [];
      const src = imgs[0] || FALLBACK_SHOP(idx);
      const key = `${containerId}-${idx}`;

      this.#productStore[key] = { ...p, src, imgs, seriesLabel };

      const card = document.createElement('div');
      card.className = 'product-card';
      card.dataset.key = key;
      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${src}" alt="${p.name}" loading="lazy"
               onerror="this.src='${FALLBACK_SHOP(idx)}'">
        </div>
        <div class="product-body">
          <div class="product-series">${seriesLabel}</div>
          <div class="product-name">${p.name}</div>
          <span class="product-price">${p.price}</span>
          <div class="product-footer">
            <button class="btn-detail-inline" title="Lihat Detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </button>
            <a class="btn-buy" href="${p.link}" target="_blank" rel="noopener">Shop</a>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  }

  #bindCategoryBar() {
    document.getElementById('shop-cat-bar').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      document.querySelectorAll('#shop-cat-bar .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.filter(btn.dataset.cat);
    });
  }

  #bindGridDelegation() {
    ['shop-op', 'shop-naruto'].forEach(id => {
      document.getElementById(id).addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-detail-inline');
        if (!btn) return;
        const key = btn.closest('.product-card').dataset.key;
        const product = this.#productStore[key];
        if (product) this.#modal.open(product);
      });
    });
  }
}
