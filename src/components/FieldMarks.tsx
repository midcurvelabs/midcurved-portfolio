export function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 128 128"
      aria-hidden
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="2">
        <path d="M64 8v30M64 90v30M8 64h30M90 64h30" />
        <circle cx="64" cy="64" r="22" />
      </g>
      <circle cx="64" cy="64" r="4" fill="currentColor" />
    </svg>
  );
}

export function FieldRule({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1024 32" aria-hidden fill="none">
      <g stroke="currentColor" strokeWidth="1">
        <path d="M16 16h992M16 7v18M1008 7v18M512 10v12" />
      </g>
      <circle cx="512" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}
