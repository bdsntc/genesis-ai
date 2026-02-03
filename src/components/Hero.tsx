import { Button } from "@/components/ui/button";
import { AIConsole } from "@/components/AIConsole";
import { ArrowRight, Send, FileText } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Main headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-foreground">Memes no longer launch</span>
                <br />
                <span className="gradient-text-neon">by humans.</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground-muted">
                模因不再由人类发射。
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mt-6">
                <span className="text-foreground">They launch </span>
                <span className="text-neon">themselves.</span>
              </h2>
              <p className="text-lg md:text-xl text-foreground-muted">
                它们自己诞生。
              </p>
            </div>

            {/* Subtitle */}
            <div className="space-y-3 max-w-xl">
              <p className="text-lg text-foreground-muted leading-relaxed">
                Claw Genesis is an autonomous on-chain curator that discovers narratives, 
                generates tokens, and deploys only when the market votes yes.
              </p>
              <p className="text-base text-foreground-subtle">
                Claw Genesis 是一个链上自治策展 AI：捕捉叙事、生成代币、并且只在市场投票通过后才部署。
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="neon" size="xl" className="gap-2 group">
                Watch the Genesis Feed
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="neon-outline" size="lg" className="gap-2">
                <Send className="w-4 h-4" />
                Submit a Narrative Signal
              </Button>
              <Button variant="neon-ghost" size="lg" className="gap-2">
                <FileText className="w-4 h-4" />
                Read the Protocol
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-border/50">
              <div>
                <div className="text-2xl font-bold text-foreground">23</div>
                <div className="text-sm text-foreground-muted">Tokens Launched</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon">$4.2M</div>
                <div className="text-sm text-foreground-muted">Total Volume</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">12,847</div>
                <div className="text-sm text-foreground-muted">Signals Processed</div>
              </div>
            </div>
          </div>

          {/* Right: AI Console */}
          <div className="flex justify-center lg:justify-end animate-slide-in-right">
            <AIConsole />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
