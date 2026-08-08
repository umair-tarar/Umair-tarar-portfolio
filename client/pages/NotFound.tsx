import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/layout/site-layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="flex min-h-[60vh] items-center justify-center px-6 py-24">
        <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur">
          <span className="text-xs uppercase tracking-[0.3em] text-primary/70">
            Page not found
          </span>
          <h1 className="mt-6 text-4xl font-semibold text-foreground">
            Looks like that story isn’t live yet.
          </h1>
          <p className="mt-4 text-sm text-foreground/70">
            The link you tried to open isn’t part of the M.Umair Media
            experience. Jump back to the homepage to explore my services, case
            studies, and contact options.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
            <Link
              to="/"
              className="rounded-3xl bg-primary px-6 py-3 text-primary-foreground transition hover:-translate-y-0.5"
            >
              Return home
            </Link>
            <a
              href="/#contact"
              className="rounded-3xl border border-white/10 px-6 py-3 text-foreground/80 transition hover:border-primary/60 hover:text-primary"
            >
              Book a call
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
