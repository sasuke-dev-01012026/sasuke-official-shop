// js/components/GalleryPage.js
import { GALLERY, FALLBACK_GALLERY, getCoverImg, getImgs } from '../data/gallery.data.js';

const PER_PAGE = 12;

// Daftar anime unik beserta metadata untuk filter level 1
const ANIME_FILTERS = [
  { key: 'all',        label: 'All'        },
  { key: 'one-piece',  label: 'One Piece'  },
  { key: 'naruto',     label: 'Naruto'     },
  { key: 'dragonball', label: 'Dragonball' },
  { key: 'bleach',     label: 'Bleach'     },
  { key: 'fairy-tail', label: 'Fairy Tail' },
  { key: 'other',      label: 'Other'      },
];

export class GalleryPage {
  #lightbox;

  // ─── State ──────────────────────────────────────────────────
  #filterLevel    = 'anime';   // 'anime' | 'char'
  #selectedAnime  = 'all';     // key anime yang sedang aktif
  #selectedChar   = 'all';     // id karakter ('all' = semua)
  #currentPage    = 1;

  constructor(lightbox) {
    this.#lightbox = lightbox;
  }

  // ─── Public: render HTML shell ───────────────────────────────
  render() {
    return `
      <section class="page active" id="page-gallery">
        <div class="section-hero">
          <p class="hero-label">AI Generated · Anime Art</p>
          <h1 class="hero-title">Visual Collection</h1>
          <p class="hero-sub">One Piece &amp; Anime Universe</p>
        </div>
        <div class="gallery-wrap">
          <!-- Single filter bar — isinya berubah sesuai level -->
          <div class="filters" id="filter-bar"></div>

          <div class="gallery-grid" id="gallery-grid"></div>
          <div class="pagination"   id="pagination"></div>
        </div>
      </section>`;
  }

  // ─── Public: bind events setelah render() masuk DOM ─────────
  bindEvents() {
    document.getElementById('filter-bar').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;

      if (action === 'back') {
        // Kembali ke level anime
        this.#goAnimeLevel();

      } else if (action === 'anime') {
        const key = btn.dataset.key;

        if (key === 'all') {
          // "All" → tetap di level anime, tampilkan semua
          this.#selectedAnime = 'all';
          this.#selectedChar  = 'all';
          this.#currentPage   = 1;
          this.#renderFilterBar();
          this.renderGrid();
        } else {
          // Klik salah satu anime → masuk level karakter
          this.#goCharLevel(key);
        }

      } else if (action === 'char') {
        // Filter karakter
        const charId = btn.dataset.char;
        this.#selectedChar = charId;
        this.#currentPage  = 1;
        this.#renderFilterBar();
        this.renderGrid();
      }
    });

    // Render awal
    this.#renderFilterBar();
  }

  // ─── Public: skeleton loading ────────────────────────────────
  showSkeleton(count = 6) {
    document.getElementById('gallery-grid').innerHTML =
      Array(count).fill('<div class="skeleton-item"></div>').join('');
  }

  // ─── Public: render grid + pagination ───────────────────────
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

  // ─── Private: ganti state ke level karakter ─────────────────
  #goCharLevel(animeKey) {
    this.#filterLevel   = 'char';
    this.#selectedAnime = animeKey;
    this.#selectedChar  = 'all';
    this.#currentPage   = 1;
    this.#renderFilterBar();
    this.renderGrid();
  }

  // ─── Private: kembali ke level anime ────────────────────────
  #goAnimeLevel() {
    this.#filterLevel   = 'anime';
    this.#selectedAnime = 'all';
    this.#selectedChar  = 'all';
    this.#currentPage   = 1;
    this.#renderFilterBar();
    this.renderGrid();
  }

  // ─── Private: render tombol filter sesuai level aktif ───────
  #renderFilterBar() {
    const bar = document.getElementById('filter-bar');

    // Tambahkan class transisi sebelum update
    bar.classList.add('filter-transitioning');

    // Delay singkat biar fade-out keliatan, lalu update konten
    setTimeout(() => {
      bar.innerHTML = '';

      if (this.#filterLevel === 'anime') {
        this.#buildAnimeButtons(bar);
      } else {
        this.#buildCharButtons(bar);
      }

      // Fade-in
      bar.classList.remove('filter-transitioning');
    }, 150);
  }

  // ─── Private: tombol-tombol level anime ─────────────────────
  #buildAnimeButtons(bar) {
    ANIME_FILTERS.forEach(({ key, label }) => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (key === this.#selectedAnime ? ' active' : '');
      btn.dataset.action = 'anime';
      btn.dataset.key    = key;
      btn.textContent    = label;
      bar.appendChild(btn);
    });
  }

  // ─── Private: tombol-tombol level karakter ──────────────────
  #buildCharButtons(bar) {
    // Tombol Kembali — paling kiri
    const backBtn = document.createElement('button');
    backBtn.className    = 'filter-btn filter-btn--back';
    backBtn.dataset.action = 'back';
    backBtn.innerHTML    = `
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      Kembali`;
    bar.appendChild(backBtn);

    // Tombol "All" karakter
    const allBtn = document.createElement('button');
    allBtn.className    = 'filter-btn' + (this.#selectedChar === 'all' ? ' active' : '');
    allBtn.dataset.action = 'char';
    allBtn.dataset.char   = 'all';
    allBtn.textContent    = 'All';
    bar.appendChild(allBtn);

    // Karakter dari anime yang dipilih
    const chars = GALLERY.filter(i => i.category === this.#selectedAnime);
    chars.forEach(({ id, label }) => {
      const btn = document.createElement('button');
      btn.className    = 'filter-btn' + (String(id) === this.#selectedChar ? ' active' : '');
      btn.dataset.action = 'char';
      btn.dataset.char   = String(id);
      btn.textContent    = label;
      bar.appendChild(btn);
    });
  }

  // ─── Private: filter data ────────────────────────────────────
  #filtered() {
    const byAnime = this.#selectedAnime === 'all'
      ? GALLERY
      : GALLERY.filter(i => i.category === this.#selectedAnime);

    if (this.#selectedChar === 'all') return byAnime;
    return byAnime.filter(i => String(i.id) === this.#selectedChar);
  }

  // ─── Private: pagination ─────────────────────────────────────
  #renderPagination(total) {
    const container = document.getElementById('pagination');
    container.innerHTML = '';
    if (total <= 1) return;

    const prev = document.createElement('button');
    prev.className = 'pg-arrow';
    prev.innerHTML = '&#8592;';
    prev.disabled  = this.#currentPage === 1;
    prev.addEventListener('click', () => this.#goPage(this.#currentPage - 1));
    container.appendChild(prev);

    for (let i = 1; i <= total; i++) {
      const btn = document.createElement('button');
      btn.className  = `pg-btn${i === this.#currentPage ? ' active' : ''}`;
      btn.textContent = i;
      btn.addEventListener('click', () => this.#goPage(i));
      container.appendChild(btn);
    }

    const next = document.createElement('button');
    next.className = 'pg-arrow';
    next.innerHTML = '&#8594;';
    next.disabled  = this.#currentPage === total;
    next.addEventListener('click', () => this.#goPage(this.#currentPage + 1));
    container.appendChild(next);
  }

  #goPage(n) {
    this.#currentPage = n;
    this.renderGrid();
    document.getElementById('gallery-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
