# AGENTS

Flat reference. Every line must change behaviour vs default.

## Stance

- **Concise** — replies and commit messages; sacrifice grammar
- **Entropy** — leave the codebase better than you found it; shortcuts get copied
- When corrected, propose an AGENTS.md edit so the mistake can't recur
- Plain text only (no emojis)
- Large cleanups: run `knip`
- Make the best decision that will elevate all three: the user experience (UX), developer experience (DX), and agent experience (AX) always, without breaking anything

## TypeScript

- Let errors propagate unless you have a recovery path
- Prefer `unknown` + narrow; never cast to `any`
- Stay **concrete** — no abstraction or helper until an inline expression won't do
- Names over comments
- don't write local types. try to reuse existing types or export a type from a shared module file. prefer inferring types otherwise

## React

- React Compiler is on — skip manual `useMemo`/`useCallback`
- Small components; colocate what changes together
- Derive in render; `useEffect` only for external sync

## Tailwind

- Built-in values first, dynamic values sparingly, globals rarely
- v4 + global CSS + shadcn/ui

## Next

- Fetch in RSC (page can stay static)
- `next/font` + `next/script` when applicable
- Above-fold `next/image`: `sync`/`eager`; `priority` sparingly
- Watch serialized prop size RSC → client

## Agent skills

### Issue tracker

GitHub Issues on `scheffchuk/tokyo-chinese-culture-map`, via `gh`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`); all already exist on the repo. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `GLOSSARY.md` + `docs/adr/`, created lazily. See `docs/agents/domain.md`.
