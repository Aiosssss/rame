import { DeferredImage } from "@/components/ui/DeferredImage";
import { useDialogs } from "@/components/dialogs/DialogProvider";
import { Icon } from "@/components/ui/Icon";
import type { RameEvent } from "@/lib/data/events";

const imageSizes =
  "(max-width: 700px) calc((100vw - 56px) / 2), (max-width: 1100px) calc((94.2vw - 94px) / 3), (max-width: 1760px) calc((89.2vw - 50px) / 3), calc((94.2vw - 138px) / 3)";
export function EventCard({ event }: { event: RameEvent }) {
  const { open } = useDialogs();
  return (
    <article
      className="event-card"
      data-id={event.id}
      data-category={event.category}
      data-city={event.city}
    >
      <a
        className="event-card-link"
        href={`#${event.id}`}
        data-event={event.id}
        aria-label={`Lihat ${event.title}`}
        onClick={(e) => {
          e.preventDefault();
          open({ kind: "event", event });
        }}
      >
        <div className="event-photo">
          <DeferredImage
            src={event.image}
            srcSet={`${event.image.replace("-1280", "-320")} 320w, ${event.image.replace("-1280", "-640")} 640w, ${event.image} 1280w`}
            sizes={imageSizes}
            width="1536"
            height="1024"
            alt={event.imageAlt}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="event-info">
          <h3>{event.title}</h3>
          <div className="event-meta">
            <p className="venue">
              <Icon name="pin" />
              {event.venue}
            </p>
            <time dateTime={event.date}>{event.dateLabel}</time>
          </div>
        </div>
        <div className="event-footer">
          <p className="price">
            <span className="price-label">{event.price}</span>
          </p>
          <span className="event-card-arrow" aria-hidden="true">
            <Icon name="arrow" />
          </span>
        </div>
      </a>
    </article>
  );
}
