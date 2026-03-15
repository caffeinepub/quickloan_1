import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { DollarSign, Menu, X } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" data-ocid="nav.link" className="flex items-center gap-2">
          <div className="w-8 h-8 green-gradient rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-forest">
            QuickLoan
          </span>
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
        </motion.div>
      )}
    </header>
  );
}
