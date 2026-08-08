import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-8 lg:flex-row lg:items-end lg:gap-20 lg:pt-12">
        <div className="fixed top-0 -left-48 -z-20 hidden h-screen w-[40rem] skew-y-12 rounded-[4rem] bg-gradient-to-b from-primary/50 via-transparent to-transparent blur-3xl md:block pointer-events-none" />
        <div className="fixed top-0 -right-48 -z-20 hidden h-screen w-[40rem] -skew-y-12 rounded-[4rem] bg-gradient-to-b from-primary/50 via-transparent to-transparent blur-3xl md:block pointer-events-none" />
        <motion.div
          className="flex-1 space-y-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.h1
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Hi, I&apos;m
            <span className="block lg:text-[56px]">Muhammad Umair Tarar</span>
          </motion.h1>
          <motion.p
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="max-w-xl text-base text-foreground/70 sm:text-lg"
          >
            A results-driven Social Media Marketer and Growth Strategist
            specializing in SEO, content systems, and performance media, helping
            brands connect with their audience through effective digital
            marketing.
          </motion.p>
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/resume"
              className="group inline-flex items-center gap-2 rounded-3xl bg-gradient-to-br from-primary/60 to-primary/40 px-6 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition transform duration-300 hover:-translate-y-0.5"
            >
              View Resume
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative flex-1"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
        >
          <div className="absolute inset-0 -z-10 rounded-[3rem] border border-white/10 bg-gradient-to-br from-primary/15 via-background to-secondary/30 blur-xl" />
          <motion.article
            className="relative rounded-3xl border border-white/10 bg-white/5 px-8 pt-8 pb-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          >
            <div className="space-y-6 text-sm text-foreground/70">
              <div className="flex items-center">
                <span className="text-xs uppercase tracking-[0.3em] text-foreground/60">
                  Timeline
                </span>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent/80" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Social Media Marketer
                    </p>
                    <p className="text-xs text-foreground/60">
                      Managed client acquisition, SEO campaigns, WordPress
                      sites, and social media growth strategies across channels.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Business Development Manager
                    </p>
                    <p className="text-xs text-foreground/60">
                      Led construction and estimation pipelines, refined
                      strategies, optimized leads, and strengthened industry
                      network.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(8,81,192,0.15)]" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Lead Generation Expert
                    </p>
                    <p className="text-xs text-foreground/60">
                      Targeted architects and estimation services, building
                      campaigns, optimizing outreach, and improving conversion
                      metrics.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-foreground/70">
                <p className="font-semibold text-foreground">
                  "Muhammad Umair elevated our social performance in no time."
                </p>
                <p className="text-foreground/50">— Azka Khan</p>
              </div>
            </div>
          </motion.article>
          <div className="absolute -right-8 -top-8 hidden h-32 w-32 rounded-full bg-gradient-to-br from-primary to-accent blur-3xl lg:block" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
