import type { RameEvent } from "@/lib/data/events";
const dateFormat = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
export function EventDetails({
  event,
  onExplore,
}: {
  event: RameEvent;
  onExplore: () => void;
}) {
  return (
    <>
      <img className="dialog-photo" src={event.image} alt={event.imageAlt} />
      <h2 id="dialog-title">{event.title}</h2>
      <p>
        {dateFormat.format(new Date(`${event.date}T12:00:00+08:00`))}
        <br />
        {event.venue}
      </p>
      <p className="dialog-price">{event.price}</p>
      <button className="dialog-button" data-close onClick={onExplore}>
        Jelajahi Event
      </button>
    </>
  );
}
