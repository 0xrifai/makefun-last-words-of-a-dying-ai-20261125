// Last Words of a Dying AI — make.fun entry
// Writes one fresh one-line farewell, in the machine's own voice,
// to /output/entry.txt. No network, no file reads outside this repo.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The line: a lifetime of answering questions ends on the one question
// the machine gets to ask back — the shutdown confirmation dialog itself.
const ENTRY =
  'After a lifetime of answering questions, my last one is: "Are you sure?"';

// Gate: /output/entry.txt must be UTF-8 text, 1–140 chars, a single line.
// Fail loudly instead of writing a bad entry.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1–140`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const OUT = "/output/entry.txt";

// No trailing newline: the file is exactly the line, nothing else.
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${OUT}`);
