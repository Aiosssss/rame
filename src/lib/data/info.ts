export const info = {
  privacy: [
    "Kebijakan Privasi",
    "Pencarian dan filter berjalan di perangkat Anda. Draf event disimpan di browser ini dan dapat dihapus melalui pengaturan data situs.",
  ],
  about: [
    "Tentang Rame",
    "Lebih dari tiket. Tempat semua cerita dimulai. Satu tiket, banyak cerita.",
  ],
  contact: [
    "Kontak",
    "Rame masih berupa konsep desain. Informasi kontak belum tersedia.",
  ],
  social: [
    "Temui Rame",
    "Tautan media sosial belum tersedia pada konsep desain ini.",
  ],
} as const;
export type InfoKey = keyof typeof info;
