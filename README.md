# Ko Bazalwaneng / KBZ Springbok Grill

A responsive introduction to Ko Bazalwaneng (KBZ Springbok Grill), a takeaway in Mamelodi, Pretoria. The shop grills and roasts springbok and serves it with potato wedges and side salads. It is built on Christian community values, and it is opening soon. The menu is a preview until portions, availability and prices are confirmed. The site does not publish prices or supplier details.

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

The site uses an in-panel tab navigation so visitors can switch between Home, Menu, Enquiry, Story, Brand and Contact without paging through every section. On phone and narrow-tablet widths, the header and compact, one-row icon-only tab bar stay fixed while the page content and footer scroll together; each tab keeps an accessible name and a minimum 48px touch target. Main action buttons use rounded styling, and the WhatsApp enquiry button is green. On larger screens the tabs include visible text labels. The tabs support keyboard arrow/Home/End navigation and visible keyboard focus. The brand concept gallery stays collapsed until opened.

## Brand assets

- `public/brand/kbz-logo.jpeg` is the logo artwork supplied by the owner.
- `public/logo-mark.svg` and `public/logo-ko-bazlwaneng.svg` are interim vector assets.
- `public/favicon.svg` is the browser icon.

The storefront, interior, packaging and uniform images in `public/brand/` are concept visuals. They are not shown on the site. Do not use them as photos of the premises, the packaging or the team.

## Food photos

The pictures in `public/images/` are licensed stand-ins for grilled game, potato wedges and salad. They are not photos of this shop, this kitchen or this team. Credits and licences are in the comments at the top of `src/config.js` and in the site footer.

Still needed before a full launch:

- A real photo of the shop exterior at SS Mokoene Drive, Mahube.
- A real photo of the interior.
- A real photo of the team.
- A real photo of the takeaway packaging.
- Real photos of KBZ springbok, wedges and salads from this kitchen.

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
- Official social links.
- Real photos of the premises, the team, the packaging, and the food from this kitchen.
- Approved final logo assets, if the current logo changes.
