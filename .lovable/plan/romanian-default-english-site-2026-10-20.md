# Romanian (default) + English site

## What visitors get
- Romanian site at the root: `/`, `/portofoliu`, `/portofoliu/{proiect}`, `/servicii`, `/servicii/{serviciu}`, `/jurnal`, `/jurnal/categorie/{categorie}`, `/jurnal/{articol}`, `/contact`.
- English site under `/en`: `/en`, `/en/portfolio`, `/en/services`, `/en/journal`, `/en/contact`, plus every project, service, article and category.
- Old English URLs (`/portfolio/...`, `/services/...`, `/journal/...`) redirect permanently to their `/en/...` equivalent (site is not yet published, but this keeps any shared links working).
- Understated `RO / EN` switcher in the header and mobile menu; it opens the same page in the other language (e.g. Inklabs RO case study to Inklabs EN), or falls back to that language's section/homepage when no translation exists. Current language is highlighted. No automatic redirect by IP or browser language; the choice is only remembered for convenience, never forced.
- Every page, button, form label, error/success message, alt text and SEO text written in natural Romanian and natural English. Brand and client names unchanged. Existing [PLACEHOLDER] markers stay placeholders in both languages — nothing invented.

## Content editing
- Each content file (projects, services, journal, site text) holds a Romanian and an English version per item side by side, with its own slug, SEO title/description and (for articles) its own publish status per language.
- An article can exist in only one language; the counterpart link appears only when both are published.
- A small "missing translations" report page at `/admin/traduceri` (noindex) lists every item lacking RO or EN text.

## SEO
- `<html lang="ro">` / `lang="en"` set per page.
- Self-referencing absolute canonical per language; reciprocal absolute `hreflang="ro"`, `hreflang="en"` and `x-default` (Romanian) only when both versions exist.
- Localized title, description, Open Graph and structured data.
- Sitemap lists both languages with `xhtml:link` alternates; drafts and unpublished articles excluded.

## Validation
- Playwright pass over every nav link, all services, all projects (Inklabs, Divaz, KDT Romania), journal in both languages, switcher context preservation, canonical/hreflang tags, contact form submission in both languages, mobile layout.

## Technical details
- Locale helpers in `src/lib/i18n.ts`: `Locale = "ro" | "en"`, UI string dictionaries, path builders mapping each page key + slug to its RO/EN URL, and `alternatesFor(page)` used by both the switcher and `head()`.
- Content types become `{ ro?: LocalizedFields; en?: LocalizedFields; shared }` keyed by a stable id so translations link to each other.
- Route files: Romanian routes at root (`portofoliu.index.tsx`, `portofoliu.$slug.tsx`, ...), English routes under `src/routes/en/`. Page bodies move into shared components taking `locale`, so each route file is a thin wrapper with its own `head()`.
- `lang` attribute: root reads the matched locale from the path in `RootShell`.
- Old routes become server redirect routes (301).
- Domain `https://dianamarriedesigns.com` used for absolute canonical/hreflang URLs (stored in site config).
