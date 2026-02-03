import { useState } from "react";
import { FileText, Vote, Rocket, Copy, Check, ExternalLink } from "lucide-react";

interface ProofCard {
  icon: React.ElementType;
  titleEn: string;
  titleCn: string;
  txHash: string;
}

const proofCards: ProofCard[] = [
  {
    icon: FileText,
    titleEn: "Every draft has a receipt",
    titleCn: "每个草稿都有回执",
    txHash: "0x7f3d8a1b2c4e5f6789012345678901234567890a",
  },
  {
    icon: Vote,
    titleEn: "Votes are verifiable",
    titleCn: "投票可验证",
    txHash: "0x8a4e9b2c3d5f607890123456789012345678901b",
  },
  {
    icon: Rocket,
    titleEn: "Deployments are auditable",
    titleCn: "部署可审计",
    txHash: "0x9b5f0c3d4e6a718901234567890123456789012c",
  },
];

export function ProofSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (hash: string, index: number) => {
    navigator.clipboard.writeText(hash);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="proof" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Proof, not promises.
          </h2>
          <p className="text-lg text-foreground-muted">不是承诺，是链上证据。</p>
        </div>

        {/* Proof cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {proofCards.map((card, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-border bg-card card-hover group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-neon flex items-center justify-center mb-6 neon-glow group-hover:neon-glow-strong transition-all">
                <card.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {card.titleEn}
              </h3>
              <p className="text-foreground-muted text-sm mb-6">{card.titleCn}</p>

              {/* Tx hash */}
              <div className="p-3 rounded-lg bg-background border border-border">
                <div className="text-xs text-foreground-subtle mb-2">Transaction Hash</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-foreground-muted truncate flex-1">
                    {card.txHash.slice(0, 10)}...{card.txHash.slice(-8)}
                  </span>
                  <button
                    onClick={() => handleCopy(card.txHash, index)}
                    className="p-1.5 hover:bg-secondary rounded transition-colors"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4 text-foreground-muted hover:text-foreground" />
                    )}
                  </button>
                  <a
                    href="#"
                    className="p-1.5 hover:bg-secondary rounded transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-foreground-muted hover:text-foreground" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
