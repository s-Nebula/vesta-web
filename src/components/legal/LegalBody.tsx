import { Fragment } from "react";
import type { LegalBlock } from "@/content/legal";
import { Device } from "@/components/ui/Device";

/** Turns email addresses in the text into links. */
function linkify(text: string) {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g);
  return parts.map((p, i) =>
    /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(p) ? (
      <a key={i} href={`mailto:${p.replace(/\.$/, "")}`} className="link">
        {p}
      </a>
    ) : (
      <Fragment key={i}>{p}</Fragment>
    ),
  );
}

type Fig = { src: string; alt: string; kind: "phone" | "tablet"; sizes: [number, number]; caption: string }[];

function Figures({ figs }: { figs: Fig }) {
  return (
    <div className="no-print my-8 flex flex-wrap gap-6 font-sans">
      {figs.map((f) => (
        <figure key={f.src} className={f.kind === "phone" ? "w-[11.5rem]" : "w-full max-w-md"}>
          <Device shot={f} sizesAttr={f.kind === "phone" ? "184px" : "(min-width: 48rem) 448px, 90vw"} />
          <figcaption className="mt-3 text-xs text-muted">{f.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function LegalBody({ blocks, figures }: { blocks: LegalBlock[]; figures?: Record<string, Fig> }) {
  // Screenshots for a section are shown at the end of that section (before the next heading).
  const out: React.ReactNode[] = [];
  let pending: Fig | undefined;
  const flush = (key: string) => {
    if (pending) out.push(<Figures key={key} figs={pending} />);
    pending = undefined;
  };
  blocks.forEach((b, i) => {
    switch (b.type) {
      case "h2":
      case "h3": {
        flush(`f${i}`);
        const H = b.type;
        out.push(
          <H key={i} id={b.id} className="scroll-mt-28">
            {b.text}
          </H>,
        );
        if (figures) pending = figures[b.id];
        break;
      }
      case "p":
        out.push(<p key={i}>{linkify(b.text)}</p>);
        break;
      case "ul":
      case "ol": {
        const L = b.type;
        out.push(
          <L key={i}>
            {b.items.map((it, j) => (
              <li key={j}>{linkify(it)}</li>
            ))}
          </L>,
        );
        break;
      }
      case "table": {
        const [head, ...rows] = b.rows;
        out.push(
          <div key={i} className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  {head.map((h, j) => (
                    <th key={j} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, j) => (
                  <tr key={j}>
                    {r.map((c, k) =>
                      k === 0 ? (
                        <th key={k} scope="row" className="!text-sm !normal-case !tracking-normal !text-ink">
                          {c}
                        </th>
                      ) : (
                        <td key={k}>{c}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
        break;
      }
    }
  });
  flush("f-end");
  return <div className="prose-legal">{out}</div>;
}
