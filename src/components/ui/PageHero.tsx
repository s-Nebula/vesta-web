/** Inner page header: label, title, standfirst. */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  aside,
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="wrap grid gap-10 pb-14 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className={`display ${kicker ? "mt-4" : ""}`}>{title}</h1>
          {lead && <div className="lead mt-7 max-w-2xl">{lead}</div>}
          {children && <div className="mt-9">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
    </section>
  );
}
