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
      <g className="font-headline font-black text-2xl tracking-tight">
        <text x="0" y="22" className="fill-foreground">
          Plan
          <tspan
            className="font-bold fill-primary"
          >
            Insta
          </tspan>
        </text>
      </g>
    </svg>
  );
}
