// js/core/Router.js

export class Router {
  #currentPage = 'gallery';

  /** Navigate to a named page ('gallery' | 'shop') */
  showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(`page-${name}`)?.classList.add('active');
    document.getElementById(`nav-${name}`)?.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.#currentPage = name;
    try { localStorage.setItem('so-page', name); } catch (_) {}
  }

  /** Restore last visited page from localStorage — call after DOM is mounted */
  restore() {
    let page = 'gallery';
    try { page = localStorage.getItem('so-page') || 'gallery'; } catch (_) {}
    if (!['gallery', 'shop'].includes(page)) page = 'gallery';
    this.showPage(page);
  }

  get current() { return this.#currentPage; }
}
