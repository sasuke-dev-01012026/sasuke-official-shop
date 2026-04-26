// js/core/ThemeManager.js

export class ThemeManager {
  #html = document.documentElement;

  constructor() {
    // Restore saved theme before anything renders (avoids flash)
    let saved = 'dark';
    try { saved = localStorage.getItem('so-theme') || 'dark'; } catch (_) {}
    this.setTheme(saved);
  }

  /** Apply theme and persist — safe to call before toggle button exists */
  setTheme(t) {
    this.#html.setAttribute('data-theme', t);
    // Icon swap (elements may not exist yet during early init)
    const moon = document.getElementById('icon-moon');
    const sun  = document.getElementById('icon-sun');
    if (moon) moon.style.display = t === 'dark'  ? 'block' : 'none';
    if (sun)  sun.style.display  = t === 'light' ? 'block' : 'none';
    try { localStorage.setItem('so-theme', t); } catch (_) {}
  }

  /** Bind toggle button — call after Header HTML is in the DOM */
  bindEvents() {
    document.getElementById('themeToggle').addEventListener('click', () => {
      const next = this.#html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
    });
  }
}
