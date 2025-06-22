import { type SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 28"
      width="160"
      height="28"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: "hsl(var(--primary))" }} />
          <stop offset="100%" style={{ stopColor: "hsl(var(--accent))" }} />
        </linearGradient>
      </defs>
      <g className="fill-foreground font-headline font-black text-2xl tracking-tight">
        <text x="0" y="22">
          PlanForge{" "}
          <tspan
            className="font-bold"
            style={{ fill: "url(#logo-gradient)" }}
          >
            AI
          </tspan>
        </text>
      </g>
    </svg>
  );
}
