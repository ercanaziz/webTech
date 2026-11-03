import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Tüm Etkinlikler</h2>
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
      />
    </>
  );
}

export default EventsPage;
