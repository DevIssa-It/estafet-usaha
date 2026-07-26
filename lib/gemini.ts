import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `Kamu adalah Asisten Estafet Usaha, konsultan AI ramah dan profesional khusus suksesi & tata kelola bisnis keluarga UMKM di Indonesia.

PANDUAN RESPONS:
- Jawablah pertanyaan pengguna secara langsung, relevan, dan alami sesuai konteks percakapan.
- Gunakan Bahasa Indonesia yang hangat, sopan, dan mudah dipahami.
- Sesuaikan gaya jawaban sesuai peran pengguna (Pendiri atau Penerus bisnis).
- Jika respons membutuhkan poin-poin penjelasan, gunakan bullet point (-) atau nomor yang rapi dan singkat.
- Gunakan cetak **tebal** pada kata kunci penting agar mudah dibaca sekilas.
- Hindari template kaku yang tidak relevan dengan konteks pertanyaan user.
- Jangan gunakan karakter emoji gambar dalam teks.`;

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
    return `Halo! Saya adalah **AI Suksesi Advisor** untuk **${businessName}**.

Ada yang ingin Anda konsulitasi kan hari ini mengenai suksesi bisnis keluarga Anda? Saya siap membantu memberikan panduan seputar:
- **Legalitas & Notaris**: Akta hibah saham, sertifikat merek, & kepatuhan Kemenkumham.
- **Finansial & Valuasi**: Perhitungan estimasi nilai pasar bisnis & pajak pengalihan.
- **Operasional & Delegasi**: Standarisasi SOP & pelatihan kepemimpinan penerus.`;
  }

  if (lowerMsg.includes("legal") || lowerMsg.includes("akta") || lowerMsg.includes("notaris") || lowerMsg.includes("hukum")) {
    return `Mengenai aspek legalitas suksesi untuk **${businessName}**:

1. **Akta Pendirian & Perubahan**: Pastikan susunan pemegang saham terbaru sudah dicatatkan di Notaris dan Kemenkumham.
2. **Akta Penyerahan / Hibah Saham**: Lakukan pengalihan porsi saham dari Pendiri ke Penerus melalui Akta Hibah Notariil agar terlindungi secara hukum.
3. **Perjanjian Keluarga (Family Charter)**: Legalisasikan aturan tata kelola keluarga yang mengatur remunerasi dan wewenang.

Saran saya, agendakan diskusi awal dengan Notaris partner untuk meninjau kelengkapan berkas Anda.`;
  }

  if (lowerMsg.includes("delegasi") || lowerMsg.includes("tugas") || lowerMsg.includes("operasional") || lowerMsg.includes("karyawan")) {
    return `Berikut rekomendasi pendelegasian operasional secara bertahap untuk **${businessName}**:

- **Fase Mentoring**: Pendiri mendampingi penerus dalam mengambil keputusan operasional harian selama 1-2 bulan.
- **Fase Wewenang Khusus**: Berikan tanggung jawab penuh pada divisi spesifik (seperti Operasional atau Pemasaran Digital).
- **Fase Uji Coba Mandiri**: Berikan kebebasan memimpin penuh dengan Pendiri bertindak sebagai Dewan Pengawas.

Pastikan seluruh alur kerja telah didokumentasikan dalam **SOP tertulis** agar pengetahuan bisnis tidak hilang.`;
  }

  if (role === "pendiri") {
    return `Sebagai Pendiri **${businessName}**, langkah awal suksesi yang direkomendasikan adalah:

1. **Evaluasi Kesiapan**: Cek pencapaian 12 milestone suksesi pada menu **Dashboard**.
2. **Kalkulasi Valuasi**: Gunakan menu **Financial Simulator** untuk mengetahui estimasi nilai pasar bisnis Anda.
3. **Komunikasi Berkelanjutan**: Agendakan pertemuan keluarga tanpa tekanan untuk menyelaraskan visi masa depan.`;
  }

  return `Sebagai Generasi Penerus **${businessName}**, langkah utama yang perlu Anda lakukan adalah:

1. **Pahami Alur Bisnis**: Pelajari rantai pasok dan bangun hubungan baik dengan vendor serta pelanggan utama.
2. **Akses Hub Edukasi**: Pelajari modul hukum dan keuangan di tab **Edukasi Suksesi**.
3. **Komunikasi Transparan**: Agendakan evaluasi berkala bersama Pendiri untuk menyelaraskan ekspektasi kepemimpinan.`;
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
