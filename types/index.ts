export type UserRole = "pendiri" | "penerus";

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  business_id: string | null;
  created_at: string;
}

export type MilestoneCategory = "legal" | "financial" | "operational" | "relational";
export type MilestoneStatus = "pending" | "in_progress" | "completed";

export interface Milestone {
  id: string;
  business_id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  status: MilestoneStatus;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  industry: string;
  founded_year: number | null;
  owner_id: string;
  invite_code: string;
  created_at: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  business_id: string;
  user_id: string;
  role: ChatRole;
  content: string;
  created_at: string;
}

export const CATEGORY_LABELS: Record<MilestoneCategory, string> = {
  legal: "Legal & Hukum",
  financial: "Finansial",
  operational: "Operasional",
  relational: "Relasional",
};

export const CATEGORY_COLORS: Record<MilestoneCategory, string> = {
  legal: "#494fdf",
  financial: "#00a87e",
  operational: "#ec7e00",
  relational: "#e61e49",
};

export const STATUS_LABELS: Record<MilestoneStatus, string> = {
  pending: "Belum Dimulai",
  in_progress: "Dalam Proses",
  completed: "Selesai",
};

export const DEFAULT_MILESTONES: Omit<Milestone, "id" | "business_id" | "created_at" | "completed_at">[] = [
  // Legal
  { title: "Inventarisasi Dokumen Legal Bisnis", description: "Kumpulkan semua dokumen legal: akta pendirian, SIUP, NPWP, sertifikat merek, kontrak vendor.", category: "legal", status: "pending", due_date: null },
  { title: "Konsultasi Notaris untuk Suksesi", description: "Konsultasikan rencana transfer kepemilikan dengan notaris terpercaya.", category: "legal", status: "pending", due_date: null },
  { title: "Pembaruan Struktur Kepemilikan", description: "Proses pembaruan akta dan struktur kepemilikan sesuai rencana suksesi.", category: "legal", status: "pending", due_date: null },
  // Financial
  { title: "Valuasi Bisnis", description: "Lakukan penilaian nilai bisnis secara objektif bersama konsultan keuangan.", category: "financial", status: "pending", due_date: null },
  { title: "Perencanaan Pajak Suksesi", description: "Rencanakan implikasi pajak dari proses transfer kepemilikan.", category: "financial", status: "pending", due_date: null },
  { title: "Audit Keuangan Independen", description: "Lakukan audit keuangan untuk memastikan kesehatan bisnis sebelum transfer.", category: "financial", status: "pending", due_date: null },
  // Operational
  { title: "Dokumentasi SOP Bisnis", description: "Dokumentasikan semua Standard Operating Procedure yang ada di bisnis.", category: "operational", status: "pending", due_date: null },
  { title: "Pemetaan Hubungan Stakeholder Kunci", description: "Identifikasi dan dokumentasikan relasi dengan vendor, klien, dan mitra utama.", category: "operational", status: "pending", due_date: null },
  { title: "Program Pelatihan Penerus", description: "Jalankan program mentoring/pelatihan terstruktur untuk penerus bisnis.", category: "operational", status: "pending", due_date: null },
  // Relational
  { title: "Diskusi Terbuka Keluarga tentang Suksesi", description: "Lakukan pertemuan keluarga untuk mendiskusikan ekspektasi dan rencana suksesi secara terbuka.", category: "relational", status: "pending", due_date: null },
  { title: "Perkenalan Penerus ke Stakeholder", description: "Perkenalkan calon penerus secara formal kepada vendor, klien, dan karyawan kunci.", category: "relational", status: "pending", due_date: null },
  { title: "Perjanjian Keluarga (Family Charter)", description: "Susun dokumen kesepakatan keluarga tentang nilai, peran, dan tata kelola bisnis keluarga.", category: "relational", status: "pending", due_date: null },
];
