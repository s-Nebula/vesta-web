type Props = {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHead({ kicker, title, lead, id, className = "", as = "h2" }: Props) {
  const H = as;
  return (
    <div className={className}>
      {kicker && <p className="kicker">{kicker}</p>}
      <H id={id} className={`${as === "h1" ? "display" : "h-section"} ${kicker ? "mt-4" : ""}`}>
        {title}
      </H>
      {lead && <div className="lead mt-6 max-w-2xl">{lead}</div>}
    </div>
  );
}
