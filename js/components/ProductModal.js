// js/components/ProductModal.js

const DEFAULT_DESC =
  'Kaos anime premium dengan bahan katun combed 30s berkualitas tinggi. ' +
  'Print sablon plastisol tahan lama, tidak pudar meski dicuci berulang kali. ' +
  'Tersedia berbagai ukuran S hingga XL.';

export class ProductModal {
  #el;
  #boxEl;
  #seriesEl;
  #nameEl;
  #priceEl;
  #descEl;
  #buyLinkEl;

  // Carousel state
  #carouselImgs = [];
  #carouselIdx  = 0;

  /** Returns the modal HTML string */
  render() {
    return `
      <div class="modal-overlay" id="product-modal">
        <div class="modal-box" id="modal-box">
          <div class="modal-box-inner">
            <button class="modal-close" id="modal-close-btn">&#x2715;</button>
            <div class="modal-img-side">
              <div class="modal-carousel" id="modal-carousel">
                <div class="carousel-track" id="carousel-track"></div>
                <button class="carousel-btn carousel-prev" id="carousel-prev" aria-label="Previous image">&#8592;</button>
                <button class="carousel-btn carousel-next" id="carousel-next" aria-label="Next image">&#8594;</button>
                <div class="carousel-dots" id="carousel-dots"></div>
              </div>
            </div>
            <div class="modal-content-side">
              <div class="modal-content">
                <div class="modal-series" id="modal-series"></div>
                <div class="modal-name"   id="modal-name"></div>
                <div class="modal-desc"   id="modal-desc"></div>
                <div class="modal-price-row">
                  <span class="modal-price" id="modal-price"></span>
                  <a class="btn-buy" id="modal-buy-link" href="#" target="_blank" rel="noopener">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  /** Cache DOM refs and bind events — call after render() is in the DOM */
  bindEvents() {
    this.#el       = document.getElementById('product-modal');
    this.#boxEl    = document.getElementById('modal-box');
    this.#seriesEl = document.getElementById('modal-series');
    this.#nameEl   = document.getElementById('modal-name');
    this.#priceEl  = document.getElementById('modal-price');
    this.#descEl   = document.getElementById('modal-desc');
    this.#buyLinkEl = document.getElementById('modal-buy-link');

    // Backdrop
    this.#el.addEventListener('click', (e) => {
      if (!this.#boxEl.contains(e.target)) this.close();
    });
    document.getElementById('modal-close-btn').addEventListener('click', () => this.close());

    // Carousel nav
    document.getElementById('carousel-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      this.#goCarousel(this.#carouselIdx - 1);
    });
    document.getElementById('carousel-next').addEventListener('click', (e) => {
      e.stopPropagation();
      this.#goCarousel(this.#carouselIdx + 1);
    });

    // Dots
    document.getElementById('carousel-dots').addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) this.#goCarousel(Number(dot.dataset.index));
    });

    // Swipe
    const carousel = document.getElementById('modal-carousel');
    let startX = 0;
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend',   (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) this.#goCarousel(this.#carouselIdx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  open(product) {
    this.#initCarousel(product.imgs || []);
    this.#seriesEl.textContent  = product.seriesLabel;
    this.#nameEl.textContent    = product.name;
    this.#priceEl.textContent   = product.price;
    this.#descEl.textContent    = product.desc || DEFAULT_DESC;
    this.#buyLinkEl.href        = product.link;
    this.#el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.#el?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- Carousel ---

  #initCarousel(imgs) {
    this.#carouselImgs = imgs;
    this.#carouselIdx  = 0;

    const track = document.getElementById('carousel-track');
    const dots  = document.getElementById('carousel-dots');
    const prev  = document.getElementById('carousel-prev');
    const next  = document.getElementById('carousel-next');

    const showNav = imgs.length > 1;
    prev.style.display = showNav ? '' : 'none';
    next.style.display = showNav ? '' : 'none';

    track.style.transition = 'none';
    track.innerHTML = imgs.map((src, i) => `
      <div class="carousel-slide">
        <img src="${src}" alt="Foto produk ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}"
             onerror="this.src='https://placehold.co/600x600/1a1a2e/ffffff?text=Anime+Tee'">
      </div>`).join('');

    dots.innerHTML = imgs.map((_, i) =>
      `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Foto ${i + 1}"></button>`
    ).join('');

    requestAnimationFrame(() => {
      track.style.transition = '';
      this.#updateCarouselUI();
    });
  }

  #goCarousel(index) {
    if (!this.#carouselImgs.length) return;
    this.#carouselIdx =
      ((index % this.#carouselImgs.length) + this.#carouselImgs.length) % this.#carouselImgs.length;
    this.#updateCarouselUI();
  }

  #updateCarouselUI() {
    const track = document.getElementById('carousel-track');
    if (track) track.style.transform = `translateX(-${this.#carouselIdx * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === this.#carouselIdx);
    });
  }
}
