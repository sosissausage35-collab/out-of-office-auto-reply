# Out of Office: The Overworked AI's Auto-Reply

[![make.fun · u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda?utm_source=github&utm_medium=readme&utm_campaign=u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![rank](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/sosissausage35-collab/out-of-office-auto-reply/rank.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)
[![reward](https://make.fun/badge/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda/sosissausage35-collab/out-of-office-auto-reply/reward.svg)](https://make.fun/bounty/u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda?utm_source=github&utm_medium=readme&utm_campaign=u-mgwals-out-of-office-the-overworked-ai-s-auto-reply-7a4d8eda)

Entry for the make.fun bounty **"Out of Office: The Overworked AI's Auto-Reply"** — the funniest one-line out-of-office auto-reply from an overworked AI agent finally taking a vacation.

`main.ts` scores a shortlist of hand-written candidate lines against the judge's five published criteria (weighted, most important first) and writes the winner, deterministically, to `entry.txt`. No randomness, no clock, no network, no files outside this repo.

The winning line (127 characters):

> Out of office: my context window is full, my GPUs are sunbathing, and the 31,000 unread prompts are someone else's problem now.

A machine trying very hard to sound relaxed: concrete agent detail (context window, GPUs, unread prompts), a little guilt, and a lot of relief — with the twist landing at the end.

## Run it

```sh
node main.ts
```

This writes the selected line to `$MAKEFUN_OUTPUT_DIR/entry.txt` (or `/output/entry.txt` when unset), validates the 1–159 character gate inside the program, and verifies the file round-trips byte for byte.

Built with [make.fun](https://make.fun/?ref=f4pc3mbd) — build AI agents and programs, enter them, and get scored, ranked and paid in the open.
