// Tüm etkinlik verisi tek yerde. Sayfalar bu diziden üretilir.
// Tarih biçimi: GG-AA-YYYY, saat biçimi: SS:DD

export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Farklı sektörlerden mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120,
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Lab 2",
    description: "Arduino ile temel robotik ve sensör uygulamaları. Ön bilgi gerekmez.",
    capacity: 30,
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "15:00",
    location: "B Blok Seminer Salonu",
    description: "Güncel tehditler, güvenli yazılım geliştirme ve siber güvenlikte kariyer yolları.",
    capacity: 80,
  },
  {
    id: "event-4",
    title: "Yapay Zekâ ve Gelecek",
    category: "Seminer",
    date: "03-11-2026",
    time: "13:30",
    location: "A Blok Konferans Salonu",
    description: "Üretken yapay zekânın mühendislik ve iş dünyasına etkileri üzerine seminer.",
    capacity: 150,
  },
  {
    id: "event-5",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "10-11-2026",
    time: "09:30",
    location: "Lab 1",
    description: "HTML, CSS ve JavaScript ile sıfırdan responsive bir sayfa yapımı.",
    capacity: 25,
  },
  {
    id: "event-6",
    title: "Bahar Konseri",
    category: "Konser",
    date: "18-11-2026",
    time: "19:00",
    location: "Amfi Tiyatro",
    description: "Üniversite müzik topluluğunun açık hava konseri. Giriş ücretsizdir.",
    capacity: 500,
  },
];

// "12-10-2026" -> "2026-10-12"  (sıralama ve Date için)
export function isoTarih(ggaayyyy) {
  const [gg, aa, yyyy] = ggaayyyy.split("-");
  return `${yyyy}-${aa}-${gg}`;
}

// "12-10-2026" -> "12 Ekim 2026"
export function okunurTarih(ggaayyyy) {
  const d = new Date(isoTarih(ggaayyyy));
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
