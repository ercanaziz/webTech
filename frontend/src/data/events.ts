import type { CampusEvent } from "../types/campus-event";


export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 120,
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description:
      "Farklı sektörlerden mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.svg",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-10-20",
    time: "10:00",
    location: "Lab 2",
    description:
      "Arduino ile temel robotik ve sensör uygulamaları. Ön bilgi gerekmez.",
    image: "/afis.svg",
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    capacity: 80,
    date: "2026-10-27",
    time: "15:00",
    location: "B Blok Seminer Salonu",
    description:
      "Güncel tehditler, güvenli yazılım geliştirme ve siber güvenlikte kariyer yolları.",
    image: "/afis.svg",
  },
  {
    id: "event-4",
    title: "Yapay Zekâ ve Gelecek",
    category: "Seminer",
    capacity: 150,
    date: "2026-11-03",
    time: "13:30",
    location: "A Blok Konferans Salonu",
    description:
      "Üretken yapay zekânın mühendislik ve iş dünyasına etkileri üzerine seminer.",
    image: "/afis.svg",
  },
  {
    id: "event-5",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 25,
    date: "2026-11-10",
    time: "09:30",
    location: "Lab 1",
    description:
      "HTML, CSS ve JavaScript ile sıfırdan responsive bir sayfa yapımı.",
    image: "/afis.svg",
  },
  {
    id: "event-6",
    title: "Algoritma Yarışması",
    category: "Yarışma",
    capacity: 60,
    date: "2026-11-18",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı",
    description:
      "Takımlar halinde üç saatlik programlama yarışması. İlk üç takıma ödül.",
    image: "/afis.svg",
  },
];
