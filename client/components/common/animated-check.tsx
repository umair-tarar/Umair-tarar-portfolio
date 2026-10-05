/** Success tick that draws itself. */
export default function AnimatedCheck({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 52" className={className} aria-hidden>
      <circle className="check-circle" cx="26" cy="26" r="23" fill="none" stroke="rgb(var(--brand))" strokeWidth="3" />
      <path className="check-tick" fill="none" stroke="rgb(var(--brand))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" d="M15 27l8 8 14-16" />
    </svg>
  );
}
