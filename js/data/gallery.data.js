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
  { id: 5, label: 'Natsu Dragneel', series: 'Fairy Tail', category: 'fairy-tail' },
  // OTHER
  { id: 6, label: 'Tanjiro Kamado', series: 'Demon Slayer', category: 'other' },
];

// Urutan sesuai id di GALLERY (index = id - 1)
// Jika karakter punya lebih dari 1 gambar, gunakan array

export const GALLERY_IMGS = [
  [ // Luffy (3 gambar)
    './assets/images/gallery/one_piece/01.jpg',
    './assets/images/gallery/one_piece/02.jpg',
    './assets/images/gallery/one_piece/03.jpg',
  ],
  [ // Naruto (3 gambar)
    './assets/images/gallery/naruto/01.jpg',
    './assets/images/gallery/naruto/02.jpg',
    './assets/images/gallery/naruto/03.jpg',
  ],
  [ // Dragon Ball (3 gambar)
    './assets/images/gallery/dragonball/01.png',
    './assets/images/gallery/dragonball/02.png',
    './assets/images/gallery/dragonball/03.png',
  ],
  [ // Bleach (3 gambar) ✅ sudah jadi array
    './assets/images/gallery/bleach/01.jpg',
    './assets/images/gallery/bleach/02.jpg',
    './assets/images/gallery/bleach/03.jpg',
  ],
  './assets/images/gallery/fairy_tail/01.png', // Natsu
  './assets/images/gallery/other/01.png',      // Tanjiro
];
export const FALLBACK_GALLERY = (id) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=anime${id}&backgroundColor=1a1a2e,16213e,0f3460&size=600`;

// ─── HELPER ───────────────────────────────────────────────────

/** Selalu kembalikan array gambar, meski hanya 1 gambar */
export const getImgs = (id) => {
  const entry = GALLERY_IMGS[id - 1];
  return Array.isArray(entry) ? entry : [entry];
};

/** Ambil gambar pertama (thumbnail / cover) */
export const getCoverImg = (id) => getImgs(id)[0];
