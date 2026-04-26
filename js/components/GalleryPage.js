// js/components/GalleryPage.js
import { GALLERY, GALLERY_IMGS, FALLBACK_GALLERY } from '../data/gallery.data.js';

const PER_PAGE = 9;

export class GalleryPage {
  #lightbox;
  #currentFilter = 'all';
  #currentPage = 1;

  constructor(lightbox) {
    this.#lightbox = lightbox;
  }

  /** Returns the static page shell HTML */
  render() {
    return `
      <section class="page active" id="page-gallery">
        <div class="section-hero">
          <p class="hero-label">AI Generated · Anime Art</p>
          <h1 class="hero-title">Visual Collection</h1>
          <p class="hero-sub">One Piece &amp; Anime Universe</p>
        </div>
        <div class="gallery-wrap">
          <div class="filters" id="filter-bar">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="one-piece">One Piece</button>
            <button class="filter-btn" data-filter="naruto">Naruto</button>
            <button class="filter-btn" data-filter="dragonball">Dragonball</button>
            <button class="filter-btn" data-filter="bleach">Bleach</button>
            <button class="filter-btn" data-filter="fairy-tail">Fairy Tail</button>
            <button class="filter-btn" data-filter="other">Other</button>
          </div>
          <div class="gallery-grid" id="gallery-grid"></div>
          <div class="pagination" id="pagination"></div>
        </div>
      </section>`;
  }

  /** Bind filter bar — call after render() HTML is in the DOM */
  bindEvents() {
    document.getElementById('filter-bar').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      this.#currentFilter = btn.dataset.filter;
      this.#currentPage = 1;
      document.querySelectorAll('#filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.renderGrid();
    });
  }

  /** Render skeleton placeholders */
  showSkeleton(count = 6) {
    document.getElementById('gallery-grid').innerHTML =
      Array(count).fill('<div class="skeleton-item"></div>').join('');
  }

  /** Render the gallery grid + pagination */
  renderGrid() {
    const items = this.#filtered();
    const total = Math.ceil(items.length / PER_PAGE);
    const start = (this.#currentPage - 1) * PER_PAGE;
    const pageItems = items.slice(start, start + PER_PAGE);
    const grid = document.getElementById('gallery-grid');

    grid.innerHTML = '';

    if (!pageItems.length) {
      grid.innerHTML = '<div class="empty-state">No items found.</div>';
      this.#renderPagination(0);
      return;
    }

    pageItems.forEach((item, idx) => {
      const src = GALLERY_IMGS[item.id - 1] || FALLBACK_GALLERY(item.id);
      const el = document.createElement('div');
      el.className = 'g-item';
      el.style.animationDelay = (idx * 0.055) + 's';
      el.innerHTML = `
        <img src="${src}" alt="${item.label}" loading="lazy"
             onerror="this.src='${FALLBACK_GALLERY(item.id)}'">
        <div class="g-overlay">
          <div class="g-label">${item.label}</div>
          <div class="g-series">${item.series}</div>
        </div>
        <div class="g-zoom">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
               stroke="rgba(255,255,255,0.9)" stroke-width="2.2" stroke-linecap="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8"  x2="11"    y2="14"/>
            <line x1="8"  y1="11" x2="14"    y2="11"/>
          </svg>
        </div>`;
      el.addEventListener('click', () => this.#lightbox.open(src, item.label, item.series));
      grid.appendChild(el);
    });

    this.#renderPagination(total);
  }

  // --- Private helpers ---

  #filtered() {
    return this.#currentFilter === 'all'
      ? GALLERY
      : GALLERY.filter(i => i.category === this.#currentFilter);
  }

  #renderPagination(total) {
    const container = document.getElementById('pagination');
    container.innerHTML = '';
    if (total <= 1) return;

    const prev = document.createElement('button');
    prev.className = 'pg-arrow';
    prev.innerHTML = '&#8592;';
    prev.disabled = this.#currentPage === 1;
    prev.addEventListener('click', () => this.#goPage(this.#currentPage - 1));
    container.appendChild(prev);

    for (let i = 1; i <= total; i++) {
      const btn = document.createElement('button');
      btn.className = `pg-btn${i === this.#currentPage ? ' active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => this.#goPage(i));
      container.appendChild(btn);
    }

    const next = document.createElement('button');
    next.className = 'pg-arrow';
    next.innerHTML = '&#8594;';
    next.disabled = this.#currentPage === total;
    next.addEventListener('click', () => this.#goPage(this.#currentPage + 1));
    container.appendChild(next);
  }

  #goPage(n) {
    this.#currentPage = n;
    this.renderGrid();
    document.getElementById('gallery-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
