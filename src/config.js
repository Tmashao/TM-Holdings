export const business = {
  name: 'Ko Bazalwaneng',
  brand: 'KBZ',
  restaurantName: 'Springbok Grill',
  tagline: 'Good Food. Stronger Community.',
  campaignPhrase: 'Eat. Connect. Grow.',
  status: 'Opening soon',
  whatsappNumber: '+27693790402',
  telephoneNumber: '',
  location: 'Mamelodi, Pretoria, South Africa',
  address: 'SS Mokoene Drive, Mahube, Pretoria 0122',
  operatingHours: '',
  launchDate: '',
  instagram: '',
  facebook: '',
  directions: 'https://www.google.com/maps/search/?api=1&query=SS%20Mokoene%20Drive%2C%20Mahube%2C%20Pretoria%200122',
  // Street address plus the confirmed area (Mahube is on the street address; Mamelodi is the location).
  addressLines: ['SS Mokoene Drive', 'Mahube, Mamelodi', 'Pretoria 0122', 'South Africa'],
}

export const brandLogo = '/brand/kbz-logo.jpeg'

/*
 * Food photographs used until KBZ has its own pictures.
 * They show grilled or roasted game, potato wedges and salad.
 * They are not the shop, the kitchen, the packaging or the team.
 *
 * Each file was cropped where noted and compressed to WebP.
 *
 * 1. public/images/grilled-game-plate.webp
 *    Grilled elk rib chops, potato wedges and salad.
 *    Neeta Lind — https://commons.wikimedia.org/wiki/File:Grilled_Elk_rib_chops-01.jpg
 *    Licence: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/
 *    Change: top edge cropped; saved as WebP.
 *
 * 2. public/images/roasted-venison.webp
 *    Roasted venison loin.
 *    Ruth Hartnup — https://commons.wikimedia.org/wiki/File:Venison_Loin_(3293814360).jpg
 *    Licence: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/
 *    Change: top edge cropped to remove a hand; saved as WebP.
 *
 * 3. public/images/potato-wedges.webp
 *    Potato wedges.
 *    ImpromptuKitchen — https://commons.wikimedia.org/wiki/File:Potato_Wedges_and_Sweet_Chili_Sauce_(7_of_9)_(8616887148).jpg
 *    Licence: CC BY 2.0 — https://creativecommons.org/licenses/by/2.0/
 *    Change: bottom edge cropped to remove a spoon; saved as WebP.
 *
 * 4. public/images/side-salad.webp
 *    Fresh salad with tomato and leaves.
 *    Horacio Cambeiro — https://commons.wikimedia.org/wiki/File:Fresh_salad_with_arugula,_cabbage_and_tomato_in_a_glass_bowl.jpg
 *    Licence: CC BY-SA 3.0 — https://creativecommons.org/licenses/by-sa/3.0/
 *    Change: edges cropped; saved as WebP. The adapted file stays under CC BY-SA 3.0.
 *
 * LAUNCH PHOTOS STILL NEEDED. Do not fill these with the concept renders in public/brand/:
 * - Real exterior of the premises at SS Mokoene Drive, Mahube.
 *   public/brand/storefront-concept.jpeg is a visualisation, not the shop.
 * - Real interior of the premises.
 *   public/brand/interior-concept.jpeg is a visualisation, not the shop.
 * - Real photo of the KBZ team.
 *   public/brand/uniform-concept.jpeg is a visualisation, not the team.
 * - Real photo of the takeaway packaging.
 *   public/brand/packaging-concept.jpeg is a visualisation, not the finished boxes.
 * - Real photos of KBZ springbok portions, wedges and salads from this kitchen.
 */
export const foodPhotos = {
  platedGame: {
    src: '/images/grilled-game-plate.webp',
    width: 1152,
    height: 720,
    alt: 'Grilled elk chops with potato wedges and a green salad on a white plate',
    caption:
      'Grilled game with potato wedges and salad. This is the kind of meal we are getting ready to cook. It is not a photo of our shop.',
    photographer: 'Neeta Lind',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Grilled_Elk_rib_chops-01.jpg',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  roastedGame: {
    src: '/images/roasted-venison.webp',
    width: 1600,
    height: 1104,
    alt: 'Sliced roasted venison loin on a plate with vegetables',
    caption:
      'Roasted game meat, close to the springbok we will serve. This picture is not from our kitchen.',
    photographer: 'Ruth Hartnup',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Venison_Loin_(3293814360).jpg',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  wedges: {
    src: '/images/potato-wedges.webp',
    width: 1400,
    height: 1108,
    alt: 'Crisp potato wedges with herbs on a white plate',
    caption: 'Potato wedges, the side we plan to serve with the springbok.',
    photographer: 'ImpromptuKitchen',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Potato_Wedges_and_Sweet_Chili_Sauce_(7_of_9)_(8616887148).jpg',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  },
  salad: {
    src: '/images/side-salad.webp',
    width: 1200,
    height: 920,
    alt: 'A glass bowl of fresh green salad with tomato',
    caption: 'A fresh side salad, the kind we plan to serve beside the meat.',
    photographer: 'Horacio Cambeiro',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Fresh_salad_with_arugula,_cabbage_and_tomato_in_a_glass_bowl.jpg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
}

// Owner-supplied concept renders. Keep them in the repo, but do not show them
// as the shop, the team or the packaging. Real photos should replace any public use.
export const brandConcepts = [
  {
    id: 'restaurant-interior',
    title: 'A warm grill atmosphere',
    label: 'Interior concept',
    image: '/brand/interior-concept.jpeg',
    alt: 'Ko Bazalwaneng-branded restaurant interior concept visualisation',
  },
  {
    id: 'takeaway-packaging',
    title: 'A recognisable takeaway',
    label: 'Packaging concept',
    image: '/brand/packaging-concept.jpeg',
    alt: 'Ko Bazalwaneng branded takeaway packaging concept visualisation',
  },
  {
    id: 'team-uniform',
    title: 'A considered team look',
    label: 'Uniform concept',
    image: '/brand/uniform-concept.jpeg',
    alt: 'Ko Bazalwaneng branded uniform concept visualisation',
  },
]

export const menuItems = [
  {
    id: 'springbok-grill',
    name: 'Springbok grill portion',
    category: 'From the grill',
    description: 'A springbok grill concept. Cut, portion size and availability to be confirmed.',
    price: null,
    motif: '01',
  },
  {
    id: 'springbok-strips',
    name: 'Springbok strips',
    category: 'Springbok',
    description: 'A springbok takeaway idea. Preparation and serving details to be confirmed.',
    price: null,
    motif: '02',
  },
  {
    id: 'potato-wedges',
    name: 'Potato wedges',
    category: 'Sides',
    description: 'A possible side for the menu. Portion size and availability to be confirmed.',
    price: null,
    motif: '03',
  },
  {
    id: 'side-salad',
    name: 'Side salad',
    category: 'Sides',
    description: 'A fresh side under consideration. Ingredients and availability to be confirmed.',
    price: null,
    motif: '04',
  },
]

export const storyHighlights = [
  'Springbok, grilled or roasted, with potato wedges and a side salad.',
  'A warm welcome when you come to collect your food.',
  'Christian care for our neighbours: eat together, stay connected, and help one another grow.',
]

export const communityPillars = ['Faith', 'Welcome', 'Community', 'Care']
