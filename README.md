# Website Kompetisi Kompetensi Akademik (KKA)

Landing page & sistem pendaftaran untuk Kompetisi Kompetensi Akademik, dibangun dengan **Astro**, HTML, CSS murni, dan Vanilla JavaScript.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:4321` di browser.

## Build untuk Produksi

```bash
npm run build
npm run preview
```

## Menghubungkan Supabase

1. Buat project di [supabase.com](https://supabase.com).
2. Salin `.env.example` menjadi `.env`, lalu isi:
   ```
   PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. Buat tabel `pendaftaran` dan `pesan_kontak` di Supabase sesuai struktur pada `src/lib/supabase.ts`.
4. Aktifkan pemanggilan `daftarPeserta()` di `src/pages/regulasi.astro` dan `kirimPesanKontak()` di `src/components/Contact.astro` (baris yang sudah dikomentari, tinggal di-uncomment dan sesuaikan import-nya).

## Struktur Project

```
src/
  components/   -> Section-section landing page (Navbar, Hero, About, dst.)
  layouts/      -> MainLayout.astro (head, font, navbar, footer)
  pages/        -> Beranda, Tentang, Informasi, Galeri, Regulasi, Kontak
  styles/       -> global.css (design tokens, reset, utility class)
  lib/          -> supabase.ts (konfigurasi & helper backend)
public/
  images/       -> Placeholder gambar (logo, hero, galeri, blog)
```

## Catatan Gambar

Gambar pada folder `public/images` adalah **placeholder** yang dibuat otomatis (bukan hasil salinan dari situs manapun). Ganti dengan foto/logo asli sebelum website dipublikasikan.

## Palet Warna

| Nama       | Hex       |
|------------|-----------|
| Primary    | `#1E3A8A` |
| Secondary  | `#2563EB` |
| Accent     | `#F59E0B` |
| Dark       | `#0F172A` |
| Light      | `#F8FAFC` |
| Gray       | `#64748B` |

Font: **Poppins** (Google Fonts).
