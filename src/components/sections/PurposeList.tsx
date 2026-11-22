import { purposesFor } from "@/content/features";
import type { Locale } from "@/i18n";

const text = {
  es: { on: "Autorizada", off: "No autorizada", caption: "Así se ve en «Privacidad y autorizaciones» de Vesta Padre: el tutor decide qué finalidades activa." },
  en: { on: "Authorised", off: "Not authorised", caption: "This is how it looks in Vesta Parent's “Privacy and authorisations”: the guardian decides which purposes to turn on." },
} as const;

/** The six purposes as they are authorised in Vesta Parent. Illustrative, not interactive. */
export function PurposeList({ locale, dark = false }: { locale: Locale; dark?: boolean }) {
  const on = new Set(["location", "device_status", "alerts"]);
  const t = text[locale];
  return (
    <figure>
      <ul className={`divide-y ${dark ? "divide-ivory/15 border-y border-ivory/15" : "divide-line border-y border-line"}`}>
        {purposesFor(locale).map((p) => {
          const active = on.has(p.id);
          return (
            <li key={p.id} className="flex items-center justify-between gap-6 py-4">
              <span className={`font-serif text-lg ${dark ? "text-ivory" : "text-ink"}`}>{p.label}</span>
              <span className="flex items-center gap-3">
                <span className={`hidden whitespace-nowrap text-sm xs:inline ${dark ? "text-ivory/60" : "text-muted"}`}>{active ? t.on : t.off}</span>
                <span
                  aria-hidden="true"
                  className={`relative inline-block h-6 w-11 rounded-full border ${
                    active ? "border-rose bg-rose" : dark ? "border-ivory/35 bg-transparent" : "border-beige bg-beige-100"
                  }`}
                >
                  <span className={`absolute top-[3px] size-4 rounded-full ${active ? "left-[22px] bg-ivory" : dark ? "left-[3px] bg-ivory/50" : "left-[3px] bg-beige"}`} />
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <figcaption className={`mt-4 text-sm ${dark ? "text-ivory/60" : "text-muted"}`}>{t.caption}</figcaption>
    </figure>
  );
}
