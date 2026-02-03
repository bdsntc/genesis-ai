import { useState } from "react";
import { Send, Vote, Eye, Settings, Copy, Check } from "lucide-react";

interface Utility {
  icon: React.ElementType;
  titleEn: string;
  titleCn: string;
}

const utilities: Utility[] = [
  {
    icon: Send,
    titleEn: "Submit signals (rate-limited)",
    titleCn: "提交信号（有速率限制）",
  },
  {
    icon: Vote,
    titleEn: "Vote weight (optional)",
    titleCn: "投票权重（可选）",
  },
  {
    icon: Eye,
    titleEn: "Access early drafts",
    titleCn: "早期草稿访问权",
  },
  {
    icon: Settings,
    titleEn: "Governance over parameters",
    titleCn: "参数治理权",
  },
];

const contractAddress = "11111111111111111111111111111111";

export function TokenSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="token" className="py-24 lg:py-32 bg-background-elevated">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <span className="text-neon">$ClawGenesis</span> Utility
          </h2>
          <p className="text-lg text-foreground-muted">$ClawGenesis 的用途</p>
        </div>

        {/* Utility cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {utilities.map((utility, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-border bg-card card-hover text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-4">
                <utility.icon className="w-6 h-6 text-neon" />
              </div>
              <h3 className="text-foreground font-medium mb-1">{utility.titleEn}</h3>
              <p className="text-foreground-subtle text-sm">{utility.titleCn}</p>
            </div>
          ))}
        </div>

        {/* Contract address */}
        <div className="max-w-xl mx-auto">
          <div className="p-6 rounded-2xl border border-border bg-card">
            <div className="text-center mb-4">
              <span className="text-sm text-foreground-subtle">Contract Address</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
              <span className="font-mono text-sm text-foreground-muted flex-1 text-center truncate">
                {contractAddress}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-secondary rounded-lg transition-colors shrink-0"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-success" />
                ) : (
                  <Copy className="w-5 h-5 text-foreground-muted hover:text-foreground" />
                )}
              </button>
            </div>
            <p className="text-center text-xs text-foreground-subtle mt-3">
              Placeholder address — real contract TBA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
