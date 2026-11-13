import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, className = "", hover = false, padding = "md" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm ${
        hover ? "transition-all duration-300 hover:border-indigo-500/40 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-indigo-500/5" : ""
      } ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold text-zinc-50 tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-zinc-400 mt-1 ${className}`}>{children}</p>;
}
