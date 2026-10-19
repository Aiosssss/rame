import { useEffect, useMemo, useRef, useState } from "react";
import { events } from "@/lib/data/events";
import { setupEventCards, setupEventHeading } from "@/lib/motion/events";
import { useEventPagination } from "@/hooks/useEventPagination";
import { EventCard } from "./EventCard";
import { CategoryFilters } from "./CategoryFilters";
import { CitySelect } from "./CitySelect";
import { Icon } from "@/components/ui/Icon";

export function EventDiscovery() {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const matches = useMemo(() => {
    const trimmed = keyword.trim();
    const search = trimmed ? trimmed.toLocaleLowerCase("id") : "";
    return events.filter(
      (event) =>
        (category === "all" || event.category === category) &&
        (city === "all" || event.city === city) &&
        (!search ||
          `${event.title}${event.venue}${event.dateLabel}${event.price}`
            .toLocaleLowerCase("id")
            .includes(search)),
    );
  }, [keyword, city, category]);
  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(matches.length / 6) }, (_, i) =>
        matches.slice(i * 6, i * 6 + 6),
      ),
    [matches],
  );
  const { page, trackRef, sectionRef, changePage } = useEventPagination(
    JSON.stringify([keyword, city, category]),
    pages.length,
  );
  useEffect(() => setupEventHeading(headingRef.current!), []);
  useEffect(
    () =>
      setupEventCards(trackRef.current?.children[page] as HTMLElement | null),
    [page, pages, trackRef],
  );
  return (
    <section
      ref={sectionRef}
      className="events"
      id="event"
      aria-labelledby="events-title"
    >
      <div className="event-toolbar">
        <h2
          ref={headingRef}
          id="events-title"
          aria-label="Rencana seru dimulai di sini."
        >
          <span className="event-heading-line">
            <span className="event-heading-text">Rencana seru</span>
          </span>
          <span className="event-heading-line event-heading-blue">
            <span className="event-heading-text">
              dimulai di sini<span className="lime-period">.</span>
            </span>
          </span>
        </h2>
        <div className="event-controls">
          <div className="search-row">
            <label className="search-field">
              <Icon name="search" />
              <input
                type="search"
                id="event-search"
                placeholder="Cari event..."
                aria-label="Cari event, artis, atau lokasi"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </label>
            <CitySelect value={city} onChange={setCity} />
          </div>
        </div>
        <CategoryFilters value={category} onChange={setCategory} />
      </div>
      <div className="event-viewport">
        <div
          ref={trackRef}
          className="event-track is-paginated"
          id="event-grid"
          style={{ transform: `translate3d(${-page * 100}%,0,0)` }}
        >
          {pages.map((events, index) => (
            <div
              key={index}
              className="event-grid event-page"
              role="group"
              aria-label={`Daftar event halaman ${index + 1}`}
              inert={index !== page}
              aria-hidden={index !== page}
            >
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <nav
        className="event-pagination"
        aria-label="Navigasi daftar event"
        hidden={pages.length <= 1}
      >
        <button
          id="events-previous"
          type="button"
          aria-controls="event-grid"
          disabled={page === 0}
          onClick={() => changePage(-1)}
        >
          <Icon name="arrow" />
          <span>Sebelumnya</span>
        </button>
        <button
          id="events-next"
          type="button"
          aria-controls="event-grid"
          disabled={page >= pages.length - 1}
          onClick={() => changePage(1)}
        >
          <span>Berikutnya</span>
          <Icon name="arrow" />
        </button>
      </nav>
      <p
        className="empty-results"
        id="empty-results"
        role="status"
        hidden={matches.length !== 0}
      >
        Event belum ditemukan. Coba kata kunci atau kategori lain.
      </p>
      <p
        className="sr-only"
        id="search-status"
        role="status"
        aria-live="polite"
      >
        {matches.length
          ? `${matches.length} event ditemukan. Halaman ${page + 1} dari ${pages.length}.`
          : ""}
      </p>
    </section>
  );
}
