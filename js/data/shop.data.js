// js/data/shop.data.js
// ─── DATA: SHOP ───────────────────────────────────────────────

const TSHIRT_COLORS = ['1a1a2e', '16213e', '0f3460', '533483', '2b2d42', '1b4332', '3d405b', '264653'];
export const FALLBACK_SHOP = (id) =>
  `https://placehold.co/600x800/${TSHIRT_COLORS[id % TSHIRT_COLORS.length]}/ffffff?text=Anime+Tee`;

export const SHOP_OP = [
  {
    name: 'Baju Anak Celana Anak Laki Laki & Perempuan Unisex 1-12 Tahun',
    price: 'Rp45.500 – Rp69.900',
    link: 'https://s.shopee.co.id/7KtGMbCI08',
    category: 'kaos',
    desc: 'Beri si kecil semangat keberanian Luffy dengan setelan kaos One Piece eksklusif dari RFT Kids Wear. Desain ikonik "Tanda Persahabatan" di bagian belakang akan membuat penampilan si kecil makin keren dan penuh percaya diri saat bermain.',
    imgs: [
      './assets/images/shop/kaos/01_1.jpeg',
      './assets/images/shop/kaos/01_2.jpeg',
      './assets/images/shop/kaos/01_3.jpeg',
    ],
  },
  {
    name: 'DEATHLESS KAOS | STRAWHAT CREW | HITAM | ONE PIECE SERIES',
    price: 'Rp59.000 – Rp150.000',
    link: 'https://s.shopee.co.id/20rk0ylKVY',
    category: 'kaos',
    desc: 'Bawa semangat seluruh kru Topi Jerami dalam satu tampilan. Kaos ini menampilkan seluruh anggota Mugiwara dengan desain panel warna-warni yang estetik di atas bahan kain hitam pekat. Cocok untuk kamu yang ingin tampil keren tanpa kehilangan identitas sebagai seorang Nakama.',
    imgs: [
      './assets/images/shop/kaos/02_1.jpeg',
      './assets/images/shop/kaos/02_2.jpeg',
      './assets/images/shop/kaos/02_3.jpeg',
    ],
  },
  {
    name: 'DEATHLESS KAOS | MONKEY LUFFY | HITAM | ONE PIECE SERIES',
    price: 'Rp59.000 – Rp150.000',
    link: 'https://s.shopee.co.id/50VLatCgCZ',
    category: 'kaos',
    desc: 'Ini adalah pilihan wajib bagi kamu yang ingin tampil beda. Gaya Luffy yang ikonik di bagian belakang kaos ini siap membuatmu jadi pusat perhatian di tongkrongan.',
    imgs: [
      './assets/images/shop/kaos/03_1.jpeg',
      './assets/images/shop/kaos/03_2.jpeg',
      './assets/images/shop/kaos/03_3.jpeg',
    ],
  },
  {
    name: 'Otsky Kaos Pria Anime One Piece Luffy Cute Black X DT-CP4100 Cotton 24s',
    price: 'Rp95.900 – Rp210.000',
    link: 'https://s.shopee.co.id/3VgXny7vMW',
    category: 'kaos',
    desc: 'Tampil beda dengan sentuhan desain yang informatif dan estetik. Kaos Otsky X DT-CP4100 ini menghadirkan sisi "cute" namun tetap maskulin dari sang kapten, Monkey D. Luffy. Dengan kombinasi teks naratif dan grafis panel, kaos ini bukan sekadar pakaian, tapi sebuah statement bagi kamu penggemar setia One Piece.',
    imgs: [
      './assets/images/shop/kaos/04_1.jpeg',
      './assets/images/shop/kaos/04_2.jpeg',
      './assets/images/shop/kaos/04_3.jpeg',
    ],
  },
];

export const SHOP_NARUTO = [
  {
    name: 'DEATHLESS KAOS | HATAKE | NARUTO SERIES',
    price: 'Rp59.000 – Rp150.000',
    link: 'https://s.shopee.co.id/20rjdy14cp',
    category: 'kaos',
    desc: 'Menggambarkan kekuatan, persahabatan, dan perjalanan tim yang tak terlupakan. Cocok untuk kamu yang hidup dengan semangat ninja.',
    imgs: [
      './assets/images/shop/kaos/05_1.jpeg',
      './assets/images/shop/kaos/05_2.jpeg',
      './assets/images/shop/kaos/05_3.jpeg',
    ],
  },
  {
    name: 'DEATHLESS KAOS | UZUMAKI | NARUTO SERIES',
    price: 'Rp59.000 – Rp150.000',
    link: 'https://s.shopee.co.id/40co2wy04A',
    category: 'kaos',
    desc: 'Terinspirasi dari semangat pantang menyerah. Untuk kalian yang ingin tampil beda tanpa kehilangan karakter. Minimalis, kuat, dan berani.',
    imgs: [
      './assets/images/shop/kaos/06_1.jpeg',
      './assets/images/shop/kaos/06_2.jpeg',
      './assets/images/shop/kaos/06_3.jpeg',
    ],
  },
  {
    name: 'Kaos Oblong Naruto Anak Katun S-XXL',
    price: 'Rp12.999 – Rp22.999',
    link: 'https://s.shopee.co.id/8fOdbfFMZ1',
    category: 'kaos',
    desc: 'Biarkan si kecil tampil keren dengan gaya ninja favoritnya! Lucu, keren, dan siap jadi favorit si kecil. Terinspirasi dari karakter Kakashi Hatake dalam versi chibi yang menggemaskan, bikin anak tampil beda dan percaya diri. Nyaman dipakai, seru dilihat.',
    imgs: [
      './assets/images/shop/kaos/07_1.jpeg',
      './assets/images/shop/kaos/07_2.jpeg',
      './assets/images/shop/kaos/07_3.jpeg',
    ],
  },
  {
    name: 'DEATHLESS KAOS | BARYON | HITAM | NARUTO SERIES',
    price: 'Rp59.000 – Rp150.000',
    link: 'https://s.shopee.co.id/W2vskaOlA',
    category: 'kaos',
    desc: 'Ini bukan sekadar mode, ini pengorbanan. Baryon Mode adalah titik di mana kekuatan mencapai puncaknya, tapi dengan harga yang besar. Kaos ini menangkap momen itu dalam satu desain yang penuh makna. Dipakai bukan cuma untuk gaya, tapi untuk cerita.',
    imgs: [
      './assets/images/shop/kaos/08_1.jpeg',
      './assets/images/shop/kaos/08_2.jpeg',
      './assets/images/shop/kaos/08_3.jpeg',
    ],
  },
];