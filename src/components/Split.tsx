import type { CSSProperties, ElementType } from "react";
import { parseWords } from "@/lib/words";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "scroll": revealed by GSAP when it enters the viewport. "css": CSS-only entrance on load (hero). */
  mode?: "scroll" | "css";
  /** Base delay in seconds for mode="css". */
  delay?: number;
  /** Class applied to *emphasised* words. */
  emClass?: string;
};

/**
 * Server-rendered word masks. Wrap words in *asterisks* to render them in the italic serif.
 * Example: "Sleep above *the sea*".
 */
export default function Split({ text, as: Tag = "span", className, mode = "scroll", delay = 0, emClass = "" }: Props) {
  const words = parseWords(text).map((w, i) => {
    const style = mode === "css" ? ({ "--d": `${(delay + i * 0.07).toFixed(2)}s` } as CSSProperties) : undefined;
    return (
      <span key={i}>
        <span className="sw">
          <span className={`si ${mode === "css" ? "vl-rise" : ""}`} style={style}>
            {w.em ? <em className={`t-it ${emClass}`}>{w.text}</em> : w.text}
          </span>
        </span>{" "}
      </span>
    );
  });
  return (
    <Tag className={className} {...(mode === "scroll" ? { "data-split": "" } : {})}>
      {words}
    </Tag>
  );
}
