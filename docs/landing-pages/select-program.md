# Rangkuman Konten Halaman: Pemilihan Program (Select Program Page)

- **Path Halaman**: `app/(landing)/select-program/page.tsx`
- **Route URL**: `/select-program`
- **Deskripsi Singkat**: Halaman formulir interaktif multi-langkah (*wizard flow*) yang membimbing calon siswa untuk memilih program belajar, jenjang kelompok, materi silabus, tingkatan level kemampuan, paket kelas, cabang lokasi dan jadwal belajar, peninjauan biaya & promo, hingga pengisian biodata diri.

---

## 1. Page Hero
Header penyambut di awal alur pendaftaran.

- **Headline**:
  > **Mulai Belajar Sekarang!**
- **Deskripsi**:
  > *"Kami ingin kamu belajar sesuai dengan tingkatanmu, cobalah untuk memilih program yang sesuai dengan kebutuhanmu."*

---

## 2. Alur Tahapan Pemilihan Program (Step-by-Step Wizard)

### Tahap 1: Pilih Program Anda (`choose_program`)
- **Judul**: `Pilih Program Anda`
- **Deskripsi**: *"Choose the program category that matches your educational needs."*
- **Pilihan Kategori**:
  1. **School Program**: Ditujukan untuk siswa TK, SD, SMP, hingga SMA.
  2. **Regular / Adults Program**: Ditujukan untuk mahasiswa, profesional, dan dewasa umum.
- **Label Tombol Kartu**: *"Pilih program"* / *"Kamu pilih program ini!"*

---

### Tahap 2: Pilih Jenjang / Peminatan (`choose_group`)
- **Judul**: `Pilih Jenjang / Peminatan Anda`
- **Pilihan Berdasarkan Program**:
  - **Jika Memilih School Program**:
    - `Kindergarten` (Taman Kanak-Kanak / TK)
    - `Elementary School` (Sekolah Dasar / SD)
    - `Junior High School` (Sekolah Menengah Pertama / SMP)
    - `Senior High School` (Sekolah Menengah Atas / SMA)
  - **Jika Memilih Regular Program**:
    - `Grammar Program`
    - `Speaking Program`
    - `TOEFL Preparation`

---

### Tahap 3: Informasi Kelas & Kurikulum (`group_information`)
- **Judul**: `Informasi Kelas - [Nama Jenjang/Kelompok]`
- **Deskripsi**: *"Learn about the curriculum and expected outcomes for your selected program."*
- **Tab Interaktif**:
  1. **Tab Materi Pembelajaran**: Rincian silabus topik bahasa Inggris yang akan dipelajari sesuai kelompok usia dan standar kurikulum Cambridge.
  2. **Tab Capaian Pembelajaran**: Sasaran kompetensi (*learning outcomes*) yang diharapkan dikuasai siswa setelah menyelesaikan program.
- **Tombol Lanjut**: **"Lanjutkan ke Pemilihan Level"**

---

### Tahap 4: Pilih Level Anda (`choose_level`)
- **Judul**: `Pilih Level Anda`
- **Deskripsi**: *"Pilih tingkat yang paling sesuai dengan kemampuan dan pengetahuan Anda saat ini."*
- **Pilihan Level**: Mengelompokkan siswa berdasarkan tingkatan kemampuan atau hasil placement test (misal: Starter, New Star, Level 1–4, CEFR Pre-A1 hingga C1).

---

### Tahap 5: Pilih Paket Anda (`choose_package`)
- **Judul**: `Pilih Paket Anda`
- **Deskripsi**: *"Pilih paket yang paling sesuai dengan kebutuhan Anda."*
- **3 Pilihan Paket Belajar & Rincian Fasilitas**:

| Fitur / Kriteria | Semi Private | Private | Exclusive |
| :--- | :--- | :--- | :--- |
| **Jumlah Murid** | 5–10 orang per kelas | 2 orang per kelas | 1 orang (Privat 1-on-1) |
| **Fokus Belajar** | Dinamis mengikuti kurikulum, diskusi grup kecil | Fokus penuh ke kebutuhan siswa | Sangat personal, kurikulum bisa dikustomisasi (*customized*) |
| **Fleksibilitas Waktu** | Relatif tetap sesuai jadwal kelompok | Relatif tetap disesuaikan dengan kelompok kecil | Sangat fleksibel sesuai permintaan siswa & tutor |
| **Kelas Ganti / Reschedule** | Bisa *sit-in* di grup lain pada minggu yang sama / ikut kelas tambahan | Bebas *reschedule* + bisa *sit-in* | Bebas *reschedule* + bisa *sit-in* |
| **Shooting Examination** | 1x per semester | 2x per semester | 3x per semester |
| **Target Siswa** | Yang mau belajar intensif dengan biaya terjangkau | Siswa dengan target spesifik (interview, TOEFL, presentasi) | Yang butuh hasil kilat, layanan VIP, atau eksekutif sibuk |

---

### Tahap 6: Pilih Lokasi dan Jadwal (`choose_schedule` & `choose_self_schedule`)
- **Judul**: `Pilih Lokasi dan Jadwal`
- **Deskripsi**: *"Pilih lokasi dan jadwal sesuai dengan cocok dengan Anda."*
- **Pilihan Cabang**:
  - Kuningan 1 (Jl. Aruji Kartawinata Dalam No.19)
  - Kuningan 2 (Soon)
  - Luragung (Jl. Raya Luragung - Kuningan)
- **Metode Penjadwalan**:
  1. **Pilih Study Group Tersedia**: Memilih kelas yang sudah ada dengan jadwal hari dan tutor tertentu.
  2. **Atur Jadwal Sendiri (Custom / Self-Schedule)**:
     - Tersedia hari: Senin s/d Sabtu (`MON`, `TUE`, `WED`, `THU`, `FRI`, `SAT`).
     - Slot jam mulai: `08:00`, `09:30`, `11:00`, `13:45`, `15:15`, `16:45`, `19:00`.
     - Tombol: **"Pilih Trial Class"**

---

### Tahap 7: Pilih Trial Class (`choose_trial_class`)
- **Judul**: `Pilih Trial Class`
- **Deskripsi**: *"Choose the trial class category that matches your educational needs."*
- Menentukan waktu pelaksanaan sesi kelas uji coba perdana siswa.

---

### Tahap 8: Rangkuman Program (`summary_step`)
- **Judul**: `Rangkuman Program Pilihan Anda`
- **Deskripsi**: *"Silahkan periksa kembali pilihan program Anda."*
- **Data yang Ditinjau**:
  - Program & Jenjang yang dipilih
  - Level pembelajaran
  - Paket kelas (Semi Private / Private / Exclusive)
  - Lokasi cabang & Jadwal kelas yang ditentukan
- **Tombol Lanjut**: **"Berapa perkiraan biaya?"**

---

### Tahap 9: Estimasi Harga & Penawaran Promo (`price_step`)
- **Judul Bagian**: `Harga terbaik!`
- **Sub-judul**: *"karena harga yang bisa anda dapatkan adalah"*
- **Komponen Tampilan Harga**:
  - Label: *"Mulai dari"*
  - Coretan Harga Asal (*Normal Price* yang dicoret)
  - Harga Spesial / Promo Terbaik (*Cheapest Price* dengan font besar dan warna primer) per bulan (`/bulan`)
  - Catatan Kaki: *\*Chat ke Admin UP untuk mendapatkan promo*
- **Tombol Lanjut**: **"Lanjutkan"**

---

### Tahap 10: Notifikasi Konfirmasi (`confirmation`)
- **Pemberitahuan Sistem**:
  > *"Sebelum lanjut, kami ingin menginformasikan bahwa: **Tim UP SLC akan menghubungi anda lewat Whatsapp jika terdapat perubahan jadwal!**"*
- **Tombol Aksi**: **"Isi data diri"**

---

### Tahap 11: Pengisian Data Diri (`fill_personal_information`)
Formulir kontak untuk reservasi kuota kelas dan penguncian diskon.

- **Judul**: `Amankan Promo!`
- **Deskripsi**: *"Silahkan isi formulir supaya anda mendapatkan antrian teratas untuk mendapatkan promo"*
- **Formulir Isian**:
  1. **Nama Student\*** (Wajib diisi)
  2. **No HP (WhatsApp)\*** (Wajib diisi, digunakan untuk verifikasi dan konfirmasi jadwal)
  3. **Username Instagram** (Opsional)
- **Tombol Submit**: **"Simpan"**
- **Respon Sistem**:
  - *Success Dialog*: Menampilkan pesan konfirmasi sukses bahwa data telah tersimpan dan admin akan segera menghubungi melalui WhatsApp.
  - *Error Dialog*: Penanganan kendala jaringan/server jika pengiriman formulir gagal.
