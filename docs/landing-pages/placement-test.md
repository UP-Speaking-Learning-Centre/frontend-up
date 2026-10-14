# Rangkuman Konten Halaman: Tes Penempatan (Placement Test Page)

- **Path Halaman**: `app/(landing)/placement-test/page.tsx`
- **Route URL**: `/placement-test`
- **Deskripsi Singkat**: Halaman tes penempatan (*online placement test*) interaktif yang berfungsi untuk mengukur kompetensi awal bahasa Inggris calon siswa (tata bahasa, kosakata, pemahaman kalimat) guna memetakan level pembelajaran yang paling tepat dan akurat sesuai kerangka CEFR.

---

## 1. Antarmuka Ujian & Komponen Utama

### A. Header Ujian (Exam Header & Timer)
- **Judul**: `Placement Test`
- **Penghitung Waktu Mundur (*Countdown Timer*)**:
  - Menampilkan sisa waktu pengerjaan tes dalam format menit dan detik (`MM:SS`) dengan ikon jam merah (*Clock*).
- **Indikator Progres (*Progress Bar*)**:
  - Teks Status: *"Soal [X] dari [Total]"*
  - Jumlah Terisi: *"[X] terjawab"*
  - Garis Progres: Menunjukkan persentase keterisian soal secara *real-time*.

---

### B. Kartu Soal (*Question Card*)
Komponen penampil soal dinamis yang menyajikan:
- **Instruksi Pengerjaan (*Instruction*)**: Panduan teknis tiap kategori soal (misal: *"Use the proper modal auxiliary (should, have to, must) to complete these sentences!"* atau *"Put the correct form of the verbs in the blanks!"*).
- **Teks Pertanyaan (*Question Text*)**: Kalimat atau paragraf soal yang harus dilengkapi atau dijawab siswa.
- **Tipe Format Soal**:
  1. **Pilihan Ganda (*Multiple Choice*)**: Pilihan opsi jawaban menggunakan Radio Button (A, B, C, D) dengan label teks yang dapat diklik.
  2. **Isian Singkat (*Fill in the Blank / Free Text*)**: Kolom input teks langsung untuk mengetikkan bentuk kata atau frasa yang tepat.

---

### C. Kontrol Navigasi Soal
- **Tombol Navigasi Bawah**:
  - Tombol **"Sebelumnya"**: Berpindah ke nomor soal sebelumnya (nonaktif pada nomor 1).
  - Tombol **"Selanjutnya"**: Berpindah ke nomor soal berikutnya.
  - Tombol **"Submit Test"**: Muncul di nomor soal terakhir, hanya aktif jika seluruh soal telah dijawab (*allQuestionsAnswered*).
- **Panel Kisi Nomor Soal (*Question Navigator*)**:
  - Matriks tombol nomor 1 s/d nomor terakhir.
  - Status visual tombol nomor:
    - **Biru Primer (Active)**: Menandakan nomor soal yang sedang aktif dibuka.
    - **Abu-abu / Sekunder (Answered)**: Menandakan soal yang telah dijawab siswa.
    - **Garis Luar / Outline (Unanswered)**: Menandakan soal yang belum dijawab.

---

## 2. Cakupan Materi & Bidang Uji Soal
Soal-soal dalam tes penempatan (`data/placement-test.json`) menguji berbagai kompetensi kebahasaan, di antaranya:
1. **Modal Auxiliaries**: Penggunaan kata bantu kerja seperti *should*, *have to*, dan *must* sesuai konteks kewajiban, rekomendasi, atau keharusan.
2. **Verb Tenses & Conjugation**: Pemilihan bentuk kata kerja yang benar dalam konteks waktu (*past continuous, simple past, present perfect*).
3. **Vocabulary & Collocations**: Ketepatan pemilihan kosakata dan kolokasi kata dalam kalimat sehari-hari.
4. **Sentence Completion**: Melengkapi kalimat rumpang dengan tata bahasa yang runtut dan benar.

---

## 3. Tampilan Hasil Selesai (*Completion Screen*)
Tampilan yang muncul secara otomatis setelah siswa menekan tombol "Submit Test":

- **Ikon**: Lingkaran centang hijau (*CheckCircle*).
- **Judul**: `Test Selesai!`
- **Pesan Konfirmasi**:
  > *"Terima kasih telah mengikuti test placement, Tim UP SLC akan menghubungi anda dalam waktu dekat."*
- **Call-to-Action (CTA)**:
  - Tombol: **"Isi Data Diri"**
  - Aksi: Mengarahkan siswa ke halaman registrasi (`/register?testSessionId={testSessionId}`) untuk melengkapi profil data diri dan melihat rekomendasi kelas.

---

## 4. Tampilan Kesalahan & Penanganan Kendala (*Error Screen*)
Tampilan pencegahan (*fallback screen*) jika terjadi sesi kedaluwarsa atau kegagalan memuat data soal:

- **Ikon**: Lingkaran silang merah (*X*).
- **Judul**: `Terjadi kesalahan!`
- **Pesan Peringatan**:
  > *"Ada kesalahan ketika memuat soal placement test. Mohon untuk tidak mengubah URL/refresh halaman ketika pengerjaan."*
- **Call-to-Action (CTA)**:
  - Tombol: **"Coba lagi"**
  - Aksi: Mengarahkan siswa kembali ke halaman awal pemilihan program di `/select-program`.
