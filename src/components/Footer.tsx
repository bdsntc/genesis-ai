import { ExternalLink } from "lucide-react";

const links = [
  { label: "Docs", href: "#docs" },
  { label: "X (Twitter)", href: "#" },
  { label: "Telegram", href: "#" },
  { label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Logo & tagline */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center neon-glow">
                <span className="text-primary-foreground font-bold text-sm">CG</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Claw Genesis</span>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-foreground-muted">The market will decide what gets born.</p>
              <p className="text-foreground-subtle text-sm">市场决定什么会诞生。</p>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 text-foreground-muted hover:text-neon transition-colors group"
              >
                {link.label}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-foreground-subtle">
            © {new Date().getFullYear()} Claw Genesis. All rights reserved.
          </p>
          <p className="text-xs text-foreground-subtle mt-2">
            Built by AI, for the market.
          </p>
        </div>
      </div>
    </footer>
  );
}
