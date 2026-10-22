# Ko Bazalwaneng / KBZ Springbok Grill

A responsive, single-page introduction to KBZ Springbok Grill, a takeaway-first springbok grill in development for Mamelodi, Pretoria. The site clearly marks the business as opening soon and treats the menu as a preview until the owner confirms items, portions, availability and prices.

## Project setup

```bash
npm ci
npm run dev
```

## Update owner-confirmed details

Edit `src/config.js` to update:

- Restaurant name, brand wording and opening status.
- WhatsApp number in international format (for example, `+27...`) and telephone number.
- Confirmed address, directions, hours, launch date and official social links.
- Menu item names, descriptions and prices.

Menu entries currently have `price: null`, so the site displays “Price to be confirmed” and does not show an invented total. Replace each `null` with the owner-approved numeric price after costing is complete. Menu entries are a preview, not a statement of current availability.

The enquiry basket creates a WhatsApp enquiry when the confirmed international-format number is configured. Current number: `+27693790402`. The site does not create an ordering endpoint, accept payments or imply that collection/delivery is available.

The site uses an in-panel tab navigation so visitors can switch between Home, Menu, Enquiry, Story, Brand and Contact without paging through every section. On phones, the header and two-row icon-only tab bar stay fixed while the page content and footer scroll together in the available area; each 56px-plus touch target keeps its accessible tab name for assistive technology. On larger screens the tabs include visible text labels. The tabs support keyboard arrow/Home/End navigation and visible keyboard focus. The brand concept gallery stays collapsed until opened.

## Brand assets

- `public/brand/kbz-logo.jpeg` is the logo artwork supplied by the owner.
- `public/logo-mark.svg` and `public/logo-ko-bazlwaneng.svg` are interim vector assets.
- `public/favicon.svg` is the browser icon.

The storefront, interior, takeaway packaging and uniform images in `public/brand/` are owner-supplied concept visuals. The site labels them as visualisations; they do not represent completed premises, final packaging, or current staff. Replace them with approved final artwork and real photography when available.

## Build

```bash
npm run lint
npm run build
```

## Deploy to Render

This is a static Vite site. The included `render.yaml` builds the app and publishes `dist`.

For a Blueprint deployment, connect the repository to Render and apply the `ko-bazlwaneng` static-site service. Render installs dependencies with `npm ci`, runs `npm run build`, and publishes `./dist`. The Vite config uses a relative asset base for static hosting.

## Owner details still needed

- Approved final menu, portion sizes, availability and prices.
- Opening hours and launch date.
- Ordering, collection and delivery arrangements.
- Official social links, real food photography and approved final logo assets.
