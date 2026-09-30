import { AlertCircle } from "lucide-react";
import SectionHeading from "@/components/common/section-heading";
import { PROBLEMS, WHO_I_WORK_WITH } from "@/data/site";

export default function Problem() {
  return (
    <section className="border-t border-white/10 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="The Real Problem"
          title="You don't have a traffic problem. You have a visibility problem."
          center
        />
        <p className="reveal mx-auto mt-5 max-w-2xl text-center text-white/60">
          Most local businesses do the basics and stop. Customers still find the
          competitor first, because the pieces Google actually looks at are
          missing or inconsistent.
        </p>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-2">
          {PROBLEMS.map((text) => (
            <div key={text} className="card-premium reveal flex gap-4 p-5">
              <AlertCircle size={20} className="mt-0.5 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-white/75">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <p className="reveal text-center text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
            Who I work with
          </p>
          <div className="reveal mt-6 flex flex-wrap justify-center gap-3">
            {WHO_I_WORK_WITH.map((label) => (
              <span
                key={label}
                className="glass rounded-full px-5 py-2 text-sm font-medium text-white/80"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
