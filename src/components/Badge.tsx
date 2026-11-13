import { ReactNode } from "react";

type Tone = "default" | "success" | "warning" | "danger" | "info" | "purple";

const tones: Record<Tone, string> = {
  default: "bg-zinc-800 text-zinc-300 border-zinc-700",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/15 text-red-400 border-red-500/30",
  info: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  purple: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

export function Badge({ children, tone = "default", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
