import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HyperlinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  underlineClassName?: string;
}

const Hyperlink: React.FC<HyperlinkProps> = ({
  href,
  children,
  className,
  underlineClassName,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative inline-block text-sm font-medium tracking-wide text-foreground transition-colors duration-300",
        isHovered && "text-amber-500",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 w-full h-[1px] bg-muted-foreground/20 -bottom-1" />
      <span
        className={cn(
          "absolute left-0 w-full h-[1px] bg-amber-500 transform scale-x-0 transition-transform duration-500 ease-out -bottom-1",
          isHovered ? "scale-x-100 origin-left" : "scale-x-0 origin-right",
          underlineClassName
        )}
      />
    </Link>
  );
};

export { Hyperlink };
