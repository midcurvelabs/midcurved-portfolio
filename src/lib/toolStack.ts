export type ToolPhase = "idea" | "create" | "grow";

export type ToolStatus = "live" | "building" | "concept";

export type ToolStackItem = {
  id: string;
  phase: ToolPhase;
  name: string;
  label: string;
  status: ToolStatus;
  parent: string;
  description: string;
  href?: string;
  featured?: boolean;
};

export const TOOL_PHASES: Record<
  ToolPhase,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  idea: {
    eyebrow: "idea",
    title: "Find the signal.",
    description:
      "Tools for turning raw ideas into sharper concepts, specs, and founder-ready decisions.",
  },
  create: {
    eyebrow: "create",
    title: "Ship the thing.",
    description:
      "Build tools, production workflows, and AI-native systems that move from prompt to product.",
  },
  grow: {
    eyebrow: "grow",
    title: "Compound the work.",
    description:
      "Distribution, audience, accountability, and feedback loops that make each launch stronger.",
  },
};

export const TOOL_STACK: ToolStackItem[] = [
  {
    id: "idea-generator",
    phase: "idea",
    name: "Idea Generator",
    label: "Concept",
    status: "building",
    parent: "Midcurved",
    description: "Generate app ideas from audience signals, constraints, and founder taste.",
    featured: true,
  },
  {
    id: "prd-builder",
    phase: "idea",
    name: "PRD Builder",
    label: "Spec",
    status: "concept",
    parent: "vibecode.fun",
    description: "Turn promising ideas into tight product briefs and implementation-ready specs.",
  },
  {
    id: "market-map",
    phase: "idea",
    name: "Market Map",
    label: "Research",
    status: "concept",
    parent: "Midcurved",
    description: "Map competitors, positioning, and wedge opportunities before building.",
  },
  {
    id: "prototype-lab",
    phase: "create",
    name: "Prototype Lab",
    label: "Build",
    status: "building",
    parent: "Midcurved",
    description: "A repeatable sprint system for turning ideas into working prototypes.",
    featured: true,
  },
  {
    id: "vibecode",
    phase: "create",
    name: "vibecode.fun",
    label: "Community",
    status: "live",
    parent: "vibecode.fun",
    href: "https://vibecode.fun",
    description: "Native home for AI-assisted builders, profiles, tools, and future payouts.",
  },
  {
    id: "interview-sidekick",
    phase: "create",
    name: "Interview Sidekick",
    label: "Media",
    status: "concept",
    parent: "GodModePod",
    description: "AI prep and live support for sharper podcast interviews and creator research.",
  },
  {
    id: "launch-kit",
    phase: "grow",
    name: "Launch Kit",
    label: "Distribution",
    status: "building",
    parent: "Midcurved",
    description: "Reusable launch assets, copy, checklists, and channel plans for every build.",
    featured: true,
  },
  {
    id: "community-loop",
    phase: "grow",
    name: "Community Loop",
    label: "Audience",
    status: "concept",
    parent: "Midcurved",
    description: "Turn viewers, readers, and builders into an active feedback and shipping loop.",
  },
  {
    id: "metrics-room",
    phase: "grow",
    name: "Metrics Room",
    label: "Analytics",
    status: "concept",
    parent: "Midcurved",
    description: "Track views, signups, launches, and compounding proof across the studio.",
  },
];

export function getToolsByPhase(phase: ToolPhase) {
  return TOOL_STACK.filter((tool) => tool.phase === phase);
}

export function getFeaturedTool(phase: ToolPhase) {
  return getToolsByPhase(phase).find((tool) => tool.featured) ?? getToolsByPhase(phase)[0];
}
