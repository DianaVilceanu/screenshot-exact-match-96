<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Diana Marrie Designs site
- Site content (projects, services, journal articles, contact details, image index) lives in typed files under `src/content/`; pages render from them so content is edited in one place.
- Text wrapped in [SQUARE BRACKETS] in content is an unverified placeholder and renders with a dashed placeholder frame; never replace it with invented facts.
- Draft projects (`draft: true`) and articles with `publishedAt: null` are noindexed and excluded from `/sitemap.xml`.
- Case studies switch look via `data-theme` token blocks in `src/styles.css`, not per-component colors.
- Contact form inserts into the `contact_messages` table (insert-only for visitors).
