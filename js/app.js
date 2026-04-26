// js/app.js
// ─── Application Bootstrap ────────────────────────────────────
// Mounts all components into <div id="root"> and wires everything up.

import { ThemeManager } from './core/ThemeManager.js';
import { Router }       from './core/Router.js';
import { Header }       from './components/Header.js';
import { Footer }       from './components/Footer.js';
import { Lightbox }     from './components/Lightbox.js';
import { ProductModal } from './components/ProductModal.js';
import { GalleryPage }  from './components/GalleryPage.js';
import { ShopPage }     from './components/ShopPage.js';

class App {
  #theme;
  #router;
  #header;
  #footer;
  #lightbox;
  #modal;
  #gallery;
  #shop;

  constructor() {
    // 1. Apply saved theme immediately (before render, avoids flash)
    this.#theme = new ThemeManager();

    // 2. Instantiate all components
    this.#lightbox = new Lightbox();
    this.#modal    = new ProductModal();
    this.#gallery  = new GalleryPage(this.#lightbox);
    this.#shop     = new ShopPage(this.#modal);
    this.#router   = new Router();
    this.#header   = new Header(this.#router);
    this.#footer   = new Footer();

    // 3. Mount all HTML into #root in one shot
    document.getElementById('root').innerHTML =
      this.#header.render() +
      `<main>
        ${this.#gallery.render()}
        ${this.#shop.render()}
      </main>` +
      this.#lightbox.render() +
      this.#modal.render() +
      this.#footer.render();

    // 4. Bind all events (DOM is now ready)
    this.#theme.bindEvents();
    this.#header.bindEvents();
    this.#gallery.bindEvents();
    this.#shop.bindEvents();
    this.#lightbox.bindEvents();
    this.#modal.bindEvents();

    // 5. Restore last page
    this.#router.restore();

    // 6. Global keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.#lightbox.close();
        this.#modal.close();
      }
    });

    // 7. Show skeletons then render real content
    this.#gallery.showSkeleton(6);
    this.#shop.showSkeleton('shop-op', 4);
    this.#shop.showSkeleton('shop-naruto', 4);

    requestAnimationFrame(() => {
      this.#gallery.renderGrid();
      this.#shop.filter('all');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new App());
