// js/data/gallery.data.js
// ─── DATA: GALLERY ────────────────────────────────────────────

export const GALLERY = [
  // ONE PIECE
  { id: 1, label: 'Monkey D. Luffy', series: 'One Piece', category: 'one-piece' },
  // NARUTO
  { id: 2, label: 'Uzumaki Naruto', series: 'Naruto', category: 'naruto' },
  // DRAGONBALL
  { id: 3, label: 'Son Goku', series: 'Dragon Ball', category: 'dragonball' },
  // BLEACH
  { id: 4, label: 'Kurosaki Ichigo', series: 'Bleach', category: 'bleach' },
  // FAIRY TAIL
  { id: 5, label: 'Natsu Dragneel', series: 'Fairy Tail', category: 'fairy-tail' },
  // OTHER
  { id: 6, label: 'Kamado Tanjiro', series: 'Demon Slayer: Kimetsu no Yaiba', category: 'other' },
  { id: 7, label: 'Itadori Yuji', series: 'Jujutsu Kaisen', category: 'other' },
  { id: 8, label: 'Eren Yeager', series: 'Attack on Titan', category: 'other' },
];

export const GALLERY_IMGS = [
  [ // Luffy - One Piece (3 gambar)
    './assets/images/gallery/one_piece/01.jpg',
    './assets/images/gallery/one_piece/02.jpg',
    './assets/images/gallery/one_piece/03.jpg',
  ],
  [ // Naruto (3 gambar)
    './assets/images/gallery/naruto/01.jpg',
    './assets/images/gallery/naruto/02.jpg',
    './assets/images/gallery/naruto/03.jpg',
  ],
  [ // Son Goku - Dragon Ball (3 gambar)
    './assets/images/gallery/dragonball/01.png',
    './assets/images/gallery/dragonball/02.png',
    './assets/images/gallery/dragonball/03.png',
  ],
  [ // Kurosaki Ichigo - Bleach (3 gambar)
    './assets/images/gallery/bleach/01.png',
    './assets/images/gallery/bleach/02.png',
    './assets/images/gallery/bleach/03.png',
  ],
  [ // Natsu Dragneel - Fairy Tail (3 gambar)
    './assets/images/gallery/fairy_tail/01.png',
    './assets/images/gallery/fairy_tail/02.png',
    './assets/images/gallery/fairy_tail/03.png',
  ],
  [ // Kamado Tanjiro - Demon Slayer (1 gambar)
    './assets/images/gallery/demon_slayer/01.png',
  ],
  [ // Itadori Yuji - Jujutsu Kaisen (1 gambar)
    './assets/images/gallery/jujutsu_kaisen/01.png',
  ],
  [ // Eren Yeager - Attack on Titan (1 gambar)
    './assets/images/gallery/attack_on_titan/01.png',
  ],
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
