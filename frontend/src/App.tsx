import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

// ---------- Sayfa adları ve menü ----------
type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// Kategori seçenekleri veriden, her biri bir kez
const categories = [...new Set(events.map((e) => e.category))];

// En yakın 2 etkinlik
const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 2);

// "2026-10-12" -> "12 Ekim 2026"
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  // ---------- State ----------
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // ---------- Türetilen değerler (state değil, her çizimde hesaplanır) ----------
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  // ---------- Side-effect: sekme başlığı ----------
  useEffect(() => {
    document.title =
      page === "home" ? "Kampüs Etkinlikleri" : `Kampüs Etkinlikleri — ${title}`;
  }, [page, title]);

  // ---------- Kart (ana sayfa ve liste aynı kartı kullanır) ----------
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p>{event.category}</p>
        <p>
          <time dateTime={`${event.date}T${event.time}`}>
            {formatDate(event.date)}
          </time>{" "}
          &middot; {event.time}
        </p>
        <p>{event.location}</p>
        <p>Kontenjan: {event.capacity}</p>
        <p>{event.description}</p>
        <a
          className="buton detay"
          href="#detay"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        <nav className="menu">
          {menu.map((item) => (
            <a
              key={item.page}
              href={`#${item.page}`}
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* ---------- Ana sayfa ---------- */}
        {page === "home" && (
          <>
            <section>
              <p>
                Fakültedeki seminer, atölye ve söyleşileri tek yerden takip
                edin. Yaklaşan etkinlikleri görün, detaylarını inceleyin ve
                yeni etkinlik önerin.
              </p>
            </section>
            <section>
              <h2>Yaklaşan 2 etkinlik</h2>
              <section className="kartlar etkinlik-listesi">
                {upcoming.map(renderCard)}
              </section>
              <p>
                <a
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  Tüm etkinlikleri gör →
                </a>
              </p>
            </section>
          </>
        )}

        {/* ---------- Etkinlikler ---------- */}
        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </p>
            </form>
            <p
              className={filtered.length === 0 ? "sonuc bos" : "sonuc"}
              aria-live="polite"
            >
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="kartlar uc-sutun etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {/* ---------- Detay: bulunamadı ---------- */}
        {page === "detail" && !selected && (
          <div className="kutu kutu-hata" role="alert">
            <p>
              <strong>Etkinlik bulunamadı.</strong>
            </p>
            <p>Aradığınız etkinlik yok ya da seçim yapılmadı.</p>
            <a
              className="buton"
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </div>
        )}

        {/* ---------- Detay ---------- */}
        {page === "detail" && selected && (
          <article className="detay">
            <div className="detay-icerik">
              {selected.image && (
                <figure>
                  <img
                    src={selected.image}
                    alt={`${selected.title} etkinlik afişi`}
                    width={600}
                    height={360}
                  />
                  <figcaption>Şekil 1: etkinlik afişi</figcaption>
                </figure>
              )}

              <dl>
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity}</dd>
              </dl>

              <p className="detay-aciklama">{selected.description}</p>

              <p className="detay-butonlar">
                <a
                  className="buton"
                  href="#update"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
                <a
                  className="buton buton-ikincil"
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  ← Listeye dön
                </a>
              </p>
            </div>
          </article>
        )}

        {/* ---------- Ekle / Güncelle formu (sadece görünüm) ---------- */}
        {(page === "add" || page === "update") && (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <p>
              <label htmlFor="title">Etkinlik adı</label>
              <input type="text" id="title" name="title" maxLength={80} />
            </p>

            <p>
              <label htmlFor="category">Kategori</label>
              <select id="category" name="category" defaultValue="">
                <option value="">Seçiniz</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </p>

            <p>
              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" name="date" />
            </p>

            <p>
              <label htmlFor="time">Saat</label>
              <input type="time" id="time" name="time" />
            </p>

            <p>
              <label htmlFor="location">Yer</label>
              <input type="text" id="location" name="location" maxLength={80} />
            </p>

            <p>
              <label htmlFor="capacity">Kontenjan</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                min={1}
                max={1000}
              />
            </p>

            <p>
              <label htmlFor="description">Açıklama</label>
              <textarea id="description" name="description" rows={5} />
            </p>

            <p>
              <button type="submit">
                {page === "update" ? "Güncelle" : "Kaydet"}
              </button>
            </p>
          </form>
        )}
      </main>

      <footer>
        <p>Ercan Aziz &middot; 2311012048 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
