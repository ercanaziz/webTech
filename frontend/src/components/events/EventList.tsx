import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
  columns?: 2 | 3;
}

function EventList({
  events,
  emptyText = "Etkinlik bulunamadı.",
  columns = 2,
}: EventListProps) {
  if (events.length === 0) {
    return <p className="sonuc bos">{emptyText}</p>;
  }

  return (
    <section
      className={
        columns === 3
          ? "kartlar uc-sutun etkinlik-listesi"
          : "kartlar etkinlik-listesi"
      }
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;
