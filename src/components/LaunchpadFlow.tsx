import { useState } from "react";
import { Search, FileText, Vote, Rocket, Check } from "lucide-react";

interface Step {
  id: number;
  icon: React.ElementType;
  titleEn: string;
  titleCn: string;
  descriptionEn: string;
  descriptionCn: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: Search,
    titleEn: "Scan",
    titleCn: "扫描",
    descriptionEn: "AI continuously monitors Twitter, Telegram, and on-chain activity to detect emerging narratives and sentiment shifts before they become mainstream.",
    descriptionCn: "AI 持续监控 Twitter、Telegram 和链上活动，在叙事成为主流之前发现新兴趋势和情绪变化。",
  },
  {
    id: 2,
    icon: FileText,
    titleEn: "Draft",
    titleCn: "生成",
    descriptionEn: "When a narrative reaches critical mass, the AI generates a complete token package: name, ticker, lore, and risk assessment. Everything is recorded on-chain.",
    descriptionCn: "当叙事达到临界点时，AI 会生成完整的代币方案：名称、代号、故事和风险评估。所有内容都记录在链上。",
  },
  {
    id: 3,
    icon: Vote,
    titleEn: "Vote",
    titleCn: "投票",
    descriptionEn: "Token holders vote on whether to proceed with deployment. A 75% quorum is required. All votes are verifiable on-chain with no hidden influence.",
    descriptionCn: "代币持有者投票决定是否继续部署。需要 75% 的法定人数。所有投票都可在链上验证，没有隐藏影响。",
  },
  {
    id: 4,
    icon: Rocket,
    titleEn: "Deploy",
    titleCn: "部署",
    descriptionEn: "Only after quorum is reached, the token is automatically deployed to the blockchain. Every deployment is auditable with a complete proof trail.",
    descriptionCn: "只有在达到法定人数后，代币才会自动部署到区块链。每次部署都可审计，有完整的证明链。",
  },
];

export function LaunchpadFlow() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="launchpad" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            How Genesis Works
          </h2>
          <p className="text-lg text-foreground-muted">Genesis 如何运作</p>
        </div>

        {/* Steps navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-card rounded-2xl p-2 border border-border">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeStep === step.id
                      ? "bg-neon/10 text-neon neon-glow"
                      : "text-foreground-muted hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeStep === step.id ? "bg-neon text-background" : "bg-secondary"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium hidden sm:block">{step.titleEn}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-border mx-1 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active step content */}
        <div className="max-w-3xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`transition-all duration-500 ${
                activeStep === step.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 absolute pointer-events-none"
              }`}
            >
              {activeStep === step.id && (
                <div className="p-8 rounded-2xl border border-border bg-card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-neon flex items-center justify-center neon-glow">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{step.titleEn}</h3>
                      <p className="text-foreground-muted">{step.titleCn}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-foreground-muted leading-relaxed">
                      {step.descriptionEn}
                    </p>
                    <p className="text-foreground-subtle text-sm">
                      {step.descriptionCn}
                    </p>
                  </div>

                  {/* Flow diagram */}
                  <div className="mt-8 p-6 rounded-xl bg-background border border-border">
                    <div className="flex items-center justify-between">
                      {steps.map((s, index) => (
                        <div key={s.id} className="flex items-center">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                              s.id < activeStep
                                ? "bg-success text-primary-foreground"
                                : s.id === activeStep
                                ? "bg-neon text-primary-foreground neon-glow"
                                : "bg-secondary text-foreground-muted"
                            }`}
                          >
                            {s.id < activeStep ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <s.icon className="w-5 h-5" />
                            )}
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={`w-12 md:w-24 h-0.5 mx-2 transition-all ${
                                s.id < activeStep ? "bg-success" : "bg-border"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Important note */}
                  <div className="mt-6 p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <p className="text-sm text-warning font-medium">
                      ⚠️ Deploy requires quorum.
                    </p>
                    <p className="text-xs text-foreground-subtle mt-1">
                      部署必须达到投票门槛。
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
