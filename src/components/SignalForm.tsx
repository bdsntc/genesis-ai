import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Send, Info, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tags = [
  "AI Culture",
  "DeSci",
  "Politics",
  "Animal",
  "Gaming",
  "Finance",
  "Meme",
  "Seasonal",
];

export function SignalForm() {
  const { toast } = useToast();
  const [link, setLink] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [urgency, setUrgency] = useState([50]);
  const [understood, setUnderstood] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!link || selectedTags.length === 0 || !reason || !understood) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Signal Queued",
      description: "Your narrative signal has been submitted for AI review.",
    });

    // Reset form
    setLink("");
    setSelectedTags([]);
    setReason("");
    setUrgency([50]);
    setUnderstood(false);
  };

  return (
    <section id="submit" className="py-24 lg:py-32 bg-background-elevated">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Submit Signal
            </h2>
            <p className="text-lg text-foreground-muted">提交信号</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-border bg-card">
                <div className="space-y-6">
                  {/* Narrative link */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Narrative Link
                      <span className="text-foreground-subtle ml-2 font-normal">
                        (X / Telegram / Website)
                      </span>
                    </label>
                    <Input
                      type="url"
                      placeholder="https://twitter.com/..."
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="bg-background border-border focus:border-neon focus:ring-neon"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Keywords / Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedTags.includes(tag)
                              ? "bg-neon/20 text-neon border border-neon/50"
                              : "bg-secondary text-foreground-muted border border-transparent hover:border-border"
                          }`}
                        >
                          {tag}
                          {selectedTags.includes(tag) && (
                            <X className="w-3 h-3 ml-2 inline" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Why this narrative matters
                    </label>
                    <Textarea
                      placeholder="Explain the potential of this narrative..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="bg-background border-border focus:border-neon focus:ring-neon min-h-[120px]"
                    />
                  </div>

                  {/* Urgency slider */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-foreground">
                        Urgency
                      </label>
                      <span className="text-sm text-foreground-muted font-mono">
                        {urgency[0]}%
                      </span>
                    </div>
                    <Slider
                      value={urgency}
                      onValueChange={setUrgency}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs text-foreground-subtle">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
                    <Checkbox
                      id="understood"
                      checked={understood}
                      onCheckedChange={(checked) => setUnderstood(checked === true)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="understood"
                      className="text-sm text-foreground-muted cursor-pointer"
                    >
                      I understand AI may reject this signal if it doesn't meet quality thresholds.
                      <span className="block text-xs text-foreground-subtle mt-1">
                        我理解如果信号不符合质量标准，AI 可能会拒绝。
                      </span>
                    </label>
                  </div>

                  {/* Submit button */}
                  <Button type="submit" variant="neon" size="lg" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Submit Signal
                  </Button>
                </div>
              </form>
            </div>

            {/* Info card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl border border-neon/20 bg-neon/5">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-neon" />
                  <span className="text-sm font-medium text-foreground">How signals work</span>
                </div>
                <div className="space-y-4 text-sm">
                  <p className="text-foreground-muted">
                    Signals are weighted by consistency, novelty, and on-chain behavior.
                  </p>
                  <p className="text-foreground-subtle text-xs">
                    线索会按一致性、新颖度、链上行为进行加权。
                  </p>
                  <div className="pt-4 border-t border-border/50">
                    <div className="space-y-2 text-xs text-foreground-subtle">
                      <p>• High-quality signals get priority processing</p>
                      <p>• Duplicate narratives are merged</p>
                      <p>• Your signal history affects future weight</p>
                    </div>
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
