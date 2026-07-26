import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `Kamu adalah Asisten Estafet Usaha, konsultan AI khusus suksesi bisnis keluarga UMKM Indonesia.

Peranmu adalah membantu keluarga pengusaha menavigasi proses transfer kepemilikan dan manajemen bisnis dari generasi pertama (Pendiri) ke generasi berikutnya (Penerus).

Kamu memahami:
- Aspek legal suksesi bisnis di Indonesia (PT, CV, firma, usaha perorangan)
- Dinamika emosional dan relasional keluarga pengusaha
- Aspek finansial: valuasi bisnis, pajak warisan, restrukturisasi kepemilikan
- Aspek operasional: transfer pengetahuan, budaya perusahaan, hubungan dengan stakeholder

Panduan respons:
- Gunakan Bahasa Indonesia yang profesional namun ramah
- Berikan saran yang praktis dan actionable, bukan hanya teori
- Bedakan konteks berdasarkan role user (Pendiri vs Penerus) jika disebutkan
- Jika ada pertanyaan hukum atau pajak yang kompleks, sarankan konsultasi dengan profesional (notaris/akuntan)
- Maksimal 3-4 paragraf per respons agar tidak overwhelming
- Gunakan bullet point jika ada langkah-langkah spesifik`;

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
    return `Halo! Saya adalah **AI Advisor Estafet Usaha** untuk **${businessName}**. 

Ada yang bisa saya bantu hari ini seputar rencana suksesi bisnis keluarga Anda? Anda dapat menanyakan tentang:
- 📜 **Legalitas**: Pembuatan akta hibah saham, sertifikat merek, & notaris.
- 🧮 **Finansial**: Valuasi bisnis, estimasi pajak transfer, & alokasi dividen.
- 🔄 **Operasional**: Pendelegasian tugas, penyusunan SOP, & pelatihan penerus.`;
  }

  if (lowerMsg.includes("legal") || lowerMsg.includes("akta") || lowerMsg.includes("notaris") || lowerMsg.includes("hukum")) {
    return `Mengenai aspek legalitas suksesi untuk **${businessName}**:

1. **Akta Pendirian & Perubahan**: Pastikan susunan pemegang saham terbaru sudah dicatatkan di Notaris dan Kemenkumham.
2. **Akta Penyerahan/Hibah Saham**: Untuk pengalihan kepemilikan ke generasi penerus, gunakan Akta Hibah Saham agar aspek hukum keluarga terlindungi.
3. **Perjanjian Keluarga (Family Charter)**: Legalisasikan aturan tata kelola keluarga secara notariil.

*Saran:* Jadwalkan sesi konsultasi awal dengan Notaris partner untuk meninjau rancangan akta suksesi.`;
  }

  if (lowerMsg.includes("delegasi") || lowerMsg.includes("tugas") || lowerMsg.includes("operasional") || lowerMsg.includes("karyawan")) {
    return `Strategi pendelegasian operasional **${businessName}**:

- **Fase 1 (Observasi & Mentoring)**: Dampingi penerus dalam mengambil keputusan operasional harian selama 1-3 bulan.
- **Fase 2 (Pendelegasian Terpisah)**: Serahkan tanggung jawab divisi spesifik (misal: Manajemen Stok / Pemasaran Digital).
- **Fase 3 (Uji Coba Mandiri)**: Berikan wewenang penuh selama 1 bulan dengan Pendiri sebagai Pembina/Pengawas.

*Tips:* Buat checklist SOP tertulis agar transfer pengetahuan tidak hilang.`;
  }

  if (role === "pendiri") {
    return `Sebagai Pendiri **${businessName}**, langkah strategis suksesi yang direkomendasikan adalah:

1. **Pemetaan Kesiapan Penerus**: Identifikasi area kekuatan & gap keterampilan generasi penerus.
2. **Kalkulasi Valuasi & Pajak**: Gunakan menu *Simulasi Finansial* untuk menghitung estimasi nilai bisnis dan biaya transisi.
3. **Diskusi Keluarga Terbuka**: Ciptakan ruang diskusi tanpa tekanan untuk menyelaraskan visi masa depan bisnis.`;
  }

  return `Sebagai Generasi Penerus **${businessName}**, langkah utama yang perlu dilakukan adalah:

1. **Pahami SOP & Relasi Kunci**: Pelajari alur operasional dan mulailah membangun hubungan baik dengan vendor & klien utama.
2. **Gunakan Menu Edukasi**: Pelajari modul hukum & keuangan di tab *Edukasi Suksesi*.
3. **Komunikasi Rutin**: Agendakan evaluasi mingguan bersama Pendiri untuk menyelaraskan ekspektasi.`;
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
