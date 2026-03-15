import { DollarSign } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-forest text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl">QuickLoan</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Fast, transparent, and fair lending for everyone. Your financial
              goals are within reach.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white/90">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Personal Loans</li>
              <li>Business Loans</li>
              <li>Emergency Funding</li>
              <li>Debt Consolidation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white/90">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>support@quickloan.finance</li>
              <li>Mon–Fri, 9am–6pm EST</li>
              <li className="pt-2">
                <a
                  href="/admin"
                  className="text-gold/80 hover:text-gold transition-colors text-xs"
                >
                  Admin Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            © {year} QuickLoan. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Built with ❤️ using{" "}
            <a
              href={utm}
              className="underline hover:text-white/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
