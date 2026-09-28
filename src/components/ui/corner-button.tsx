import Link from "next/link";
import type { ReactNode } from "react";

type CornerButtonProps = {
   href: string;
   children: ReactNode;
   className?: string;
   textClassName?: string;
};

export default function CornerButton({ href, children, className = "", textClassName = "" }: CornerButtonProps) {
   return (
      <Link
         href={href}
         className={`group relative inline-flex min-w-[130px] items-center justify-center px-5 py-3 transition-colors duration-300 sm:min-w-[140px] sm:px-6 sm:py-3.5 md:min-w-[150px] md:px-7 md:py-3.5 lg:min-w-[165px] lg:px-8 lg:py-4 ${className}`}
      >
         <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-white/45 transition-all duration-300 [@media(hover:hover)]:group-hover:-left-0.5 [@media(hover:hover)]:group-hover:-top-0.5 [@media(hover:hover)]:group-hover:border-dbh-blue sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5" />

         <span className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-white/45 transition-all duration-300 [@media(hover:hover)]:group-hover:-right-0.5 [@media(hover:hover)]:group-hover:-top-0.5 [@media(hover:hover)]:group-hover:border-dbh-blue sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5" />

         <span className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-white/45 transition-all duration-300 [@media(hover:hover)]:group-hover:-bottom-0.5 [@media(hover:hover)]:group-hover:-left-0.5 [@media(hover:hover)]:group-hover:border-dbh-blue sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5" />

         <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-white/45 transition-all duration-300 [@media(hover:hover)]:group-hover:-bottom-0.5 [@media(hover:hover)]:group-hover:-right-0.5 [@media(hover:hover)]:group-hover:border-dbh-blue sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5" />

         <span
            className={`font-mono text-[9px] font-medium uppercase leading-none tracking-[0.16em] text-white transition-[color,letter-spacing] duration-300 [@media(hover:hover)]:group-hover:tracking-[0.2em] [@media(hover:hover)]:group-hover:text-dbh-blue sm:text-[9.5px] sm:tracking-[0.17em] md:text-[10px] md:tracking-[0.18em] lg:text-[11px] lg:tracking-[0.19em] ${textClassName}`}
         >
            {children}
         </span>
      </Link>
   );
}
