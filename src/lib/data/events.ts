export interface RameEvent {
  id: string;
  category: string;
  city: string;
  title: string;
  venue: string;
  price: string;
  date: string;
  dateLabel: string;
  image: string;
  imageAlt: string;
}

export const events: RameEvent[] = [
  {
    id: "nightfall",
    category: "Festival",
    city: "Jakarta",
    title: "Nightfall Festival",
    venue: "GBK Senayan, Jakarta",
    price: "Rp 375.000",
    date: "2026-07-12",
    dateLabel: "12 Jul 2026",
    image: "/assets/events/nightfall-1280.webp",
    imageAlt:
      "Festival musik malam dengan panggung biru ungu dan lautan penonton",
  },
  {
    id: "ruang-suara",
    category: "Musik",
    city: "Jakarta",
    title: "Ruang Suara",
    venue: "Pos Bloc, Jakarta",
    price: "Rp 250.000",
    date: "2026-07-19",
    dateLabel: "19 Jul 2026",
    image: "/assets/events/ruang-suara-1280.webp",
    imageAlt:
      "Penampilan musik indie dengan vokalis dan pencahayaan amber di gedung industrial",
  },
  {
    id: "sunset-sessions",
    category: "Musik",
    city: "Bali",
    title: "Sunset Sessions",
    venue: "Potato Head Beach Club, Bali",
    price: "Rp 325.000",
    date: "2026-07-27",
    dateLabel: "27 Jul 2026",
    image: "/assets/events/sunset-sessions-1280.webp",
    imageAlt: "Sesi musik di tepi pantai Bali saat matahari terbenam",
  },
  {
    id: "creative-playground",
    category: "Workshop",
    city: "Jakarta",
    title: "Creative Playground",
    venue: "M Bloc Space, Jakarta",
    price: "Rp 150.000",
    date: "2026-08-03",
    dateLabel: "3 Agu 2026",
    image: "/assets/events/creative-playground-1280.webp",
    imageAlt:
      "Peserta dewasa melukis bersama dalam workshop seni dengan cahaya alami",
  },
  {
    id: "tawa-tengah-kota",
    category: "Komedi",
    city: "Jakarta",
    title: "Tawa Tengah Kota",
    venue: "Comedy Hub, Jakarta",
    price: "Rp 200.000",
    date: "2026-08-10",
    dateLabel: "10 Agu 2026",
    image: "/assets/events/tawa-tengah-kota-1280.webp",
    imageAlt:
      "Komika tampil di panggung kecil dengan tirai burgundi dan lampu hangat",
  },
  {
    id: "weekend-escape",
    category: "Festival",
    city: "Bogor",
    title: "Weekend Escape",
    venue: "Lido, Bogor",
    price: "Rp 450.000",
    date: "2026-08-24",
    dateLabel: "24 Agu 2026",
    image: "/assets/events/weekend-escape-1280.webp",
    imageAlt:
      "Tenda glamping dan pertemuan teman di kaki perbukitan hijau Bogor",
  },
];

export const categories = [
  "Semua",
  "Musik",
  "Festival",
  "Workshop",
  "Komedi",
] as const;
export const cities = [
  { value: "all", label: "Semua kota" },
  { value: "Jakarta", label: "Jakarta" },
  { value: "Bali", label: "Bali" },
  { value: "Bogor", label: "Bogor" },
] as const;
