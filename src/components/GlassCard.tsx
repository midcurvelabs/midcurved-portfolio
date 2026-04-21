import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  as?: "div" | "article" | "section";
};

export function GlassCard({ children, className = "", as: Tag = "div", style, ...rest }: Props) {
  return (
    <Tag
      {...rest}
      className={`glass-card ${className}`}
      style={{
        position: "relative",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-6)",
        background: "color-mix(in oklch, var(--neutral-0) 4%, transparent)",
        backdropFilter: "blur(var(--glass-standard-blur)) saturate(1.4)",
        WebkitBackdropFilter: "blur(var(--glass-standard-blur)) saturate(1.4)",
        border: "var(--glass-border)",
        boxShadow: "var(--glass-shadow), var(--glass-specular)",
        transition:
          "transform var(--dur-normal) var(--ease-out), box-shadow var(--dur-normal) var(--ease-out)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
