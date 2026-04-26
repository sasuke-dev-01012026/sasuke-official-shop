// js/components/Lightbox.js

export class Lightbox {
  #el;
  #img;
  #caption;

  /** Returns the lightbox HTML string */
  render() {
    return `
      <div class="lightbox" id="lightbox">
        <div class="lightbox-inner">
          <button class="lb-close" id="lb-close-btn">&#x2715;</button>
          <img id="lb-img" src="" alt="">
          <div class="lb-caption" id="lb-caption"></div>
          <button class="lb-download" id="lb-download-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
        </div>
      </div>`;
  }

  /** Cache DOM refs and bind events — call after render() is in the DOM */
  bindEvents() {
    this.#el      = document.getElementById('lightbox');
    this.#img     = document.getElementById('lb-img');
    this.#caption = document.getElementById('lb-caption');

    this.#el.addEventListener('click', (e) => {
      if (e.target === this.#el) this.close();
    });
    document.getElementById('lb-close-btn').addEventListener('click', () => this.close());
    document.getElementById('lb-download-btn').addEventListener('click', () => this.#download());
  }

  open(src, label, series) {
    this.#img.src             = src;
    this.#img.alt             = label;
    this.#caption.textContent = `${label} · ${series}`;
    this.#el.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.#el?.classList.remove('open');
    document.body.style.overflow = '';
  }

  #download() {
    const src  = this.#img.src;
    const name = (this.#img.alt || 'anime-art').replace(/\s+/g, '-').toLowerCase() + '.jpg';
    try {
      const a = document.createElement('a');
      a.href = src; a.download = name; a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch {
      window.open(src, '_blank', 'noopener');
    }
  }
}
