export interface NotaryReview {
  id: string;
  authorName: string;
  businessName: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Notary {
  id: string;
  name: string;
  title: string;
  skNumber: string;
  iniNumber: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  completedDeeds: number;
  isVerified: boolean;
  specializations: string[];
  bio: string;
  reviews: NotaryReview[];
}

export const NOTARIES_DATA: Notary[] = [
  {
    id: "notary-1",
    name: "Dewi Rahmawati, S.H., M.Kn.",
    title: "Notaris & Pejabat Pembuat Akta Tanah (PPAT)",
    skNumber: "AHU-0019283.AH.02.01.2018",
    iniNumber: "INI-JKT-8821",
    city: "Jakarta Selatan",
    address: "Jl. HR Rasuna Said Blok X-5 No. 12, Kuningan, Jakarta Selatan",
    phone: "+62 812-8899-7711",
    email: "dewi.rahmawati.notaris@gmail.com",
    rating: 4.9,
    reviewCount: 38,
    experienceYears: 14,
    completedDeeds: 165,
    isVerified: true,
    specializations: ["Suksesi Bisnis Keluarga", "Akta Hibah Saham & Aset", "Family Charter Notariil", "Pembaruan Akta PT/CV"],
    bio: "Spesialis dalam pendampingan hukum suksesi usaha keluarga UMKM & Menengah. Beralaman lebih dari 14 tahun menangani akta penyerahan aset, perumusan struktur kepemilikan baru, dan perjanjian keluarga.",
    reviews: [
      {
        id: "rev-1",
        authorName: "Budi Santoso",
        businessName: "Batik Santoso Jaya",
        rating: 5,
        date: "14 Mei 2026",
        comment: "Ibu Dewi sangat komunikatif dan membantu menjelaskan konsekuensi hukum hibah saham ke anak-anak saya secara sangat jernih dan ramah.",
      },
      {
        id: "rev-2",
        authorName: "Hendra Wijaya",
        businessName: "Resto Rasa Nusantara",
        rating: 5,
        date: "2 Pebruari 2026",
        comment: "Proses akta perubahan PT untuk penerusan generasi kedua berjalan lancar tanpa kendala. SK Kemenkumham terbit tepat waktu.",
      },
    ],
  },
  {
    id: "notary-2",
    name: "Budi Hartono, S.H., M.Kn.",
    title: "Notaris Kabupaten Sleman / Yogyakarta",
    skNumber: "AHU-0044192.AH.02.01.2016",
    iniNumber: "INI-DIY-4412",
    city: "Yogyakarta",
    address: "Jl. Kaliurang Km 7.5 No. 42, Sleman, DI Yogyakarta",
    phone: "+62 813-7722-9900",
    email: "budi.hartono.notaris@gmail.com",
    rating: 4.8,
    reviewCount: 29,
    experienceYears: 16,
    completedDeeds: 140,
    isVerified: true,
    specializations: ["Suksesi Bisnis Kuliner & F&B", "Akta Pendirian & Perubahan PT", "Pajak Transisi Suksesi", "Akta Kesepakatan Waris"],
    bio: "Fokus mendampingi bisnis keluarga sektor manufaktur dan F&B di Jawa Tengah & DIY. Transparan dalam rincian biaya balik nama dan waktu pengurusan.",
    reviews: [
      {
        id: "rev-3",
        authorName: "Siti Rahma",
        businessName: "Bakpia Pathok Ibu Siti",
        rating: 5,
        date: "20 Juni 2026",
        comment: "Pak Budi sangat teliti dalam menyusun klausa penyerahan kepemimpinan usaha agar tidak ada sengketa di kemudian hari.",
      },
    ],
  },
  {
    id: "notary-3",
    name: "Hj. Ratna Sari, S.H., M.Kn.",
    title: "Notaris Kota Surabaya",
    skNumber: "AHU-0078219.AH.02.01.2014",
    iniNumber: "INI-SBY-9931",
    city: "Surabaya",
    address: "Jl. Raya Darmo No. 88, Tegalsari, Surabaya",
    phone: "+62 811-3444-5566",
    email: "ratnasari.notaris@gmail.com",
    rating: 4.9,
    reviewCount: 45,
    experienceYears: 18,
    completedDeeds: 210,
    isVerified: true,
    specializations: ["Suksesi Bisnis Perdagangan & Retail", "Family Charter Notariil", "Balik Nama Sertifikat Bisnis", "Akta Hibah Perusahaan"],
    bio: "Pengalaman 18 tahun membantu ratusan bisnis keluarga di Jawa Timur melangsungkan transisi kepemimpinan dan penataan legalitas usaha.",
    reviews: [
      {
        id: "rev-4",
        authorName: "Agus Pratama",
        businessName: "Toko Grosir Murni Surabaya",
        rating: 5,
        date: "10 April 2026",
        comment: "Sangat profesional. Pendampingan lengkap dari penyusunan draft akta sampai pengesahan Kemenkumham.",
      },
    ],
  },
  {
    id: "notary-4",
    name: "Ahmad Fauzi, S.H., M.Kn.",
    title: "Notaris Kota Bandung",
    skNumber: "AHU-0091102.AH.02.01.2019",
    iniNumber: "INI-BDG-1104",
    city: "Bandung",
    address: "Jl. Riau (RE Martadinata) No. 102, Bandung",
    phone: "+62 812-3344-9988",
    email: "ahmad.fauzi.notaris@gmail.com",
    rating: 4.7,
    reviewCount: 22,
    experienceYears: 10,
    completedDeeds: 98,
    isVerified: true,
    specializations: ["Suksesi Startup & Bisnis Kreatif", "Pembaruan Struktur Saham PT", "Perjanjian Pemegang Saham (SHA)", "Konsultasi Legalitas Suksesi"],
    bio: "Spesialis perancangan hukum usaha untuk bisnis kreatif dan retail berkembang di Jawa Barat. Cepat, tanggap, dan adaptif dengan teknologi modern.",
    reviews: [
      {
        id: "rev-5",
        authorName: "Rina Kartika",
        businessName: "Fashion Hijab House Bandung",
        rating: 5,
        date: "12 Januari 2026",
        comment: "Komunikasi sangat cepat via WA dan penjelasan sangat rinci untuk kami penerus muda.",
      },
    ],
  },
];
