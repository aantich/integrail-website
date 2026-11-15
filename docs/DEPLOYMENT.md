# Production hosting

- Repository: https://github.com/aantich/integrail-website
- Production domain: https://integrail.ai
- Hosting: GitHub Pages, built and deployed by GitHub Actions.
- Source branch: `main`.
- Deployment workflow: `.github/workflows/pages.yml`.
- Build: `npm run check` followed by `npm run build`, using Node.js 24.
- Published artifact: `dist/` only. Fonts and assets are self-hosted.

## GitHub configuration

In **Settings → Pages**, use **GitHub Actions** as the publishing source and
`integrail.ai` as the custom domain. GitHub Pages requires a public repository
on the account’s current plan. Source visibility requires Anton’s approval.

The `github-pages` environment is restricted to deployments from `main`.
Pull requests run checks and build; they do not deploy. Pushes to `main` and
manual workflow runs build and publish. GitHub’s short-lived OIDC credentials
authorize deployment; no personal token or Cloudflare secret is needed by CI.

The custom domain is configured in GitHub’s Pages settings/API. With an
Actions deployment, a `CNAME` file is not required and does not configure the
domain. Canonical and Open Graph metadata already use `https://integrail.ai`.

## Cloudflare cutover

Configure the domain in GitHub before redirecting website DNS. The intended
records are:

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `aantich.github.io` | DNS only |

Replace the prior website apex records rather than mixing old and new hosting
addresses. Use automatic TTL. Keep application subdomains, mail, SPF, DKIM and
other service records intact. Any pre-existing apex AAAA records must also be
checked so IPv6 traffic cannot continue to a different host.

After DNS is correct, GitHub provisions a certificate. Enable **Enforce HTTPS**
when GitHub makes it available. Check both `https://integrail.ai` and
`https://www.integrail.ai`; the latter should redirect to the apex domain.

## Verification

1. Confirm the latest Actions deployment succeeded at the pushed commit.
2. Confirm Pages reports `build_type: workflow` and `cname: integrail.ai`.
3. Confirm public apex and `www` DNS answers point to GitHub Pages.
4. Confirm HTTPS serves both pages and local assets, and `www` redirects.

## References

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Managing a Pages custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Pages REST API](https://docs.github.com/en/rest/pages/pages)
