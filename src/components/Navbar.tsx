import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet, Send, Eye } from "lucide-react";

const navItems = [
  { label: "Genesis", href: "#genesis" },
  { label: "Feed", href: "#feed" },
  { label: "Launchpad", href: "#launchpad" },
  { label: "Proof", href: "#proof" },
  { label: "Docs", href: "#docs" },
  { label: "Community", href: "#community" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center neon-glow">
              <span className="text-primary-foreground font-bold text-sm">CG</span>
            </div>
            <span className="font-semibold text-lg text-foreground group-hover:text-neon transition-colors">
              Claw Genesis
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-foreground-muted hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-neon group-hover:w-1/2 transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="neon-ghost" size="sm" className="gap-2">
              <Send className="w-4 h-4" />
              Submit Signal
            </Button>
            <Button variant="neon-ghost" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              Watch AI
            </Button>
            <Button variant="neon-outline" size="sm" className="gap-2">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-3 text-foreground-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
              <Button variant="neon-ghost" size="sm" className="justify-start gap-2">
                <Send className="w-4 h-4" />
                Submit Signal
              </Button>
              <Button variant="neon-ghost" size="sm" className="justify-start gap-2">
                <Eye className="w-4 h-4" />
                Watch AI
              </Button>
              <Button variant="neon-outline" size="sm" className="justify-start gap-2">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
