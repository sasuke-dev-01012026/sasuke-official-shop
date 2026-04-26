// js/components/Header.js

export class Header {
  #router;

  constructor(router) {
    this.#router = router;
  }

  /** Returns the header HTML string */
  render() {
    return `
      <header>
        <div class="logo" id="logo-btn" role="button" tabindex="0">
          <span class="logo-main">Sasuke Official</span>
          <span class="logo-sub">Store</span>
        </div>

        <div class="header-right">
          <nav>
            <button class="nav-btn active" id="nav-gallery">Gallery</button>
            <button class="nav-btn" id="nav-shop">Shop</button>
          </nav>

          <a class="insta-link" href="https://www.instagram.com/sasuke01012026/"
             target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>

          <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
            <svg id="icon-moon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            <svg id="icon-sun" width="15" height="15" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" style="display:none">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1"  x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1"  y1="12" x2="3"  y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
              <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
            </svg>
          </button>
        </div>
      </header>`;
  }

  /** Bind events — call after render() HTML is inserted into the DOM */
  bindEvents() {
    const logo = document.getElementById('logo-btn');
    logo.addEventListener('click',   () => this.#router.showPage('gallery'));
    logo.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.#router.showPage('gallery'); });

    document.getElementById('nav-gallery').addEventListener('click', () => this.#router.showPage('gallery'));
    document.getElementById('nav-shop').addEventListener('click',    () => this.#router.showPage('shop'));

    document.getElementById('footer-nav-gallery').addEventListener('click', () => this.#router.showPage('gallery'));
    document.getElementById('footer-nav-shop').addEventListener('click',    () => this.#router.showPage('shop'));
  }
}
