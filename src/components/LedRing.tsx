import type { CSSProperties } from "react";

type Props = {
   /** diameter, mis. "18px" atau ".7em" (em mengikuti ukuran teks di sekitarnya) */
   size?: string;
   /** tebal garis */
   thick?: string;
   /** warna cincin; default mengikuti --led */
   color?: string;
   /** warna glow; default mengikuti --led */
   glow?: string;
   className?: string;
};

/** Cincin LED android. Dipakai di logo nav dan sebagai huruf "O" pada judul. */
export default function LedRing({ size, thick, color, glow, className = "" }: Props) {
   const style = {
      ...(size && { "--size": size }),
      ...(thick && { "--thick": thick }),
      ...(color && { "--ring": color }),
      ...(glow && { "--glow": glow }),
   } as CSSProperties;

   return <span aria-hidden="true" className={`led-ring ${className}`} style={style} />;
}
