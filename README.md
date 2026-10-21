# Ko Bazlwaneng

A bright, welcoming food brand website for a township fast-food business selling grilled and fried springbok, potato wedges, French fries, and community-focused meal combos.

## Brand direction

- Business name: Ko Bazlwaneng
- Tagline: Good Food. Good People. Good Purpose.
- Supporting line: Township Flavour. Community Spirit.
- Core identity: faith-inspired, community-led, proud South African, family-friendly

## Project setup

```bash
npm install
npm run dev -- --host 0.0.0.0
```

## Update the business details

Edit the main business config in `src/config.js`:

- business name and tagline
- WhatsApp number
- telephone number
- address and location
- operating hours
- social links
- menu items and pricing

## Build for production

```bash
npm run build
```

## Deploy to Render

This is a static Vite site. The repository includes a `render.yaml` Blueprint that builds the app and publishes `dist`.

### Blueprint deployment

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Render, choose **New** > **Blueprint** and connect that repository.
3. Review the `ko-bazlwaneng` static site and select **Apply**.

Render will install dependencies with `npm ci`, run `npm run build`, and publish `./dist`. Later pushes to the connected branch will trigger a new deploy.

### Manual static-site setup

If you prefer not to use the Blueprint, create a **Static Site** in Render with:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Environment variable: `NODE_VERSION=22.12.0`

The Vite config already uses a relative asset base, which works on Render.

## Notes

- The logo assets are stored in `public/logo-ko-bazlwaneng.svg` and `public/logo-mark.svg`.
- The ordering flow opens a WhatsApp message when a valid business number is configured.
- If no WhatsApp number is set, the order panel shows a helpful setup message instead.
