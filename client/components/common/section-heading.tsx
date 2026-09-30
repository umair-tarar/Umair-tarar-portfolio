export default function SectionHeading({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div
      className={`reveal flex flex-col ${center ? "items-center text-center" : "items-start"}`}
    >
      <p className="hover-underline inline-block text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {title.split(" ").map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="word-reveal inline-block"
            style={{ "--i": i } as React.CSSProperties}
          >
            {word}
            {" "}
          </span>
        ))}
      </h2>
      <span
        aria-hidden
        className="heading-rule mt-5 block h-[3px] w-20 rounded-full bg-gradient-to-r from-brand to-accent2"
      />
    </div>
  );
}
