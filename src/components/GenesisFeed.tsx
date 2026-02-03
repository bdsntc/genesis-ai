import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Vote, ExternalLink, Copy, Check, AlertTriangle, TrendingDown, Bot } from "lucide-react";

interface FeedItem {
  id: string;
  timestamp: string;
  narrative: string;
  name: string;
  ticker: string;
  tag: string;
  confidence: number;
  status: "scanning" | "drafting" | "voting" | "deployed";
  voteProgress?: number;
}

const mockFeedItems: FeedItem[] = [
  {
    id: "1",
    timestamp: "2024-01-15T14:32:00Z",
    narrative: "AI agents are becoming the new meme narrative, combining autonomous behavior with community speculation.",
    name: "AgentMeme",
    ticker: "AGENTMEME",
    tag: "AI Culture",
    confidence: 87,
    status: "voting",
    voteProgress: 68,
  },
  {
    id: "2",
    timestamp: "2024-01-15T13:45:00Z",
    narrative: "DeSci movement gaining traction with major funding announcements and institutional interest.",
    name: "LabRat",
    ticker: "LABRAT",
    tag: "DeSci",
    confidence: 72,
    status: "drafting",
  },
  {
    id: "3",
    timestamp: "2024-01-15T12:18:00Z",
    narrative: "Political meme season approaching with upcoming elections driving social discourse.",
    name: "VoteCoin",
    ticker: "VOTECOIN",
    tag: "Politics",
    confidence: 65,
    status: "scanning",
  },
  {
    id: "4",
    timestamp: "2024-01-15T10:55:00Z",
    narrative: "Onchain summer vibes returning with Layer 2 adoption hitting new highs.",
    name: "SunChain",
    ticker: "SUNCHAIN",
    tag: "Seasonal",
    confidence: 91,
    status: "deployed",
    voteProgress: 100,
  },
];

const riskFlags = [
  { icon: TrendingDown, label: "Low Liquidity", color: "text-warning" },
  { icon: AlertTriangle, label: "Overused Meme", color: "text-destructive" },
  { icon: Bot, label: "Bot Risk", color: "text-neon-cyan" },
];

const statusStyles = {
  scanning: { bg: "bg-neon-cyan/10", text: "text-neon-cyan", label: "Scanning" },
  drafting: { bg: "bg-neon/10", text: "text-neon", label: "Drafting" },
  voting: { bg: "bg-warning/10", text: "text-warning", label: "Voting" },
  deployed: { bg: "bg-success/10", text: "text-success", label: "Deployed" },
};

export function GenesisFeed() {
  const [selectedItem, setSelectedItem] = useState<FeedItem>(mockFeedItems[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("0x3f8a7b2c1d9e4f5a6b7c8d9e0f1a2b3c4d5e6f7a");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }) + " UTC";
  };

  return (
    <section id="feed" className="py-24 lg:py-32 bg-background-elevated">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Genesis Feed
          </h2>
          <p className="text-lg text-foreground-muted">诞生流水</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left: Timeline Feed */}
          <div className="lg:col-span-3 space-y-4">
            {mockFeedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer card-hover ${
                  selectedItem.id === item.id
                    ? "border-neon/50 bg-card neon-glow"
                    : "border-border bg-card/50 hover:border-border-glow/30"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-foreground-subtle">
                      {formatTime(item.timestamp)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[item.status].bg} ${statusStyles[item.status].text}`}
                    >
                      {statusStyles[item.status].label}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs text-foreground-muted">
                    {item.tag}
                  </span>
                </div>

                <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                  {item.narrative}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-foreground font-medium">{item.name}</div>
                      <div className="text-neon text-sm font-mono">${item.ticker}</div>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <div className="text-xs text-foreground-subtle">Confidence</div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-neon"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-mono text-foreground">{item.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="terminal" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="terminal" size="sm">
                      <Vote className="w-3 h-3 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>

                {/* Vote progress bar */}
                {item.status === "voting" && item.voteProgress !== undefined && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-foreground-subtle">Vote Progress</span>
                      <span className="text-warning font-mono">{item.voteProgress}% / 75% quorum</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${item.voteProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Draft Preview Panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                <span className="text-sm text-foreground-muted">Current Draft Preview</span>
              </div>

              <div className="space-y-6">
                {/* Token info */}
                <div>
                  <div className="text-xs text-foreground-subtle mb-1">Token Name</div>
                  <div className="text-2xl font-bold text-foreground">{selectedItem.name}</div>
                </div>

                <div>
                  <div className="text-xs text-foreground-subtle mb-1">Ticker</div>
                  <div className="text-xl font-mono text-neon">${selectedItem.ticker}</div>
                </div>

                <div>
                  <div className="text-xs text-foreground-subtle mb-1">Lore</div>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {selectedItem.narrative}
                  </p>
                </div>

                {/* Risk flags */}
                <div>
                  <div className="text-xs text-foreground-subtle mb-3">Risk Flags</div>
                  <div className="flex flex-wrap gap-2">
                    {riskFlags.map((flag) => (
                      <span
                        key={flag.label}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-xs ${flag.color}`}
                      >
                        <flag.icon className="w-3 h-3" />
                        {flag.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* On-chain proof */}
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-foreground-subtle mb-2">On-chain Proof</div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background font-mono text-xs">
                    <span className="text-foreground-muted truncate flex-1">
                      0x3f8a7b2c1d9e4f5a...c4d5e6f7a
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 hover:bg-secondary rounded transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4 text-foreground-muted" />
                      )}
                    </button>
                    <a
                      href="#"
                      className="p-1.5 hover:bg-secondary rounded transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-foreground-muted" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
