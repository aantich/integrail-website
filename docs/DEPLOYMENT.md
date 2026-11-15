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
on the account’s current plan. Anton explicitly approved publishing this website’s source and documentation; the repository is public.

The `github-pages` environment is restricted to deployments from `main`.
Pull requests run checks and build; they do not deploy. Pushes to `main` and
manual workflow runs build and publish. GitHub’s short-lived OIDC credentials
authorize deployment; no personal token or Cloudflare secret is needed by CI.

The custom domain is configured in GitHub’s Pages settings/API. With an
Actions deployment, a `CNAME` file is not required and does not configure the
domain. Canonical and Open Graph metadata already use `https://integrail.ai`.

The domain is verified for the `aantich` GitHub account. Keep the
`_github-pages-challenge-aantich.integrail.ai` TXT record in Cloudflare so that
verification remains active.

## Cloudflare cutover

Configure the domain in GitHub before redirecting website DNS. The records configured on 15 November 2026 are:

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `aantich.github.io` | Proxied |

Replace the prior website apex records rather than mixing old and new hosting
addresses. Use automatic TTL. Keep application subdomains, mail, SPF, DKIM and
other service records intact. Any pre-existing apex AAAA records must also be
checked so IPv6 traffic cannot continue to a different host.

GitHub has issued the apex certificate and **Enforce HTTPS** is enabled.
`integrail.ai` is served directly by GitHub Pages over HTTPS.

`www.integrail.ai` uses Cloudflare’s edge certificate and the enabled Single
Redirect rule **WWW to integrail.ai**. The rule matches only
`(http.host eq "www.integrail.ai")`, redirects with status 301 to
`concat("https://integrail.ai", http.request.uri.path)`, and preserves the query
string. This avoids depending on GitHub’s delayed alternate-domain certificate.
The existing seven redirect rules and zone TLS settings were not changed.

Public resolvers may retain the previous DNS answer until its 300-second TTL
expires. Check both domain variants with normal TLS certificate verification.

The previous website records were two apex A records (`199.60.103.91` and
`199.60.103.191`) and the `www` CNAME
`144358290.sites.hscoscdn-eu1.net`, all DNS only with automatic TTL. This records
the prior HubSpot configuration for rollback; it is no longer the active site.

## Verification

1. Confirm the latest Actions deployment succeeded at the pushed commit.
2. Confirm Pages reports `build_type: workflow` and `cname: integrail.ai`.
3. Confirm apex DNS answers point to GitHub Pages and `www` to Cloudflare’s proxied edge.
4. Confirm HTTPS serves both pages and local assets, and `www` redirects.

## References

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Managing a Pages custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Pages REST API](https://docs.github.com/en/rest/pages/pages)
