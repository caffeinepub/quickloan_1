import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");

  const scrollToTestimonials = () => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate({ to: "/" }).then(() => {
        setTimeout(() => {
          document
            .getElementById("testimonials")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    } else {
      document
        .getElementById("testimonials")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" data-ocid="nav.link" className="flex items-center gap-2">
          <img
            src="/assets/generated/quickloan-logo-transparent.dim_200x60.png"
            alt="QuickLoan"
            className="h-10 w-auto"
          />
        </Link>

        {!isAdmin && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              data-ocid="nav.home.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/apply"
              data-ocid="nav.apply.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Apply
            </Link>
            <a
              href="#testimonials"
              data-ocid="nav.testimonials.link"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </a>
            <a
              href="https://wa.me/12028169872"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.whatsapp.link"
              className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <Link to="/apply" data-ocid="nav.cta.button">
              <Button
                size="sm"
                className="green-gradient text-white border-0 hover:opacity-90"
              >
                Get Started
              </Button>
            </Link>
          </nav>
        )}

        {!isAdmin && (
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        {isAdmin && (
          <span className="text-sm font-medium text-muted-foreground">
            Admin Panel
          </span>
        )}
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-border bg-white px-4 py-4 flex flex-col gap-3"
        >
          <Link
            to="/"
            className="text-sm font-medium"
            onClick={() => setOpen(false)}
            data-ocid="nav.mobile.home.link"
          >
            Home
          </Link>
          <Link
            to="/apply"
            className="text-sm font-medium"
            onClick={() => setOpen(false)}
            data-ocid="nav.mobile.apply.link"
          >
            Apply Now
          </Link>
          <button
            type="button"
            className="text-sm font-medium text-left"
            onClick={scrollToTestimonials}
            data-ocid="nav.mobile.testimonials.link"
          >
            Testimonials
          </button>
          <a
            href="https://wa.me/12028169872"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-green-600"
            data-ocid="nav.mobile.whatsapp.link"
          >
            WhatsApp Us
          </a>
        </motion.div>
      )}
    </header>
  );
}
