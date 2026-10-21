import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events, categories } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 2);

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

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

  useEffect(() => {
    document.title =
      page === "home" ? "Kampüs Etkinlikleri" : `Kampüs Etkinlikleri — ${title}`;
  }, [page, title]);

  return (
    <>
      <div className="site-ust">
        <Header
          title={title}
          text={
            page === "home"
              ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
              : undefined
          }
        />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p>
              <a href="#events" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör →
              </a>
            </p>
          </section>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              resultCount={filtered.length}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <EventList
              events={filtered}
              columns={3}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
              onShowDetail={(id) => go("detail", id)}
            />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
