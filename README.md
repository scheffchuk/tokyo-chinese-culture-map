# Tokyo Chinese Culture Map

Multilingual (Japanese default, English, Traditional Chinese) map and directory of verified Chinese-culture places in Tokyo's 23 wards. Next.js App Router, next-intl, mapcn on MapLibre, OpenFreeMap basemap.

## Commands

```bash
pnpm dev               # local dev server
pnpm build && pnpm start
pnpm lint
pnpm typecheck         # next typegen + tsc
pnpm test:e2e          # Playwright against a production build of the fixture catalog
pnpm test:e2e:live     # one smoke check against the real OpenFreeMap basemap
```

`pnpm exec playwright install chromium` once before the first test run.

## Editing the catalog

All entries live in `src/catalog/places.ts`, one `Candidate` per source entry. The public catalog (`getPublicCatalog` in `src/catalog/publish.ts`, server-only) only includes a candidate when:

- `status` is `"published"`,
- it has a `location`,
- `location.ward` is one of the 23 ward ids in `WARDS`,
- its coordinates fall inside the 23-ward bounding box.

Anything else is excluded everywhere: list, markers, search and `?place=` links.

To publish an entry:

1. Confirm the address from an operator source (official site or SNS). Third-party sources are allowed but must be labelled with `primary: false`.
2. Geocode the Japanese address with GSI (`https://msearch.gsi.go.jp/address-search/AddressSearch?q=<address>`). Never estimate coordinates.
3. Set `verifiedOn` to the check date. Leave `hours`, `website` or `photo` out instead of guessing; the popup says so explicitly.
4. Write `description` in all three languages, and put anything a reviewer should look at in `reviewNotes`.
5. Change `status` to `"published"`.

UI copy is in `messages/{ja,en,zh-Hant}.json`. Japanese is the source of the message types.

## Tests

The e2e suite builds with `CATALOG=fixture`, which swaps in `src/catalog/fixture.ts` through the same public-catalog path. The basemap is stubbed so the runs are deterministic. Fixture drafts and out-of-scope entries prove that the publication rules hold.
