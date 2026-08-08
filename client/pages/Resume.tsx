import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download, Phone, Mail, MapPin } from "lucide-react";

const hardSkills = [
  "Social Media Marketing",
  "SEO & Off-Page SEO",
  "WordPress",
  "Email Marketing",
  "YouTube Optimization",
  "Lead Generation",
];

const softSkills = [
  "Time Management",
  "Problem Solving",
  "Creativity",
  "Growth Mindset",
  "Communication Skills",
  "Critical Thinking",
  "Team Collaboration",
  "Client Relationship Management",
  "Leadership Potential",
];

const languages = ["English", "Urdu", "Punjabi"];

const educationHistory = [
  {
    title: "Bachelor of Computer Science",
    institution: "Riphah International University, Faisalabad",
    year: "Completed 2022",
  },
  {
    title: "Pre-Engineering",
    institution: "Student’s Inn College of Science",
    year: "Completed 2018",
  },
  {
    title: "Matric (Science)",
    institution: "The Scholars Model High School",
    year: "Completed 2016",
  },
];

function HardSkillsSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5",
        className,
      )}
    >
      <h2 className="mb-3 text-base md:text-lg font-semibold tracking-wide text-foreground/80">
        Hard Skills
      </h2>
      <ul className="space-y-2 text-sm text-foreground/70">
        {hardSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

function SoftSkillsSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5",
        className,
      )}
    >
      <h2 className="mb-3 text-base md:text-lg font-semibold tracking-wide text-foreground/80">
        Soft Skills
      </h2>
      <ul className="space-y-2 text-sm text-foreground/70">
        {softSkills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

function LanguagesSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5",
        className,
      )}
    >
      <h2 className="mb-3 text-base md:text-lg font-semibold tracking-wide text-foreground/80">
        Languages
      </h2>
      <ul className="space-y-2 text-sm text-foreground/70">
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </section>
  );
}

function EducationSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5",
        className,
      )}
    >
      <h2 className="mb-3 text-base md:text-lg font-semibold tracking-wide text-foreground/80">
        Education
      </h2>
      <ul className="space-y-3 text-sm text-foreground/70">
        {educationHistory.map((entry) => (
          <li key={entry.title}>
            <p className="font-semibold text-foreground">{entry.title}</p>
            <p>{entry.institution}</p>
            <p className="text-foreground/60">{entry.year}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Resume() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-12">
          <header className="mb-10 border-b border-white/10 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-semibold sm:text-5xl">
                  Muhammad Umair Tarar
                </h1>
                <p className="mt-2 text-base sm:text-lg text-foreground/70">
                  Social Media Marketer
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/80">
                  <a
                    href="tel:+923460202186"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
                  >
                    <Phone className="h-4 w-4" /> +92 346 0202186
                  </a>
                  <a
                    href="mailto:tararu810@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
                  >
                    <Mail className="h-4 w-4" /> tararu810@gmail.com
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <MapPin className="h-4 w-4" /> D-Type, Faisalabad
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button asChild className="w-full sm:w-auto">
                  <a href="/Resume.pdf" download>
                    <Download /> Download PDF
                  </a>
                </Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <aside className="hidden space-y-6 md:col-span-1 md:block">
              <HardSkillsSection />
              <SoftSkillsSection />
              <LanguagesSection />
              <EducationSection />
            </aside>

            <main className="space-y-8 md:col-span-2">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-4 text-lg md:text-xl font-semibold">
                  Profile
                </h2>
                <div className="space-y-4 text-sm leading-6 text-foreground/70">
                  <p>
                    Dynamic and results-driven professional with 6+ years of
                    experience in the digital marketing industry — including 4
                    years as a Business Development Manager and 2 years as a
                    Social Media Marketing Specialist.
                  </p>
                  <p>
                    Proven ability to lead client acquisition, build long-term
                    relationships, and drive business growth through tailored
                    marketing strategies. Skilled in social media marketing,
                    SEO, and WordPress development. Passionate about combining
                    creativity with data to deliver measurable results.
                  </p>
                </div>
              </section>

              <EducationSection className="md:hidden" />
              <HardSkillsSection className="md:hidden" />
              <SoftSkillsSection className="md:hidden" />
              <LanguagesSection className="md:hidden" />

              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-5 text-lg md:text-xl font-semibold">
                  Work Experience
                </h2>
                <div className="space-y-8">
                  <article>
                    <header className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base md:text-lg font-semibold">
                        TECH-HUB Innovation Center, Faisalabad
                      </h3>
                      <span className="text-xs text-foreground/60">
                        2025 – Present
                      </span>
                    </header>
                    <p className="mt-1 text-sm text-foreground/80">
                      Digital Media Marketing Intern
                    </p>
                    <ul className="mt-3 list-inside list-disc marker:text-primary text-sm text-foreground/70">
                      <li>Assisted in executing digital growth strategies.</li>
                      <li>
                        Managed social media platforms and supported SEO
                        campaigns.
                      </li>
                      <li>
                        Created engaging content and gained hands-on experience
                        with marketing tools.
                      </li>
                    </ul>
                  </article>

                  <article>
                    <header className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base md:text-lg font-semibold">
                        DEP LLC
                      </h3>
                      <span className="text-xs text-foreground/60">
                        2025 – 2025
                      </span>
                    </header>
                    <p className="mt-1 text-sm text-foreground/80">
                      Social Media Marketing Specialist
                    </p>
                    <ul className="mt-3 list-inside list-disc marker:text-primary text-sm text-foreground/70">
                      <li>Led client acquisition and growth strategies.</li>
                      <li>
                        Managed social media marketing, SEO campaigns, and
                        WordPress development projects.
                      </li>
                    </ul>
                  </article>

                  <article>
                    <header className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base md:text-lg font-semibold">
                        Cebrix Marketing
                      </h3>
                      <span className="text-xs text-foreground/60">
                        2024 – Present
                      </span>
                    </header>
                    <p className="mt-1 text-sm text-foreground/80">
                      Social Media Marketing Specialist – Remote
                    </p>
                    <ul className="mt-3 list-inside list-disc marker:text-primary text-sm text-foreground/70">
                      <li>
                        Managing client acquisition and growth strategies.
                      </li>
                      <li>
                        Handling social media marketing, SEO campaigns, and
                        WordPress website projects.
                      </li>
                      <li>
                        Collaborating with teams to develop data-driven
                        marketing strategies.
                      </li>
                    </ul>
                  </article>

                  <article>
                    <header className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base md:text-lg font-semibold">
                        MF Bzone Group of Companies (QuickBidEstimating)
                      </h3>
                      <span className="text-xs text-foreground/60">
                        2024 – 2024
                      </span>
                    </header>
                    <p className="mt-1 text-sm text-foreground/80">
                      Business Development Manager
                    </p>
                    <ul className="mt-3 list-inside list-disc marker:text-primary text-sm text-foreground/70">
                      <li>
                        Focused on lead generation for construction and
                        estimation services.
                      </li>
                      <li>
                        Developed targeting strategies, optimized campaigns, and
                        improved conversion rates.
                      </li>
                      <li>
                        Built strong foundation in construction industry lead
                        generation.
                      </li>
                    </ul>
                  </article>

                  <article>
                    <header className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-base md:text-lg font-semibold">
                        Surblund Consultants
                      </h3>
                      <span className="text-xs text-foreground/60">
                        2022 – 2024
                      </span>
                    </header>
                    <p className="mt-1 text-sm text-foreground/80">
                      Lead Generation Specialist
                    </p>
                    <ul className="mt-3 list-inside list-disc marker:text-primary text-sm text-foreground/70">
                      <li>
                        Focused on generating leads for architects and
                        estimation services.
                      </li>
                      <li>
                        Designed and implemented effective targeting strategies.
                      </li>
                      <li>
                        Improved conversion rates through optimized campaigns.
                      </li>
                    </ul>
                  </article>
                </div>
              </section>
            </main>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
