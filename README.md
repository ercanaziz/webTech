Canlı adres: https://ercanaziz-frontend.vercel.app

# Kampüs Etkinlikleri

Web Teknolojileri dersi proje reposu. Fakültedeki seminer, atölye, söyleşi ve yarışmaları listeleyen, arayan ve yönetim panelinden ekleme / güncelleme / silme yapılabilen tek sayfalık React uygulaması.

## Kurulum ve çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Geliştirme adresi `http://localhost:5173`. Üretim derlemesi için `npm run build`, derlenmiş hâli görmek için `npm run preview`.

## Route listesi

| Adres | Sayfa | İçerik |
|---|---|---|
| `/` | HomePage | Tarihi en yakın 2 etkinlik |
| `/events` | EventsPage | Tüm etkinlikler, arama ve kategori filtresi |
| `/events/:id` | EventDetailPage | Tek etkinliğin detayı; bulunamazsa 404 |
| `/login` | LoginPage | Giriş formu (demo doğrulama) |
| `/register` | RegisterPage | Kayıt formu (demo doğrulama) |
| `/forgot-password` | ForgotPasswordPage | Şifre sıfırlama formu (demo) |
| `/admin` | AdminPage | Yönetim tablosu: Düzenle, Sil (onaylı), Yeni etkinlik |
| `/admin/new` | AddEventPage | Etkinlik ekleme formu |
| `/admin/:id/edit` | EditEventPage | Dolu gelen güncelleme formu |
| `*` | NotFoundPage | Sayfa bulunamadı |

## Sprint klasörleri

| Klasör | İçerik |
|---|---|
| `sprint1/` | Yalnızca HTML, beş sayfa |
| `sprint2/` | CSS ve responsive tasarım (`css/2311012048.css`) |
| `sprint3/` | JavaScript ve DOM: `js/data.js` verisi, arama ve kategori filtresi, `?id=` ile detay, form doğrulama |
| `frontend/` | Sprint 4–6 ve vize: Vite + React + TypeScript, React Router, Context |

## frontend/src yapısı

| Dosya / klasör | Görevi |
|---|---|
| `main.tsx` | React'i başlatır; `BrowserRouter` ve `EventsProvider` ile sarılı `App`'i `div#root` içine çizer. |
| `App.tsx` | Header, Navigation, `Routes` ve Footer. State yok; hangi sayfanın açık olduğunu adres söyler. |
| `App.css` | Tüm stiller; renk ve font öğrenci numarasından (`--no: 2311012048`) türetilir. |
| `context/EventsContext.tsx` | Etkinlik listesi ve `addEvent`, `updateEvent`, `deleteEvent`; `useEvents()` custom hook'u. |
| `pages/` | 10 sayfa bileşeni (yukarıdaki route tablosu). |
| `components/layout/` | `Header`, `Navigation` (NavLink menüsü), `Footer`. |
| `components/events/` | `EventCard`, `EventList`, `EventFilter`, `EventDetail`. |
| `components/forms/` | `EventForm`: controlled form, `validateEvent` ile doğrulama, `initialData` / `submitText` / `onSubmit` props'ları. |
| `types/campus-event.ts` | `Category`, `CampusEvent`, `EventFormData`, `EventFormErrors` tipleri. |
| `data/events.ts` | Başlangıç verisi: 6 etkinlik ve kategori listesi. |
| `utils/filter-events.ts` | `searchEvents`, `filterByCategory`, `findEventById`. |
| `utils/format-date.ts` | ISO tarihi "12 Ekim 2026" biçimine çevirir. |
| `utils/validate-event.ts` | Etkinlik formu doğrulama kuralları; saf fonksiyon. |
| `public/afis.svg` | Etkinlik afişi yer tutucusu. |
| `vercel.json` | Tüm adresleri `index.html`'e yönlendirir; sayfa yenilenince router çalışmaya devam eder. |

## Teknolojiler

Vite, React 19, TypeScript, React Router 7. Veri bu aşamada bellekte tutulur; sayfa yenilenince başlangıç verisine döner. Kalıcı kayıt ve gerçek giriş backend sprintlerinde gelecek.

Ercan Aziz · 2311012048
