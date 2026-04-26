// js/data/gallery.data.js
// ─── DATA: GALLERY ────────────────────────────────────────────

export const GALLERY = [
  // ONE PIECE
  { id: 1, label: 'Monkey D. Luffy', series: 'One Piece', category: 'one-piece' },
  // NARUTO
  { id: 2, label: 'Uzumaki Naruto', series: 'Naruto', category: 'naruto' },
  // DRAGONBALL
  { id: 3, label: 'Goku', series: 'Dragonball', category: 'dragonball' },
  // BLEACH
  { id: 4, label: 'Kurosaki Ichigo', series: 'Bleach', category: 'bleach' },
  // FAIRY TAIL
  { id: 5, label: 'Natstu Dragneel', series: 'Fairy Tail', category: 'fairy-tail' },
  // OTHER
  { id: 6, label: 'Tanjiro Kamado', series: 'Demon Slayer', category: 'other' },
];

// Urutan sesuai id di GALLERY (index = id - 1)
export const GALLERY_IMGS = [
  './assets/images/gallery/one_piece/01.png',      // Luffy
  './assets/images/gallery/naruto/01.png',         // Naruto
  './assets/images/gallery/dragonball/01.png',     // Goku
  './assets/images/gallery/bleach/01.png',         // Ichigo
  './assets/images/gallery/fairy_tail/01.png',     // Natsu
  './assets/images/gallery/other/01.png',          // Tanjiro
];

export const FALLBACK_GALLERY = (id) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=anime${id}&backgroundColor=1a1a2e,16213e,0f3460&size=600`;
