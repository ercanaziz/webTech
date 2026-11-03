import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <p className="giris-metni">
        Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
        Yaklaşan etkinlikleri görün, detaylarını inceleyin ve yeni etkinlik
        ekleyin.
      </p>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <EventList events={upcoming} emptyText="Henüz etkinlik yok." />
      <p>
        <Link className="buton" to="/events">
          Tüm etkinlikleri gör →
        </Link>
      </p>
    </>
  );
}

export default HomePage;
