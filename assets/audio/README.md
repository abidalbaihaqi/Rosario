# Panduan Penyimpanan File Suara MP3 Rosario

Folder ini (`assets/audio/`) digunakan untuk menyimpan file rekaman suara doa dan renungan rosario format `.mp3`.

---

## 🎵 Struktur Penamaan File MP3

Aplikasi telah diprogram untuk memutar file audio secara otomatis sesuai doa dan peristiwa yang sedang aktif:

### 1. Doa-Doa Pokok (Bahasa Indonesia & English)
- `salam_maria_id.mp3` : Doa Salam Maria (Bahasa Indonesia)
- `hail_mary_en.mp3` : Hail Mary (English)
- `bapa_kami_id.mp3` : Doa Bapa Kami (Bahasa Indonesia)
- `our_father_en.mp3` : Our Father (English)
- `kemuliaan_id.mp3` : Doa Kemuliaan & Doa Fatima (Bahasa Indonesia)
- `glory_be_en.mp3` : Glory Be & Fatima Prayer (English)
- `aku_percaya_id.mp3` : Syahadat Para Rasul / Aku Percaya
- `salam_ya_ratu_id.mp3` : Salam Ya Ratu / Salve Regina
- `chime.mp3` : (Opsional) Suara dentang lonceng saat pindah butir

### 2. Audio Peristiwa & Renungan (Opsional per Peristiwa)
#### Peristiwa Gembira (Joyful):
- `gembira_1.mp3` : Peristiwa Gembira ke-1 (Kabar Sukacita)
- `gembira_2.mp3` : Peristiwa Gembira ke-2 (Kunjungan Maria)
- `gembira_3.mp3` : Peristiwa Gembira ke-3 (Kelahiran Yesus)
- `gembira_4.mp3` : Peristiwa Gembira ke-4 (Yesus Dipersembahkan)
- `gembira_5.mp3` : Peristiwa Gembira ke-5 (Yesus Ditemukan)

#### Peristiwa Terang (Luminous):
- `terang_1.mp3` sampai `terang_5.mp3`

#### Peristiwa Sedih (Sorrowful):
- `sedih_1.mp3` sampai `sedih_5.mp3`

#### Peristiwa Mulia (Glorious):
- `mulia_1.mp3` sampai `mulia_5.mp3`

---

## ⚙️ Cara Kerja Kode Player Audio
1. Ketika Anda menekan tombol **Play `▶`**, sistem akan mencari file `.mp3` terkait di folder ini.
2. Saat audio selesai berputar (*on ended*), aplikasi akan otomatis berpindah ke butiran doa berikutnya.
3. Jika file MP3 belum Anda masukkan, aplikasi memiliki **mode cadangan otomatis (*smart fallback*)** sehingga tombol Play tetap berfungsi dengan jeda waktu dan dentang lonceng alami.
