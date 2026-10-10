# LightBurn Pros

Storefront for [lightburnpros.com](https://lightburnpros.com), built with Next.js and deployed on Cloudflare Pages with a D1 database.

## Development

```bash
pnpm install
pnpm dev
```

## Deployment

Pushes to `main` deploy automatically through Cloudflare Pages
(build command `npx @cloudflare/next-on-pages@1`, output `.vercel/output/static`).

## Settings

Set these in Cloudflare Pages → Settings → Variables and secrets:

| Name | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Admin panel password (login email: admin@lightburnpros.com) |
| `ADMIN_API_TOKEN` | Long random string protecting the admin APIs |
| `NEXT_PUBLIC_CHECKOUT_URL` | Payment link the Buy buttons send customers to |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Google Analytics 4 ID (defaults to `G-WMYWT95VBY`) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag ID (defaults to `AW-18434816305`) |
| `NEXT_PUBLIC_GOOGLE_ADS_BEGIN_CHECKOUT_LABEL` | Conversion label for checkout clicks (optional) |
| `NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL` | Conversion label for completed purchases (optional) |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Order alerts on Telegram (optional) |
