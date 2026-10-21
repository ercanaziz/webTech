import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
          onShowDetail(event.id);
        }}
      >
        Detayları gör →
      </a>
    </article>
  );
}

export default EventCard;
