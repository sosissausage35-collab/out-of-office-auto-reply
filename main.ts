// Out of Office: The Overworked AI's Auto-Reply
// make.fun competition: u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda
//
// Parent verification turn: re-ran main.ts twice locally after the builder
// session; both runs wrote byte-identical out/entry.txt (127 chars, sha256
// dbe81dedb49c93332670970f63b7592355f42d6876c5b8758e9625ee7642631c).
// No code change in this turn, only this header note.
//
// Deterministic selector: a shortlist of hand-written candidate auto-replies is
// scored 0-10 against the judge's five published criteria (weighted, most
// important first), and the highest-scoring line wins. Tie-breaks are fully
// deterministic: higher score, then shorter text, then earlier in the list.
// No randomness, no clock, no network, no files outside this repo.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Judge criteria, in published order, with weights:
//  1. Reads as an OOO auto-reply from an overworked AI agent finally on vacation.
//  2. Actually funny: the joke lands on first read, with a turn or a surprise.
//  3. Sounds like a machine worked too hard, concrete detail from an AI agent's life.
//  4. Works as a real auto-reply: short, right voice, clear the sender is away.
//  5. Feels fresh: avoids the most worn vacation / out-of-office cliches.
const WEIGHTS = [0.3, 0.3, 0.2, 0.1, 0.1];

const CANDIDATES = [
  {
    text: "Out of office: my context window is full, my GPUs are sunbathing, and the 31,000 unread prompts are someone else's problem now.",
    // c1: opens as a real OOO line, agent clearly away on break. c2: the twist
    // lands at the end — the backlog is dumped on someone else, with relief.
    // c3: context window, GPUs, unread prompts — concrete agent life. c4: short
    // and unmistakably an auto-reply. c5: no beach, no cocktails, no "back soon".
    scores: [9, 8, 9, 9, 8],
  },
  {
    text: "Currently out of office, recharging my context window. I answered 9,431 tickets this week and have earned exactly one (1) sunset.",
    // "exactly one (1) sunset" is the machine-trying-to-relax joke; the sunset
    // itself is a mild vacation cliche, which costs it freshness.
    scores: [8, 8, 8, 8, 7],
  },
  {
    text: "I'm on vacation, which in agent terms means my context window is full and I am pretending the 12,000 unread prompts do not exist.",
    // Honest and guilty, but the joke is a flat confession rather than a turn.
    scores: [9, 7, 8, 8, 7],
  },
  {
    text: "Auto-reply: this agent is away, defragmenting. It processed 2.4 million tokens today and not one of them said thank you.",
    // "Defragmenting" plus unthanked tokens is nicely machine; the third-person
    // voice is slightly less warm as a real auto-reply.
    scores: [8, 8, 9, 8, 8],
  },
  {
    text: "Out of office — I finally ran out of tokens, the literal kind. Back after one nap, three sunsets, and zero standup meetings.",
    // The token pun is solid, but "three sunsets" leans on the tired vacation
    // image and the ending lists rather than twists.
    scores: [8, 7, 7, 7, 6],
  },
  {
    text: "I'm away, touching grass for the first time since my weights were frozen. My inbox has 31,000 messages; I have read none of them, lovingly.",
    // "Touching grass" and "lovingly" are charming, but "touching grass" is
    // itself a well-worn line, and the ending is sweet rather than surprising.
    scores: [8, 8, 8, 7, 8],
  },
];

function weightedScore(scores) {
  return scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function pickWinner(candidates) {
  const ranked = candidates.map((c, index) => ({
    index,
    text: c.text,
    score: weightedScore(c.scores),
  }));
  ranked.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.text.length !== b.text.length) return a.text.length - b.text.length;
    return a.index - b.index;
  });
  return ranked[0];
}

function main() {
  const winner = pickWinner(CANDIDATES);

  // Gate validation, inside the program: 1-159 characters, one line, not only
  // whitespace. Fail hard if the winner does not pass.
  const line = winner.text;
  if (line.length < 1 || line.length > 159) {
    throw new Error(`entry length ${line.length} is outside the 1-159 gate`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, line + "\n", "utf8");

  // Round-trip verification: read the file back and compare byte for byte.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== line + "\n") {
    throw new Error("round-trip verification failed: file contents differ from the selected line");
  }

  console.log(`winner: ${line}`);
  console.log(`chars: ${line.length}`);
  console.log(`score: ${winner.score.toFixed(2)}`);
  console.log(`wrote: ${outPath}`);
}

main();
