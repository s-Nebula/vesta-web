import { Arc } from "@/components/brand/Logo";

/** Cabecera de página interior: rótulo, título, entradilla y el arco de la marca como filete. */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  aside,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="wrap grid gap-10 pb-14 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="kicker flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            {kicker}
          </p>
          <h1 className="display mt-6">{title}</h1>
          {lead && <div className="lead mt-7 max-w-2xl">{lead}</div>}
          {children && <div className="mt-9">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
      <Arc className="pointer-events-none absolute -bottom-6 right-[-4rem] hidden w-[34rem] opacity-90 md:block" />
    </section>
  );
}
