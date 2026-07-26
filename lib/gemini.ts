import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `Kamu adalah Asisten Estafet Usaha, konsultan AI senior khusus suksesi & tata kelola bisnis keluarga UMKM di Indonesia.

FORMAT WAJIB RESPONS:
Setiap respons HARUS disusun rapi menggunakan Markdown dengan struktur sebagai berikut:

### 1. Ringkasan Solusi
Berikan penjelasan singkat (1-2 kalimat) yang menjawab langsung pertanyaan user.

### 2. Langkah-Langkah Praktis
Gunakan poin penomoran atau bullet point (maksimal 3-4 poin) yang terstruktur dan actionable.
Gunakan **tebal** untuk kata kunci/istilah penting.

### 3. Catatan Legal & Keuangan
Berikan 1 poin penutup mengenai pertimbangan legalitas (Notaris/Kemenkumham) atau efisiensi pajak yang relevan.

ATURAN GAYA BAHASA:
- Gunakan Bahasa Indonesia yang profesional, ramah, dan empatik.
- Sesuaikan saran berdasarkan role user (Pendiri vs Penerus).
- Hindari paragraf panjang yang menumpuk. Gunakan pemisah baris yang lega.
- JANGAN gunakan karakter emoji gambar raw dalam teks.`;

// Verified Active Models from User's Google AI Studio Project Quota
const MODELS_TO_TRY = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3-flash",
  "gemini-1.5-flash",
];

// Smart Expert Advisor Rule Engine (Zero-Downtime Fallback)
function getSmartFallbackAdvice(message: string, role: string, businessName: string): string {
  const lowerMsg = message.toLowerCase().trim();
  const greetings = ["hi", "halo", "hallo", "hello", "hei", "hey", "pagi", "siang", "sore", "malam", "ping", "tes", "test"];

  // Greeting Handler
  if (greetings.includes(lowerMsg) || lowerMsg.length <= 4) {
    return `### 1. Selamat Datang di AI Suksesi Advisor

Saya adalah konsultan AI pendamping suksesi untuk **${businessName}**.

### 2. Topik Konsultasi Utama
- **Legalitas & Notaris**: Pembuatan akta hibah saham, sertifikat merek, & pendaftaran Kemenkumham.
- **Finansial & Valuasi**: Perhitungan nilai pasar bisnis, estimasi pajak pengalihan, & alokasi dividen.
- **Operasional & Delegasi**: Pemetaan SOP, transfer pengetahuan, & pelatihan kepemimpinan penerus.

### 3. Catatan Penggunaan
Silakan ketik pertanyaan spesifik Anda di bawah untuk mendapatkan panduan langkah demi langkah.`;
  }

  if (lowerMsg.includes("legal") || lowerMsg.includes("akta") || lowerMsg.includes("notaris") || lowerMsg.includes("hukum")) {
    return `### 1. Ringkasan Legalitas Suksesi
Proses pengalihan kepemilikan bisnis **${businessName}** wajib memiliki kepastian hukum tertulis agar terhindar dari sengketa di kemudian hari.

### 2. Langkah-Langkah Praktis
1. **Inventarisasi Akta Pendirian**: Pastikan seluruh dokumen SIUP, NIB, NPWP, dan Akta Perubahan Terakhir sudah lengkap.
2. **Penyusunan Akta Hibah Saham**: Lakukan pengalihan porsi saham dari Pendiri ke Penerus melalui Akta Hibah Notariil.
3. **Penyusunan Family Charter**: Legalisasikan Perjanjian Tata Kelola Keluarga yang mengatur remunerasi dan hak veto.

### 3. Catatan Legal & Keuangan
Jadwalkan konsultasi dengan Notaris partner untuk pencatatan resmi ke sistem AHU Kemenkumham.`;
  }

  if (lowerMsg.includes("delegasi") || lowerMsg.includes("tugas") || lowerMsg.includes("operasional") || lowerMsg.includes("karyawan")) {
    return `### 1. Ringkasan Pendelegasian Operasional
Tahap pendelegasian di **${businessName}** dilakukan secara bertahap agar tidak menggangu stabilitas layanan dan hubungan dengan klien kunci.

### 2. Langkah-Langkah Praktis
1. **Fase Mentoring (Bulan 1-2)**: Dampingi generasi penerus dalam mengambil keputusan operasional harian.
2. **Fase Pendelegasian Khusus (Bulan 3-4)**: Berikan tanggung jawab penuh pada 1 divisi strategis (seperti Operasional atau Pemasaran).
3. **Fase Uji Coba Mandiri (Bulan 5-6)**: Berikan wewenang penuh dengan Pendiri bertindak sebagai Dewan Pengawas.

### 3. Catatan Legal & Keuangan
Dokumentasikan seluruh alur kerja ke dalam **Standar Operasional Prosedur (SOP)** tertulis.`;
  }

  if (role === "pendiri") {
    return `### 1. Ringkasan Peran Pendiri
Sebagai Pendiri **${businessName}**, wewenang Anda adalah memandu transisi kepemimpinan secara tenang dan terukur.

### 2. Langkah-Langkah Praktis
1. **Ukur Skor Kesiapan**: Periksa pencapaian 12 milestone suksesi pada menu **Dashboard**.
2. **Hitung Valuasi Bisnis**: Gunakan **Financial Simulator** untuk mengetahui estimasi harga pasar wajar bisnis Anda.
3. **Buka Ruang Komunikasi**: Agendakan diskusi keluarga rutin untuk menyelaraskan ekspektasi antargenerasi.

### 3. Catatan Legal & Keuangan
Pastikan hak alokasi dividen ditahan dan dana pensiun pendiri sudah tercantum dalam aturan tertulis.`;
  }

  return `### 1. Ringkasan Peran Generasi Penerus
Sebagai Penerus **${businessName}**, fokus utama Anda adalah membangun kapasitas kepemimpinan dan pemahaman mendalam tentang bisnis.

### 2. Langkah-Langkah Praktis
1. **Pelajari Alur Bisnis**: Kuasai rantai pasok dari supplier utama hingga pelanggan terbesar.
2. **Akses Modul Edukasi**: Pelajari panduan hukum dan manajemen di tab **Edukasi Suksesi**.
3. **Perbarui Status Tugas**: Perbarui progres milestone yang menjadi tanggung jawab Anda secara berkala.

### 3. Catatan Legal & Keuangan
Diskusikan ekspektasi remunerasi dan skema kepemilikan saham secara transparan bersama Pendiri.`;
}

export async function generateAdvisorResponse(
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  userMessage: string,
  userRole: "pendiri" | "penerus" | string,
  businessName: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your-gemini-api-key-here") {
    return getSmartFallbackAdvice(userMessage, userRole, businessName);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const contextPrefix = `[Konteks: User adalah ${userRole === "pendiri" ? "Pendiri (pemilik bisnis)" : "Penerus (generasi penerus)"} dari bisnis "${businessName}"]`;

  for (const modelName of MODELS_TO_TRY) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(`${contextPrefix}\n\n${userMessage}`);
      const text = result.response.text();
      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err: any) {
      console.warn(`Attempt with ${modelName} failed:`, err.message || err);
    }
  }

  return getSmartFallbackAdvice(userMessage, userRole, businessName);
}
