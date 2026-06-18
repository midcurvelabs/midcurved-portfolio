type Props = {
  className?: string;
  title?: string;
};

export function LogoMark({ className = "", title = "Midcurved" }: Props) {
  return (
    <svg
      aria-label={title}
      className={className}
      role="img"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="mc-logo-mark__glow"
        d="M12 39 C18 20 27 20 32 36 C37 20 46 20 52 39"
      />
      <path
        className="mc-logo-mark__stroke"
        d="M12 39 C18 20 27 20 32 36 C37 20 46 20 52 39"
      />
      <path
        className="mc-logo-mark__bridge"
        d="M15 41 C24 47 40 47 49 41"
      />
    </svg>
  );
}
