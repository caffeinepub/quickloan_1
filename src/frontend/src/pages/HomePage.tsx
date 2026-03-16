import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const LOAN_AMOUNTS = [
  "$500",
  "$1,000",
  "$2,000",
  "$3,000",
  "$5,000",
  "$7,500",
  "$10,000",
];

const FEATURES = [
  {
    icon: Clock,
    title: "Fast Approval",
    desc: "Get a decision within 24 hours. No endless paperwork or waiting weeks.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your personal data is encrypted and never shared without consent.",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    desc: "Starting at 8% APR. Transparent pricing with no hidden fees.",
  },
  {
    icon: CheckCircle2,
    title: "Flexible Terms",
    desc: "Choose 6 to 36 months. Structure payments around your income.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Apply Online",
    desc: "Fill in our simple form — takes under 3 minutes.",
  },
  {
    num: "02",
    title: "Get Reviewed",
    desc: "Our team reviews your application same-day.",
  },
  {
    num: "03",
    title: "Receive Funds",
    desc: "Approved funds deposited directly to your account.",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Thompson",
    location: "Atlanta, GA",
    amount: "$5,000",
    rating: 5,
    quote:
      "I needed emergency funds to cover a medical bill. QuickLoan approved me in less than 8 hours. The whole process was smooth and the team was incredibly supportive. I'll definitely come back when I need financing again.",
    initials: "MT",
  },
  {
    name: "Sofia Reyes",
    location: "Miami, FL",
    amount: "$3,000",
    rating: 5,
    quote:
      "As a small business owner, I needed a quick cash injection for inventory before the holiday season. QuickLoan came through in record time. The interest rate was fair and there were absolutely no hidden charges.",
    initials: "SR",
  },
  {
    name: "James Okonkwo",
    location: "Houston, TX",
    amount: "$7,500",
    rating: 5,
    quote:
      "I was skeptical about online lending, but QuickLoan exceeded every expectation. Professional, fast, and completely transparent. I used the loan to consolidate my credit cards and my monthly payment dropped by almost 40%.",
    initials: "JO",
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center hero-bg">
        <div className="absolute inset-0 bg-forest/80" />
        <div className="container relative z-10 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-gold/20 text-gold border border-gold/30 mb-6"
            >
              Fast &amp; Secure Lending
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            >
              Your Financial
              <br />
              <span className="text-gold">Future Starts</span>
              <br />
              Today.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Access up to <strong className="text-white">$10,000</strong> in
              personal financing with transparent rates, flexible terms, and
              same-day approval decisions.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link to="/apply" data-ocid="hero.primary_button">
                <Button
                  size="lg"
                  className="gold-gradient text-foreground font-semibold border-0 hover:opacity-90 shadow-lg"
                >
                  Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a href="#how-it-works" data-ocid="hero.secondary_button">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  How It Works
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden"
          >
            {[
              { val: "$10K", label: "Max Loan" },
              { val: "8%", label: "Starting Rate" },
              { val: "24hr", label: "Approval Time" },
              { val: "36mo", label: "Max Term" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm px-6 py-5"
              >
                <div className="font-display text-3xl font-bold text-gold">
                  {stat.val}
                </div>
                <div className="text-white/60 text-xs mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Loan amounts */}
      <section className="py-6 bg-gold/10 border-y border-gold/20">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              Available amounts:
            </span>
            {LOAN_AMOUNTS.map((amt) => (
              <span
                key={amt}
                className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white border border-gold/30 text-forest shadow-xs"
              >
                {amt}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Photo banner - Real people, real results */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                Real People, Real Results
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
                Helping You Move
                <br />
                <span className="text-forest">Forward in Life</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <img
                  src="/assets/generated/feature-apply.dim_600x400.jpg"
                  alt="Easy online application"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-semibold text-white text-lg">
                    Apply From Home
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    Simple online form, no branch visit needed.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <img
                  src="/assets/generated/feature-approved.dim_600x400.jpg"
                  alt="Fast approval"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-semibold text-white text-lg">
                    Fast Approval
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    Get your answer the same day you apply.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
              >
                <img
                  src="/assets/generated/feature-freedom.dim_600x400.jpg"
                  alt="Financial freedom"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-semibold text-white text-lg">
                    Financial Freedom
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    Take control of your finances on your terms.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-secondary" id="services">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                Why QuickLoan
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
                Built for Speed,
                <br />
                <span className="text-forest">Designed for Trust</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We remove the friction from lending so you can focus on what
                matters.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <motion.div key={f.title} variants={fadeUp}>
                  <Card className="h-full border-0 shadow-card hover:shadow-card-hover transition-shadow duration-300 bg-white">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 green-gradient rounded-xl flex items-center justify-center mb-5">
                        <f.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2">
                        {f.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-background" id="how-it-works">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                Simple Process
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
                Three Steps to
                <br />
                <span className="text-forest">Your Loan</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  className="relative"
                >
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+4rem)] w-[calc(100%-4rem)] h-px bg-border z-0" />
                  )}
                  <div className="text-center relative z-10">
                    <div className="font-display text-7xl font-bold text-gold/20 leading-none mb-4">
                      {step.num}
                    </div>
                    <div className="w-16 h-16 green-gradient rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-card">
                      <span className="font-display font-bold text-white text-xl">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-12">
              <Link to="/apply" data-ocid="howto.cta.button">
                <Button
                  size="lg"
                  className="green-gradient text-white border-0 hover:opacity-90"
                >
                  Start Your Application <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary" id="testimonials">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span className="text-xs font-medium uppercase tracking-widest text-gold">
                Real Stories
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
                Thousands Have
                <br />
                <span className="text-forest">Trusted QuickLoan</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={t.name} variants={fadeUp}>
                  <Card
                    data-ocid={`testimonials.item.${i + 1}`}
                    className="h-full border-0 shadow-card hover:shadow-card-hover transition-all duration-300 bg-white"
                  >
                    <CardContent className="p-7">
                      <div className="flex gap-0.5 mb-5">
                        {STAR_KEYS.slice(0, t.rating).map((k) => (
                          <Star
                            key={k}
                            className="w-4 h-4 fill-gold text-gold"
                          />
                        ))}
                      </div>
                      <blockquote className="text-sm leading-relaxed text-muted-foreground mb-6">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <div className="w-10 h-10 green-gradient rounded-full flex items-center justify-center text-white text-sm font-bold font-display flex-shrink-0">
                          {t.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{t.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {t.location} &middot; Borrowed {t.amount}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo + CTA split */}
      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <img
              src="/assets/generated/hero-people.dim_1200x600.jpg"
              alt="Happy QuickLoan customers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest/30" />
          </div>
          <div className="green-gradient flex flex-col justify-center px-10 py-16 text-white">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.h2
                variants={fadeUp}
                className="font-display text-3xl md:text-4xl font-bold mb-4"
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/75 mb-8 leading-relaxed"
              >
                Join thousands of satisfied customers who got the funds they
                needed — fast, fair, and hassle-free.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link to="/apply" data-ocid="cta.primary_button">
                  <Button
                    size="lg"
                    className="gold-gradient text-foreground font-semibold border-0 hover:opacity-90 shadow-lg"
                  >
                    Apply for a Loan <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/12028169872"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto"
                  >
                    Chat on WhatsApp
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
