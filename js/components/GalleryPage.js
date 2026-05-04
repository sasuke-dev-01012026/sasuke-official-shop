// js/components/GalleryPage.js
import { GALLERY, FALLBACK_GALLERY, getCoverImg, getImgs } from '../data/gallery.data.js';

const PER_PAGE = 12;

// Daftar anime filter (urutan tetap)
const ANIME_FILTERS = [
  { value: 'all',        label: 'All'        },
  { value: 'one-piece',  label: 'One Piece'  },
  { value: 'naruto',     label: 'Naruto'     },
  { value: 'dragonball', label: 'Dragonball' },
  { value: 'bleach',     label: 'Bleach'     },
  { value: 'fairy-tail', label: 'Fairy Tail' },
  { value: 'other',      label: 'Other'      },
];

export class GalleryPage {
  #lightbox;

  // 'anime'  → sedang tampil filter anime
  // 'char'   → sedang tampil filter karakter
  #level          = 'anime';
  #currentAnime   = 'all';
  #currentChar    = 'all';
  #currentPage    = 1;

  constructor(lightbox) {
    this.#lightbox = lightbox;
  }

  render() {
    return `
      <section class="page active" id="page-gallery">
        <div class="section-hero">
          <p class="hero-label">AI Generated · Anime Art</p>
          <h1 class="hero-title">Visual Collection</h1>
          <p class="hero-sub">One Piece &amp; Anime Universe</p>
        </div>
        <div class="gallery-wrap">

          <div class="filters-wrap">
            <div class="filter-bar-clip">
              <div class="filter-bar-track" id="filter-bar-track">

                <!-- Panel 0: Anime level -->
                <div class="filter-panel" id="panel-anime">
                  ${ANIME_FILTERS.map(f => `
                    <button class="filter-btn${f.value === 'all' ? ' active' : ''}"
                            data-filter="${f.value}">${f.label}</button>
                  `).join('')}
                </div>

                <!-- Panel 1: Character level (diisi dinamis) -->
                <div class="filter-panel" id="panel-char"></div>

              </div>
            </div>
          </div>

          <div class="gallery-grid" id="gallery-grid"></div>
          <div class="pagination"   id="pagination"></div>
        </div>
      </section>`;
  }

  bindEvents() {
    // Klik anime filter
    document.getElementById('panel-anime').addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const anime = btn.dataset.filter;

      document.querySelectorAll('#panel-anime .filter-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (anime === 'all') {
        this.#level        = 'anime';
        this.#currentAnime = 'all';
        this.#currentChar  = 'all';
        this.#currentPage  = 1;
        this.renderGrid();
        return;
      }

      const chars = this.#charsOf(anime);
      if (chars.length <= 1) {
        // Hanya 1 karakter — langsung filter tanpa masuk level char
        this.#level        = 'anime';
        this.#currentAnime = anime;
        this.#currentChar  = 'all';
        this.#currentPage  = 1;
        this.renderGrid();
        return;
      }

      // Masuk ke level karakter
      this.#currentAnime = anime;
      this.#currentChar  = 'all';
      this.#currentPage  = 1;
      this.#buildCharPanel(anime);
      this.#slideToChar();
      this.renderGrid();
    });

    // Klik char filter (delegasi)
    document.getElementById('panel-char').addEventListener('click', (e) => {
      // Tombol kembali
      if (e.target.closest('.filter-back-btn')) {
        this.#slideToAnime();
        this.#currentAnime = 'all';
        this.#currentChar  = 'all';
        this.#currentPage  = 1;
        document.querySelectorAll('#panel-anime .filter-btn')
          .forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
        this.renderGrid();
        return;
      }

      const btn = e.target.closest('.char-btn');
      if (!btn) return;

      this.#currentChar = btn.dataset.char;
      this.#currentPage = 1;
      document.querySelectorAll('#panel-char .char-btn')
        .forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.renderGrid();
    });
  }

  showSkeleton(count = 6) {
    document.getElementById('gallery-grid').innerHTML =
      Array(count).fill('<div class="skeleton-item"></div>').join('');
  }

  renderGrid() {
    const items = this.#filtered();

    const expanded = items
      .flatMap((item) => getImgs(item.id).map((src, imgIdx) => ({ ...item, src, imgIdx })))
      .sort(() => Math.random() - 0.5);

    const total     = Math.ceil(expanded.length / PER_PAGE);
    const start     = (this.#currentPage - 1) * PER_PAGE;
    const pageItems = expanded.slice(start, start + PER_PAGE);
    const grid      = document.getElementById('gallery-grid');

    grid.innerHTML = '';

    if (!pageItems.length) {
      grid.innerHTML = '<div class="empty-state">No items found.</div>';
      this.#renderPagination(0);
      return;
    }

    pageItems.forEach((item, idx) => {
      const src = item.src || FALLBACK_GALLERY(item.id);
      const el  = document.createElement('div');
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

  // ─── Private helpers ───────────────────────────────────────────

  #charsOf(anime) {
    return GALLERY.filter(i => i.category === anime);
  }

  #buildCharPanel(anime) {
    const panel = document.getElementById('panel-char');
    const chars = this.#charsOf(anime);
    const animeName = ANIME_FILTERS.find(f => f.value === anime)?.label ?? anime;

    panel.innerHTML = `
      <button class="filter-back-btn" aria-label="Kembali ke daftar anime">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <span>${animeName}</span>
      </button>
      <button class="char-btn active" data-char="all">All</button>
      ${chars.map(c => `
        <button class="char-btn" data-char="${c.id}">${c.label}</button>
      `).join('')}
    `;

    panel.scrollLeft = 0;
  }

  #slideToChar() {
    this.#level = 'char';
    document.getElementById('filter-bar-track').classList.add('at-char');
  }

  #slideToAnime() {
    this.#level = 'anime';
    document.getElementById('filter-bar-track').classList.remove('at-char');
  }

  #filtered() {
    const byAnime = this.#currentAnime === 'all'
      ? GALLERY
      : GALLERY.filter(i => i.category === this.#currentAnime);

    if (this.#currentChar === 'all') return byAnime;
    return byAnime.filter(i => String(i.id) === String(this.#currentChar));
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
