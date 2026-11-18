interface Props {
  className?: string;
  tone?: 'champagne' | 'navy';
}

/** Fine champagne rule with a central diamond — the site's recurring divider. */
export default function Ornament({ className = '', tone = 'champagne' }: Props) {
  const color = tone === 'champagne' ? '#C9A66B' : '#002B49';
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <svg width="10" height="10" viewBox="0 0 10 10">
        <rect x="5" y="0.5" width="6.36" height="6.36" transform="rotate(45 5 0.5)" fill="none" stroke={color} strokeWidth="1" />
      </svg>
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(270deg, transparent, ${color})` }} />
    </div>
  );
}

export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[0.7rem] font-semibold uppercase tracking-eyebrow sm:text-xs ${className}`}>{children}</p>;
}
