import { useMemo, useState } from 'react'
import './App.css'
import {
  brandLogo,
  business,
  communityPillars,
  foodPhotos,
  menuItems,
  storyHighlights,
} from './config'

const tabIcons = {
  home: ['M3 10.5 12 3l9 7.5', 'M5.5 9.5v11h13v-11', 'M9.5 20.5v-6h5v6'],
  menu: ['M4 5h16', 'M4 10h16', 'M4 15h16', 'M4 20h16'],
  order: ['M5 8h14l1 13H4L5 8Z', 'M9 8V6a3 3 0 0 1 6 0v2'],
  story: [
    'M12 6c-2-2-5-2-9-1v14c4-1 7-1 9 1',
    'M12 6c2-2 5-2 9-1v14c-4-1-7-1-9 1',
    'M12 6v14',
  ],
  brand: ['m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z', 'm19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z'],
  contact: [
    'M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z',
    'M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  ],
}

const formatPrice = (amount) => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return 'Price to be confirmed'
  }

  return `R ${Number(amount).toFixed(2)}`
}

function App() {
  const [order, setOrder] = useState([])
  const [activeTab, setActiveTab] = useState('home')

  const selectTab = (tab) => {
    setActiveTab(tab)
    const content = document.querySelector('.content-scroll')
    if (content) content.scrollTop = 0
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTabKeyDown = (event) => {
    const tabButtons = Array.from(
      event.currentTarget.querySelectorAll('[role="tab"]'),
    )
    const currentIndex = tabButtons.indexOf(event.target)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabButtons.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabButtons.length - 1
    } else {
      return
    }

    event.preventDefault()
    const nextTab = tabButtons[nextIndex]
    nextTab.focus()
    selectTab(nextTab.id.replace('tab-', ''))
  }

  const addToOrder = (item) => {
    setOrder((current) => {
      const found = current.find((entry) => entry.id === item.id)

      if (found) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
        )
      }

      return [...current, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id, nextQuantity) => {
    setOrder((current) =>
      current
        .map((entry) =>
          entry.id === id ? { ...entry, quantity: Math.max(0, nextQuantity) } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    )
  }

  const total = useMemo(
    () =>
      order.reduce((sum, entry) => {
        const itemPrice = Number(entry.price ?? 0)
        return sum + itemPrice * entry.quantity
      }, 0),
    [order],
  )

  const whatsappNumber = business.whatsappNumber.replace(/\D/g, '')
  const hasWhatsApp = /^\+[1-9]\d{7,14}$/.test(business.whatsappNumber)
  const hasUnconfirmedPrices = order.some(
    (entry) => entry.price === null || entry.price === undefined,
  )

  const buildWhatsAppMessage = () => {
    const lines = [`Hello ${business.name}, I'm enquiring about:`]

    order.forEach((entry) => {
      lines.push(`- ${entry.name} x${entry.quantity}`)
    })

    lines.push('Could you share current availability, prices and collection details?')
    return encodeURIComponent(lines.join('\n'))
  }

  const openWhatsAppOrder = () => {
    if (!hasWhatsApp) {
      return
    }

    const url = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const pendingDetails = [
    !business.telephoneNumber && 'our phone number',
    !business.operatingHours && 'opening hours',
    !business.launchDate && 'the opening date',
    !(business.instagram || business.facebook) && 'our social pages',
  ].filter(Boolean)

  const pendingSentence = (() => {
    if (pendingDetails.length === 0) return ''
    const list =
      pendingDetails.length === 1
        ? pendingDetails[0]
        : pendingDetails.length === 2
          ? `${pendingDetails[0]} and ${pendingDetails[1]}`
          : `${pendingDetails.slice(0, -1).join(', ')} and ${pendingDetails[pendingDetails.length - 1]}`
    const sentence = `${list} will be shared when they are ready.`
    return sentence.charAt(0).toUpperCase() + sentence.slice(1)
  })()

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="nav-wrap container">
          <button type="button" className="brand" aria-label={`${business.name} home`} onClick={() => selectTab('home')}>
            <img src={brandLogo} alt="" className="brand-mark" />
            <span className="brand-name">
              <strong>{business.name}</strong>
              <small>{business.restaurantName}</small>
            </span>
          </button>

          <a href="#contact" className="header-location" onClick={(event) => {
            event.preventDefault()
            selectTab('contact')
          }}>{business.location}</a>
        </div>
      </header>

      <div className="content-scroll">
        <main>
          <div className="tab-box container">
          <nav
            className="main-nav"
            role="tablist"
            aria-label="Website sections"
            onKeyDown={handleTabKeyDown}
          >
            {[
              ['home', 'Home'],
              ['menu', 'Menu'],
              ['order', `Enquiry${order.length ? ` (${order.length})` : ''}`],
              ['story', 'Our Story'],
              ['brand', 'Brand'],
              ['contact', 'Contact'],
            ].map(([tab, label]) => (
              <button
                key={tab}
                id={`tab-${tab}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`${tab}-panel`}
                className="tab-button"
                aria-label={label}
                title={label}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => selectTab(tab)}
              >
                <svg className="tab-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  {tabIcons[tab].map((path) => (
                    <path key={path} d={path} />
                  ))}
                </svg>
                <span className="tab-label">{label}</span>
              </button>
            ))}
          </nav>
          <div
            className="tab-panel"
            role="tabpanel"
            id={`${activeTab}-panel`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex="0"
          >
        {activeTab === 'home' && (
          <>
        <section className="hero-section panel-pad">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" aria-hidden="true" />
              <span>{business.location}</span>
              <span className="eyebrow-status">{business.status}</span>
            </p>
            <div className="hero-brand" aria-label={`${business.brand} ${business.restaurantName}`}>
              <img
                src={brandLogo}
                alt={`${business.name} springbok and flame logo`}
                className="hero-brand-logo"
              />
              <span className="hero-brand-descriptor">
                {business.brand} {business.restaurantName}
              </span>
            </div>
            <h1>{business.tagline}</h1>
            <p className="hero-text">
              Ko Bazalwaneng is a takeaway in Mamelodi, Pretoria. We grill and roast
              springbok, and we serve it with potato wedges and a side salad. We are
              a Christian business. Good food and a stronger community belong together here.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-button large-button" onClick={() => selectTab('menu')}>
                Explore our menu
              </button>
              <button type="button" className="secondary-button large-button" onClick={() => selectTab('contact')}>
                Contact us
              </button>
            </div>
            <p className="hero-footnote">We are opening soon. The menu and prices are still being finished.</p>
          </div>

          <div className="hero-visual">
            {/* LAUNCH PHOTO — PREMISES: this frame is a food stand-in, not the shop.
                Add a real exterior photo of the premises at SS Mokoene Drive when one exists.
                Do not use public/brand/storefront-concept.jpeg as that photo. */}
            <div className="hero-photo">
              <img
                src={foodPhotos.platedGame.src}
                width={foodPhotos.platedGame.width}
                height={foodPhotos.platedGame.height}
                alt={foodPhotos.platedGame.alt}
                fetchPriority="high"
              />
              <div className="image-stamp">
                {business.campaignPhrase.split('. ').map((word) => (
                  <span key={word}>{word.replace('.', '')}.</span>
                ))}
              </div>
            </div>
            <p className="photo-note">{foodPhotos.platedGame.caption}</p>
          </div>
        </section>

        <section className="facts-section panel-pad" aria-label="About Ko Bazalwaneng">
          <article>
            <h2>Who we are</h2>
            <p>A takeaway in Mamelodi, Pretoria, getting ready to open.</p>
          </article>
          <article>
            <h2>What we serve</h2>
            <p>Grilled and roasted springbok, with potato wedges and side salads.</p>
          </article>
          <article>
            <h2>What we stand for</h2>
            <p>Christian community values: welcome people, and look after one another.</p>
          </article>
          <article>
            <h2>When we open</h2>
            <p>Opening soon. We will share the date when it is set.</p>
          </article>
        </section>

        <div className="announcement-bar" role="status">
          <span className="announcement-mark" aria-hidden="true">KBZ</span>
          <p>
            <strong>We’re getting ready.</strong> We will share the opening date and how
            to order when we know them.
          </p>
          <button type="button" onClick={() => selectTab('contact')}>
            Stay in touch <span aria-hidden="true">↗</span>
          </button>
        </div>
          </>
        )}

        {activeTab === 'menu' && (
        <section id="menu" className="menu-section section-pad">
          <div className="panel-pad">
            <div className="section-heading menu-heading">
              <div>
                <p className="eyebrow">A first look</p>
                <h2>Made for the grill.<br />Made to bring people together.</h2>
              </div>
              <p className="section-intro">
                Springbok from the grill and the oven, with potato wedges and side
                salads. This is a first look while we finish the menu.
              </p>
            </div>

            <div className="menu-notice">
              <span className="notice-icon" aria-hidden="true">i</span>
              <p>
                <strong>Menu preview</strong>
                <span>Portions, what we have each day, and prices are still being set.</span>
              </p>
            </div>

            <div className="menu-grid">
              {menuItems.map((item, index) => (
                <article key={item.id} className="menu-card">
                  <div className={`menu-card-art menu-art-${index + 1}`} aria-hidden="true">
                    <span className="menu-card-number">0{index + 1}</span>
                    <span className="menu-card-motif">{item.motif}</span>
                  </div>
                  <div className="card-body">
                    <span className="card-tag">{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="card-meta">
                      <span className="price-pending">{formatPrice(item.price)}</span>
                      <button
                        type="button"
                        className="add-button"
                        onClick={() => addToOrder(item)}
                      >
                        Add to enquiry
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        )}

        {activeTab === 'order' && (
        <section className="order-section section-pad" id="order">
          <div className="panel-pad">
            <div className="section-heading">
              <p className="eyebrow">Ask us</p>
              <h2>Send us a note.</h2>
              <p className="section-intro">
                Pick something from the menu preview. When you are ready, WhatsApp
                opens so you can message the shop.
              </p>
            </div>

            <div className="order-layout">
              <div className="order-panel">
                <h3>Your enquiry</h3>
                {order.length === 0 ? (
                  <p className="empty-state">Your list is empty. Add something from the menu.</p>
                ) : (
                  <ul className="order-list" aria-live="polite">
                    {order.map((entry) => (
                      <li key={entry.id} className="order-item">
                        <div>
                          <strong>{entry.name}</strong>
                          <span>{formatPrice(entry.price)}</span>
                        </div>
                        <div className="quantity-controls" aria-label={`Quantity for ${entry.name}`}>
                          <button
                            type="button"
                            aria-label={`Remove one ${entry.name}`}
                            onClick={() => updateQuantity(entry.id, entry.quantity - 1)}
                          >
                            −
                          </button>
                          <span>{entry.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Add one ${entry.name}`}
                            onClick={() => updateQuantity(entry.id, entry.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <aside className="summary-panel">
                <h3>Enquiry summary</h3>
                <div className="summary-row">
                  <span>{hasUnconfirmedPrices ? 'Pricing' : 'Estimated total'}</span>
                  <strong>
                    {hasUnconfirmedPrices
                      ? 'To be confirmed'
                      : formatPrice(total)}
                  </strong>
                </div>
                <button
                  type="button"
                  className="primary-button wide-button whatsapp-button"
                  onClick={openWhatsAppOrder}
                  disabled={!hasWhatsApp || order.length === 0}
                >
                  Send WhatsApp enquiry
                </button>
                {!hasWhatsApp && (
                  <p className="setup-note">
                    WhatsApp will be ready here once the shop number is confirmed.
                  </p>
                )}
              </aside>
            </div>
          </div>
        </section>
        )}

        {activeTab === 'story' && (
          <>
        <section id="story" className="story-section section-pad">
          <div className="panel-pad story-layout">
            <figure className="story-photo">
              {/* LAUNCH PHOTO — TEAM: add a real photo of the KBZ team in this frame.
                  The picture below is only a food stand-in. Do not use
                  public/brand/uniform-concept.jpeg as the team. */}
              <img
                src={foodPhotos.roastedGame.src}
                width={foodPhotos.roastedGame.width}
                height={foodPhotos.roastedGame.height}
                alt={foodPhotos.roastedGame.alt}
                loading="lazy"
              />
              <figcaption>{foodPhotos.roastedGame.caption}</figcaption>
            </figure>
            <div className="story-copy">
              <p className="eyebrow">Our story</p>
              <h2>Good food for our neighbours.</h2>
              <p>
                Ko Bazalwaneng is a takeaway in Mamelodi, Pretoria. We cook springbok
                on the grill and in the oven, and we serve it with potato wedges and
                a side salad.
              </p>
              <p>
                We are a Christian business. We want people to feel welcome when they
                collect their food. We hope the shop becomes a place where neighbours
                meet, look out for one another, and grow together. We are still getting
                ready. Those hopes will grow as the shop does.
              </p>
              <ul className="story-list">
                {storyHighlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="community" className="community-section section-pad">
          <div className="panel-pad community-layout">
            <div>
              <p className="eyebrow">What we care about</p>
              <h2>{business.campaignPhrase}</h2>
            </div>
            <div className="community-copy">
              <p>
                Our faith is part of this shop. We want to feed people well, welcome
                them, and be a good neighbour in Mamelodi. We are not open yet. Time
                together, and chances to help one another, will start once the takeaway
                is up and running.
              </p>
              <div className="pillars" aria-label="Values guiding Ko Bazalwaneng">
                {communityPillars.map((pillar) => (
                  <span key={pillar} className="pillar-tag">{pillar}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
          </>
        )}

        {activeTab === 'brand' && (
        <section id="brand" className="brand-vision-section section-pad">
          <div className="panel-pad">
            <div className="section-heading brand-vision-heading">
              <p className="eyebrow">The KBZ look</p>
              <h2>A springbok and a flame.</h2>
              <p className="section-intro">
                The springbok is the meat we cook. The flame is the fire we cook it on.
                When you see them together, you have found Ko Bazalwaneng.
              </p>
              <p className="section-intro">
                Our colours are dark charcoal, warm gold and burnt orange. They are the
                colours of wood, fire and a good meal. You will see them on the sign,
                the boxes and the clothes when the shop opens.
              </p>
              <p className="section-intro">
                These photos show the food: grilled game, potato wedges and a fresh
                salad. Pictures of our shop, our boxes and our team will be added when
                we have real ones.
              </p>
            </div>

            {/* LAUNCH PHOTOS — PREMISES, PACKAGING, TEAM: add real photos of the shop,
                the takeaway packaging and the team. These three pictures are food
                stand-ins only. Do not publish public/brand/storefront-concept.jpeg,
                interior-concept.jpeg, packaging-concept.jpeg or uniform-concept.jpeg
                as if they are the real shop, boxes or staff. */}
            <ul className="brand-photo-grid">
              {[
                ['From the fire', foodPhotos.platedGame, 'Grilled game, cooked over a fire.'],
                ['Potato wedges', foodPhotos.wedges, 'Crisp potato wedges for the side.'],
                ['Side salad', foodPhotos.salad, 'A fresh salad to eat with the meat.'],
              ].map(([label, photo, caption]) => (
                <li key={label}>
                  <figure>
                    <img
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={photo.alt}
                      loading="lazy"
                    />
                    <figcaption>
                      <span>{label}</span>
                      {caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
        )}

        {activeTab === 'contact' && (
        <section id="contact" className="contact-section section-pad">
          <div className="panel-pad">
            <div className="section-heading contact-heading">
              <p className="eyebrow">Keep in touch</p>
              <h2>Come and find us.</h2>
              <p className="section-intro">
                KBZ Springbok Grill is a takeaway in Mahube, Mamelodi. Message us on
                WhatsApp while we get ready to open.
              </p>
            </div>

            <div className="contact-grid">
              <article className="contact-card">
                <span className="contact-index">01 / FIND US</span>
                <h3>Find us.</h3>
                <p className="contact-address">
                  {business.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </p>
                {business.directions && (
                  <p className="contact-detail">
                    <a href={business.directions} target="_blank" rel="noreferrer">
                      Open in Google Maps
                    </a>
                  </p>
                )}
              </article>
              <article className="contact-card">
                <span className="contact-index">02 / SAY HELLO</span>
                <h3>Talk to KBZ.</h3>
                {business.telephoneNumber && (
                  <p className="contact-phone">
                    <a href={`tel:${business.telephoneNumber}`}>{business.telephoneNumber}</a>
                  </p>
                )}
                {hasWhatsApp && (
                  <p className="contact-phone">
                    <a href={`https://wa.me/${whatsappNumber}`}>WhatsApp: {business.whatsappNumber}</a>
                  </p>
                )}
                {business.operatingHours && <p>{business.operatingHours}</p>}
                {business.launchDate && <p>Opening date: {business.launchDate}</p>}
                {(business.instagram || business.facebook) && (
                  <div className="social-links" aria-label="Social media">
                    {business.instagram && (
                      <a href={business.instagram} target="_blank" rel="noreferrer">Instagram</a>
                    )}
                    {business.facebook && (
                      <a href={business.facebook} target="_blank" rel="noreferrer">Facebook</a>
                    )}
                  </div>
                )}
                {pendingSentence && <p className="contact-pending">{pendingSentence}</p>}
              </article>
            </div>

            <figure className="contact-photo">
              {/* LAUNCH PHOTO — PREMISES: add a real photo of the shop at
                  SS Mokoene Drive, Mahube, in this frame. The picture below is
                  only a food stand-in. Do not use public/brand/storefront-concept.jpeg
                  or public/brand/interior-concept.jpeg as the premises. */}
              <img
                src={foodPhotos.wedges.src}
                width={foodPhotos.wedges.width}
                height={foodPhotos.wedges.height}
                alt={foodPhotos.wedges.alt}
                loading="lazy"
              />
              <figcaption>
                A photo of the shop on SS Mokoene Drive will go here. For now, these
                are the potato wedges we plan to serve with the springbok.
              </figcaption>
            </figure>
          </div>
        </section>
        )}
          </div>
          </div>
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <button type="button" className="footer-brand" onClick={() => selectTab('home')}>
              <img src={brandLogo} alt="" />
              <span><strong>{business.name}</strong><small>{business.restaurantName}</small></span>
            </button>
            <p>{business.tagline}</p>
            <button type="button" className="back-to-top" onClick={() => selectTab('home')}>Home ↑</button>
          </div>
          <div className="container footer-bottom">
            <span>© {business.name}</span>
            <span>{business.location} · {business.status}</span>
          </div>
          <div className="container photo-credits">
            <p>
              Food photos are not our shop, our kitchen or our team. They were cropped
              and made smaller so the page can load quickly.
            </p>
            <ul>
              {Object.values(foodPhotos).map((photo) => (
                <li key={photo.src}>
                  <a href={photo.sourceUrl}>{photo.photographer}</a>
                  {', '}
                  <a href={photo.licenseUrl}>{photo.license}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
