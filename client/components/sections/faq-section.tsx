import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/common/section-heading";
import { FAQS } from "@/data/site";

export default function FaqSection() {
  return (
    <section id="faq" className="order-1 border-t border-white/10 py-24">
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Questions people ask before starting" center />
        <Accordion type="single" collapsible className="reveal mt-12 space-y-3">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`faq-${i}`}
              className="card-premium border px-6"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-white hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-white/65">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
