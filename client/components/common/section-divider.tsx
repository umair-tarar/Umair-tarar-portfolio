/** Thin glowing line that draws itself in between sections. */
export default function SectionDivider() {
  return (
    <div aria-hidden className="reveal section-divider mx-auto my-2 w-full max-w-6xl px-6">
      <div className="section-divider-line" />
    </div>
  );
}
