export type Word = { text: string; em: boolean };

/** Splits a string into words; *asterisks* mark the words that should render in the italic serif. */
export function parseWords(value: string): Word[] {
  const out: Word[] = [];
  let em = false;
  for (const raw of value.split(" ")) {
    let text = raw;
    if (text.startsWith("*")) {
      em = true;
      text = text.slice(1);
    }
    const closes = text.endsWith("*");
    if (closes) text = text.slice(0, -1);
    out.push({ text, em });
    if (closes) em = false;
  }
  return out;
}
