Canlı adres: https://web-1.ercanaziz.com

# Kampüs Etkinlikleri

Web Teknolojileri dersi proje reposu. Her sprint kendi klasöründe; Vercel'de Root Directory güncel sprinte ayarlanır.

| Klasör | İçerik |
|---|---|
| `sprint1/` | Yalnızca HTML, beş sayfa |
| `sprint2/` | CSS ve responsive tasarım (`css/2311012048.css`) |
| `sprint3/` | JavaScript ve DOM: `js/data.js` verisi, arama ve kategori filtresi, `?id=` ile detay, form doğrulama |
| `frontend/` | Sprint 4: Vite + React + TypeScript. Beş sayfa tek `App.tsx` içinde, sayfa geçişi state ile |

## frontend/ dosya yapısı

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `preview`) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri; herkes aynı sürümleri kurar. |
| `node_modules/` | İndirilen paketler; `.gitignore` ile GitHub'a gönderilmez. |
| `tsconfig*.json` | TypeScript ayarları (hedef sürüm, katı kontroller, `import type` zorunluluğu). |
| `vite.config.ts` | Vite ayarları ve React eklentisi. |
| `index.html` | Tek HTML dosyası; içinde React'in çizim yaptığı boş `div#root`. |
| `src/main.tsx` | React'i başlatır, `App` bileşenini `root` içine çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; beş sayfanın hepsi, menü, state ve `useEffect` burada. |
| `src/App.css` | Uygulamanın stilleri; Sprint 3'teki `2311012048.css` buraya taşındı. |
| `src/index.css` | Tüm sayfaya genel stil; bu sprintte boş. |
| `src/types/campus-event.ts` | `Category` union tipi ve `CampusEvent` arayüzü: bir etkinlik neye benzer. |
| `src/data/events.ts` | `CampusEvent[]` tipinde 6 etkinlik kaydı. |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `public/` | Olduğu gibi kopyalanan dosyalar; etkinlik afişi `afis.svg` burada. |

## Çalıştırma

```bash
cd frontend
npm install
npm run dev
```

Build: `npm run build`, son hâli görmek için `npm run preview`.

Ercan Aziz · 2311012048
