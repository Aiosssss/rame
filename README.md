# Rame

Website untuk menemukan event, melihat detail acara, dan merencanakan kegiatan berikutnya. Dibangun dengan Next.js 16, React 19, TypeScript strict, dan Tailwind CSS 4.

## Android dan desktop

- **Android/mobile:** layout responsif, navigasi hamburger, daftar event dua kolom, serta interaksi yang mendukung sentuhan. Tinggi hero mengikuti konten agar nyaman pada layar kecil.
- **Desktop:** hero memenuhi layar, navigasi lengkap, daftar event tiga kolom, serta panel Tiket Saya yang terbuka dari kanan.
- Animasi masuk, ilustrasi 3D, pita berjalan, dan interaksi tombol tetap tersedia. Preferensi `prefers-reduced-motion` juga didukung.

## Fitur

- Pencarian event, filter kategori dan kota, serta pagination.
- Detail acara, informasi tiket, dan FAQ interaktif.
- Form creator dengan penyimpanan draf di browser.
- Gambar WebP responsif dan font lokal.

Proyek ini masih berupa frontend. Data event bersifat ilustrasi; pembayaran, akun, dan penerbitan tiket belum terhubung ke layanan backend. Draf creator disimpan melalui `localStorage` pada perangkat yang digunakan.

## Menjalankan secara lokal

Gunakan Node.js 20.9 atau lebih baru dan npm.

```sh
npm ci
npm run dev
```

Buka [http://127.0.0.1:5500](http://127.0.0.1:5500).

Untuk mencoba dari Android pada jaringan Wi-Fi yang sama, jalankan:

```sh
npm run dev -- --hostname 0.0.0.0
```

Kemudian buka `http://IP-LOKAL-KOMPUTER:5500` di browser Android. Gunakan alamat IP komputer pada jaringan tersebut.

## Pemeriksaan dan build

```sh
npm run typecheck
npm run format:check
npm run build
```

Hasil build statis tersedia di `out/` dan dapat dipasang pada hosting statis. Publikasikan seluruh isi folder tersebut, termasuk `_next/` dan `assets/`. Konfigurasi saat ini menggunakan path dari root domain.

## Struktur proyek

| Lokasi                    | Tanggung jawab                                   |
| ------------------------- | ------------------------------------------------ |
| `src/pages`               | Halaman, metadata, dan entry aplikasi Next.js    |
| `src/components/layout`   | Header, navigasi, dan footer                     |
| `src/components/sections` | Hero, pita, tiga langkah, FAQ, dan creator       |
| `src/components/events`   | Kartu, pencarian, kota, kategori, dan pagination |
| `src/components/dialogs`  | Detail event, panel tiket, dan form creator      |
| `src/components/ui`       | Ikon dan elemen antarmuka bersama                |
| `src/hooks`               | State dan lifecycle interaksi                    |
| `src/lib/data`            | Data bertipe dan penyimpanan draf                |
| `src/lib/motion`          | Profil dan pengendali animasi                    |
| `src/styles`              | Stylesheet per fitur dan breakpoint responsif    |
| `public/assets`           | Gambar, font lokal, dan lisensi font             |

Komponen, data, dan logika animasi dipisahkan sesuai tanggung jawabnya. Animasi menggunakan CSS dan Web Animations API tanpa library animasi tambahan. Tailwind diproses melalui PostCSS; Preflight tidak diimpor agar tampilan tetap konsisten. Pertahankan urutan import di `src/styles/globals.css` saat mengubah stylesheet.

Lisensi font tersedia bersama masing-masing font di `public/assets`.
