import { useState, useEffect } from "react";
import { Activity, FileText, Vote, Rocket, Terminal } from "lucide-react";

const statusStates = ["SCANNING", "DRAFTING", "VOTING", "DEPLOYING"] as const;
type Status = typeof statusStates[number];

const statusIcons: Record<Status, React.ReactNode> = {
  SCANNING: <Activity className="w-4 h-4" />,
  DRAFTING: <FileText className="w-4 h-4" />,
  VOTING: <Vote className="w-4 h-4" />,
  DEPLOYING: <Rocket className="w-4 h-4" />,
};

const statusColors: Record<Status, string> = {
  SCANNING: "text-neon-cyan",
  DRAFTING: "text-neon",
  VOTING: "text-warning",
  DEPLOYING: "text-success",
};

const mockLogs = [
  { type: "signal", text: "Signal detected: 'AI agents are the new memecoins'" },
  { type: "draft", text: "Draft generated: $AGENTMEME / AgentMeme / AI Culture" },
  { type: "vote", text: "Vote started: 12h window remaining" },
  { type: "signal", text: "Signal detected: 'Onchain summer vibes returning'" },
  { type: "draft", text: "Draft generated: $SUNCHAIN / SunChain / Seasonal" },
  { type: "deploy", text: "Deployment scheduled: pending quorum (67%)" },
  { type: "signal", text: "Signal detected: 'DeSci funding breakthrough'" },
  { type: "draft", text: "Draft generated: $LABRAT / LabRat / DeSci" },
  { type: "vote", text: "Vote concluded: APPROVED (82% yes)" },
  { type: "deploy", text: "Deployment executed: tx 0x3f8a...c21d" },
  { type: "signal", text: "Signal detected: 'Political meme season incoming'" },
  { type: "draft", text: "Draft generated: $VOTECOIN / VoteCoin / Politics" },
];

const counters = [
  { label: "Signals scanned", value: 12847 },
  { label: "Narratives detected", value: 342 },
  { label: "Drafts generated", value: 156 },
  { label: "Launches executed", value: 23 },
];

export function AIConsole() {
  const [currentStatus, setCurrentStatus] = useState<Status>("SCANNING");
  const [counterValues, setCounterValues] = useState(counters.map(c => c.value));

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setCurrentStatus((prev) => {
        const currentIndex = statusStates.indexOf(prev);
        return statusStates[(currentIndex + 1) % statusStates.length];
      });
    }, 3000);

    const counterInterval = setInterval(() => {
      setCounterValues((prev) =>
        prev.map((val, idx) => val + Math.floor(Math.random() * (idx === 0 ? 5 : idx === 1 ? 2 : 1)))
      );
    }, 2000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md">
      {/* Main console card */}
      <div className="terminal-card rounded-2xl overflow-hidden neon-border-hover animate-float">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background-elevated">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neon" />
            <span className="text-xs font-mono text-foreground-muted">AI_CONSOLE_v1.0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
          </div>
        </div>

        {/* Status section */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-foreground-subtle font-mono">STATUS:</span>
            <div className={`flex items-center gap-2 ${statusColors[currentStatus]}`}>
              <div className="status-dot status-dot-active" />
              {statusIcons[currentStatus]}
              <span className="font-mono text-sm font-medium">{currentStatus}</span>
            </div>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-3">
            {counters.map((counter, idx) => (
              <div key={counter.label} className="bg-background rounded-lg p-2">
                <div className="text-xs text-foreground-subtle mb-1">{counter.label}</div>
                <div className="font-mono text-lg text-foreground tabular-nums">
                  {counterValues[idx].toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Log section */}
        <div className="px-4 py-3 h-48 overflow-hidden relative">
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
          
          <div className="animate-scroll-log">
            {[...mockLogs, ...mockLogs].map((log, idx) => (
              <div
                key={idx}
                className="py-1.5 text-xs font-mono border-l-2 pl-3 mb-2"
                style={{
                  borderColor:
                    log.type === "signal"
                      ? "hsl(var(--neon-cyan))"
                      : log.type === "draft"
                      ? "hsl(var(--neon))"
                      : log.type === "vote"
                      ? "hsl(var(--warning))"
                      : "hsl(var(--success))",
                }}
              >
                <span className="text-foreground-subtle">[{new Date().toISOString().slice(11, 19)}]</span>{" "}
                <span className="text-foreground-muted">{log.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scan lines overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 scan-lines" />
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-radial from-neon/10 via-transparent to-transparent blur-2xl -z-10" />
    </div>
  );
}
