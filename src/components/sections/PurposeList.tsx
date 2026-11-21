import { purposes } from "@/content/features";

/**
 * Representación de las seis finalidades tal como se autorizan en Vesta Padre:
 * independientes, opcionales y revocables. Es ilustrativa (no interactiva).
 */
export function PurposeList({ dark = false }: { dark?: boolean }) {
  const on = new Set(["location", "device_status", "alerts"]);
  return (
    <figure>
      <ul className={`divide-y ${dark ? "divide-ivory/15 border-y border-ivory/15" : "divide-line border-y border-line"}`}>
        {purposes.map((p, i) => {
          const active = on.has(p.id);
          return (
            <li key={p.id} className="flex items-center justify-between gap-6 py-4">
              <span className="flex items-baseline gap-4">
                <span className={`w-5 text-xs font-semibold ${dark ? "text-rose-300" : "text-rose-700"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={`font-serif text-lg ${dark ? "text-ivory" : "text-ink"}`}>{p.label}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className={`hidden whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.14em] xs:inline ${dark ? "text-ivory/60" : "text-muted"}`}>
                  {active ? "Autorizada" : "No autorizada"}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative inline-block h-6 w-11 rounded-full border transition-colors ${
                    active ? "border-rose bg-rose" : dark ? "border-ivory/35 bg-transparent" : "border-beige bg-beige-100"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] size-4 rounded-full transition-all ${
                      active ? "left-[22px] bg-ivory" : dark ? "left-[3px] bg-ivory/50" : "left-[3px] bg-beige"
                    }`}
                  />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption className={`mt-4 text-xs ${dark ? "text-ivory/55" : "text-muted"}`}>
        Ilustración del panel «Privacidad y autorizaciones» de Vesta Padre. El tutor decide qué finalidades activa.
      </figcaption>
    </figure>
  );
}
