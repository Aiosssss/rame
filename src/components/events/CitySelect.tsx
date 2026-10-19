import { cities } from "@/lib/data/events";
import { useCitySelect } from "@/hooks/useCitySelect";
import { Icon } from "@/components/ui/Icon";
export function CitySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const city = useCitySelect(value, onChange);
  const label = cities[city.selected]?.label || "Semua kota";
  return (
    <div
      ref={city.fieldRef}
      className="city-field"
      data-enhanced="true"
      data-open={String(city.isOpen)}
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          city.close();
      }}
    >
      <Icon name="pin" className="icon city-native-icon" />
      <select
        id="city-filter"
        aria-label="Pilih kota"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        hidden
      >
        {cities.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <Icon name="chevron" className="icon chevron city-native-icon" />
      <button
        ref={city.triggerRef}
        id="city-trigger"
        type="button"
        className="city-trigger"
        role="combobox"
        aria-label={`Pilih kota, ${label}`}
        aria-haspopup="listbox"
        aria-expanded={city.isOpen}
        aria-controls="city-options"
        aria-activedescendant={
          city.isOpen ? `city-option-${city.active}` : undefined
        }
        onClick={() => (city.isOpen ? city.close() : city.open())}
        onKeyDown={city.onKeyDown}
      >
        <Icon name="pin" />
        <span className="city-value">{label}</span>
        <Icon name="chevron" className="icon city-chevron" />
      </button>
      <div
        id="city-options"
        className="city-options"
        role="listbox"
        aria-label="Kota event"
        hidden={!city.isOpen}
        onPointerDown={(e) => e.preventDefault()}
      >
        {cities.map((item, index) => (
          <div
            key={item.value}
            id={`city-option-${index}`}
            className={`city-option${city.active === index ? " is-highlighted" : ""}`}
            tabIndex={-1}
            role="option"
            data-value={item.value}
            aria-selected={value === item.value}
            onClick={() => city.choose(index)}
            onPointerOver={() => city.setActive(index)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
