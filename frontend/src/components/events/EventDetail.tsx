import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay">
      <div className="detay-icerik">
        {event.image && (
          <figure>
            <img
              src={event.image}
              alt={`${event.title} etkinlik afişi`}
              width={600}
              height={360}
            />
            <figcaption>Şekil 1: etkinlik afişi</figcaption>
          </figure>
        )}

        <dl>
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity}</dd>
        </dl>

        <p className="detay-aciklama">{event.description}</p>

        <p className="detay-butonlar">
          <Link className="buton" to={`/admin/${event.id}/edit`}>
            Bu etkinliği güncelle
          </Link>
          <Link className="buton buton-ikincil" to="/events">
            ← Listeye dön
          </Link>
        </p>
      </div>
    </article>
  );
}

export default EventDetail;
