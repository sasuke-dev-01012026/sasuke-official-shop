// js/data/gallery.data.js
// ─── DATA: GALLERY ────────────────────────────────────────────

export const GALLERY = [
  // ONE PIECE
  {
    id: 1,
    label: 'Monkey D. Luffy',
    series: 'One Piece',
    category: 'one-piece',
    imgs: [
  './assets/images/gallery/one_piece/01.jpg',
  './assets/images/gallery/one_piece/02.jpg',
  './assets/images/gallery/one_piece/03.jpg',
  './assets/images/gallery/one_piece/04.png',
  './assets/images/gallery/one_piece/05.png',
  './assets/images/gallery/one_piece/06.png',
],
  },
  // NARUTO
  {
    id: 2,
    label: 'Uzumaki Naruto',
    series: 'Naruto',
    category: 'naruto',
    imgs: [
      './assets/images/gallery/naruto/01.jpg',
      './assets/images/gallery/naruto/02.jpg',
      './assets/images/gallery/naruto/03.jpg',
    ],
  },
  // DRAGONBALL
  {
    id: 3,
    label: 'Son Goku',
    series: 'Dragon Ball',
    category: 'dragonball',
    imgs: [
      './assets/images/gallery/dragonball/01.png',
      './assets/images/gallery/dragonball/02.png',
      './assets/images/gallery/dragonball/03.png',
    ],
  },
  // BLEACH
  {
    id: 4,
    label: 'Kurosaki Ichigo',
    series: 'Bleach',
    category: 'bleach',
    imgs: [
      './assets/images/gallery/bleach/01.png',
      './assets/images/gallery/bleach/02.png',
      './assets/images/gallery/bleach/03.png',
    ],
  },
  // FAIRY TAIL
  {
    id: 5,
    label: 'Natsu Dragneel',
    series: 'Fairy Tail',
    category: 'fairy-tail',
    imgs: [
      './assets/images/gallery/fairy_tail/01.png',
      './assets/images/gallery/fairy_tail/02.png',
      './assets/images/gallery/fairy_tail/03.png',
    ],
  },
  // OTHER
  {
    id: 6,
    label: 'Kamado Tanjiro',
    series: 'Demon Slayer: Kimetsu no Yaiba',
    category: 'other',
    imgs: [
      './assets/images/gallery/other/demon_slayer/01.png',
    ],
  },
  {
    id: 7,
    label: 'Itadori Yuji',
    series: 'Jujutsu Kaisen',
    category: 'other',
    imgs: [
      './assets/images/gallery/other/jujutsu_kaisen/01.png',
    ],
  },
  {
    id: 8,
    label: 'Eren Yeager',
    series: 'Attack on Titan',
    category: 'other',
    imgs: [
      './assets/images/gallery/other/attack_on_titan/01.png',
    ],
  },
];

export const FALLBACK_GALLERY = (id) =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=anime${id}&backgroundColor=1a1a2e,16213e,0f3460&size=600`;

// ─── HELPER ───────────────────────────────────────────────────

/** Selalu kembalikan array gambar, meski hanya 1 gambar */
export const getImgs = (id) =>
  GALLERY.find(i => i.id === id)?.imgs ?? [];

/** Ambil gambar pertama (thumbnail / cover) */
export const getCoverImg = (id) => getImgs(id)[0];
