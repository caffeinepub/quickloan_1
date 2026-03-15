import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitApplication } from "@/hooks/useQueries";
import { CheckCircle2, Info, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const LOAN_OPTIONS = [
  { label: "$500", value: 500 },
  { label: "$1,000", value: 1000 },
  { label: "$2,000", value: 2000 },
  { label: "$3,000", value: 3000 },
  { label: "$5,000", value: 5000 },
  { label: "$7,500", value: 7500 },
  { label: "$10,000", value: 10000 },
];

const TERM_OPTIONS = [
  { label: "6 months", value: 6 },
  { label: "12 months", value: 12 },
  { label: "24 months", value: 24 },
  { label: "36 months", value: 36 },
];

function calcInterestRate(amount: number): number {
  const base = 8;
  const extra = Math.floor((amount - 500) / 2000) * 2;
  return Math.min(base + extra, 18);
}

export function ApplyPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [term, setTerm] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync, isPending } = useSubmitApplication();

  const interestRate = amount ? calcInterestRate(amount) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !term) return;
    try {
      await mutateAsync({
        fullName,
        email,
        whatsApp,
        amount: BigInt(amount),
        term: BigInt(term),
      });
      setSubmitted(true);
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          data-ocid="apply.success_state"
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 green-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-card">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">
            Application Submitted!
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Thank you, <strong>{fullName}</strong>. We&apos;ve received your
            application for <strong>${amount?.toLocaleString()}</strong> and our
            team will review it within 24 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            We&apos;ll contact you at <strong>{email}</strong> with next steps.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary pt-24 pb-16">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <span className="text-xs font-medium uppercase tracking-widest text-gold">
              Loan Application
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">
              Apply for Your
              <br />
              <span className="text-forest">Quick Loan</span>
            </h1>
            <p className="text-muted-foreground mt-4">
              Fill in the form below — decisions within 24 hours.
            </p>
          </div>

          <Card className="border-0 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-xl">
                Personal &amp; Loan Details
              </CardTitle>
              <CardDescription>
                All information is encrypted and securely stored.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      data-ocid="apply.input"
                      placeholder="John Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      data-ocid="apply.email.input"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">
                    WhatsApp Number
                    <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground font-normal">
                      <Info className="w-3 h-3" />
                      Private — visible only to our team
                    </span>
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    data-ocid="apply.whatsapp.input"
                    placeholder="+1 555 000 0000"
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Loan Amount</Label>
                    <Select
                      onValueChange={(v) => setAmount(Number(v))}
                      required
                    >
                      <SelectTrigger data-ocid="apply.amount.select">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOAN_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Loan Term</Label>
                    <Select onValueChange={(v) => setTerm(Number(v))} required>
                      <SelectTrigger data-ocid="apply.term.select">
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        {TERM_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Interest rate display */}
                <div className="rounded-xl border border-gold/30 bg-gold/5 px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">
                      Estimated Interest Rate
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Fixed APR based on loan amount
                    </div>
                  </div>
                  <div className="font-display text-3xl font-bold text-forest">
                    {interestRate !== null ? `${interestRate}%` : "—"}
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  data-ocid="apply.submit_button"
                  className="w-full green-gradient text-white border-0 hover:opacity-90 font-semibold"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
