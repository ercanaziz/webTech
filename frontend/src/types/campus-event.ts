export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string; // YYYY-AA-GG
  time: string; // SS:DD
  location: string;
  description: string;
  image?: string;
}

// Formun tuttuğu veri: CampusEvent gibi ama id yok,
// input her zaman metin verdiği için capacity string, kategori boş olabilir.
export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

// Her alana en fazla bir hata mesajı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
