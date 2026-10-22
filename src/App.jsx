import { useMemo, useState } from 'react'
import './App.css'
import {
  brandConcepts,
  brandLogo,
  business,
  communityPillars,
  heroImage,
  menuItems,
  storyHighlights,
} from './config'

const formatPrice = (amount) => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return 'Price to be confirmed'
  }

  return `R ${Number(amount).toFixed(2)}`
}

function App() {
  const [order, setOrder] = useState([])

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

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="nav-wrap container">
          <a href="#home" className="brand" aria-label={`${business.name} home`}>
            <img src={brandLogo} alt="" className="brand-mark" />
            <span className="brand-name">
              <strong>{business.name}</strong>
              <small>{business.restaurantName}</small>
            </span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#menu">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#community">Community</a>
            <a href="#brand">Brand</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#order" className="primary-button nav-cta">
            Enquire
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero-section container">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" aria-hidden="true" />
              {business.location} <span aria-hidden="true">/</span> {business.status}
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
              A new springbok grill is taking shape in {business.location.split(',')[0]}.
              Follow our journey as we get ready to bring good food and a stronger
              community together.
            </p>
            <div className="hero-actions">
              <a href="#menu" className="primary-button large-button">
                Explore our menu
              </a>
              <a href="#contact" className="secondary-button large-button">
                Contact us
              </a>
            </div>
            <p className="hero-footnote">Menu, prices and launch details are being finalised.</p>
          </div>

          <div className="hero-visual">
            <img
              src={heroImage}
              alt="Visualisation of a Ko Bazalwaneng-branded springbok grill storefront, not current business premises"
              fetchPriority="high"
            />
            <div className="image-stamp">
              {business.campaignPhrase.split('. ').map((word) => (
                <span key={word}>{word.replace('.', '')}.</span>
              ))}
            </div>
            <p className="photo-note">
              Storefront concept visualisation only — not the current business premises.
            </p>
          </div>
        </section>

        <div className="announcement-bar" role="status">
          <span className="announcement-mark" aria-hidden="true">KBZ</span>
          <p>
            <strong>We’re getting ready.</strong> Opening date and ordering details will
            be shared once confirmed.
          </p>
          <a href="#contact">Stay in touch <span aria-hidden="true">↗</span></a>
        </div>

        <section id="menu" className="menu-section section-pad">
          <div className="container">
            <div className="section-heading menu-heading">
              <div>
                <p className="eyebrow">A first look</p>
                <h2>Made for the grill.<br />Made to bring people together.</h2>
              </div>
              <p className="section-intro">
                We’re shaping a takeaway-first menu around springbok and satisfying
                sides. These are ideas in development—not a confirmed menu.
              </p>
            </div>

            <div className="menu-notice">
              <span className="notice-icon" aria-hidden="true">i</span>
              <p>
                <strong>Menu preview</strong>
                <span>Items, portion sizes, availability and prices are subject to owner confirmation.</span>
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

        <section className="order-section section-pad" id="order">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Takeaway enquiries</p>
              <h2>Start a conversation.</h2>
              <p className="section-intro">
                Add ideas from the preview to your enquiry. When you’re ready, we’ll
                open a WhatsApp message to the business number.
              </p>
            </div>

            <div className="order-layout">
              <div className="order-panel">
                <h3>Your enquiry</h3>
                {order.length === 0 ? (
                  <p className="empty-state">Your list is empty. Add an idea from the menu preview.</p>
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
                  className="primary-button wide-button"
                  onClick={openWhatsAppOrder}
                  disabled={!hasWhatsApp || order.length === 0}
                >
                  Send WhatsApp enquiry
                </button>
                {!hasWhatsApp && (
                  <p className="setup-note">
                    WhatsApp will be available once the official business number is
                    confirmed. No ordering endpoint has been added.
                  </p>
                )}
              </aside>
            </div>
          </div>
        </section>

        <section id="story" className="story-section section-pad">
          <div className="container story-layout">
            <div className="story-art" aria-hidden="true">
              <span className="story-art-kbz">KBZ</span>
              <span className="story-art-rule" />
              <span className="story-art-caption">Good food.<br />Stronger community.</span>
            </div>
            <div className="story-copy">
              <p className="eyebrow">Our story</p>
              <h2>More than a meal.<br />A vision taking shape.</h2>
              <p>
                Ko Bazalwaneng is building towards more than a food business. KBZ
                Springbok Grill begins with a simple ambition: serve food with care,
                offer warm hospitality and create room for people to connect.
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
          <div className="container community-layout">
            <div>
              <p className="eyebrow">Our intention</p>
              <h2>{business.campaignPhrase}</h2>
            </div>
            <div className="community-copy">
              <p>
                We hope to grow into a welcoming place for fellowship, mentorship and
                service. That community vision is part of our journey ahead—not a
                programme already underway.
              </p>
              <div className="pillars" aria-label="Values guiding Ko Bazalwaneng">
                {communityPillars.map((pillar) => (
                  <span key={pillar} className="pillar-tag">{pillar}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="brand" className="brand-vision-section section-pad">
          <div className="container">
            <div className="section-heading brand-vision-heading">
              <p className="eyebrow">The KBZ identity</p>
              <h2>A bold mark. A warm welcome.</h2>
              <p className="section-intro">
                Your springbok-and-flame logo leads a distinctive identity in dark
                charcoal, warm gold and burnt orange. These supplied images show the
                direction the brand could take across the space, packaging and team.
              </p>
            </div>

            <details className="brand-concepts-disclosure">
              <summary>View the brand concept gallery</summary>
              <div className="concept-disclaimer">
                These are concept visualisations, not photographs of completed premises,
                final packaging, or current staff. Final brand assets and business details
                are still to be confirmed.
              </div>

              <div className="brand-concept-grid">
                {brandConcepts.map((concept) => (
                  <article key={concept.id} className="brand-concept-card">
                    <img src={concept.image} alt={concept.alt} loading="lazy" />
                    <div className="brand-concept-caption">
                      <span>{concept.label}</span>
                      <h3>{concept.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </details>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="container">
            <div className="section-heading contact-heading">
              <p className="eyebrow">Keep in touch</p>
              <h2>KBZ is coming to {business.location.split(',')[0]}.</h2>
              <p className="section-intro">
                Send us a WhatsApp enquiry or find the address we’ve shared. Opening
                hours and the launch date will be added once confirmed.
              </p>
            </div>

            <div className="contact-grid">
              <article className="contact-card">
                <span className="contact-index">01 / FIND US</span>
                <h3>Find us in {business.location.split(',')[0]}.</h3>
                <p>{business.location}</p>
                {business.address ? (
                  <p className="contact-detail">{business.address}</p>
                ) : (
                  <p className="contact-detail">
                    Exact address will be added once the operating location is confirmed.
                  </p>
                )}
                {business.directions && (
                  <p className="contact-detail">
                    <a href={business.directions} target="_blank" rel="noreferrer">
                      Find this address on Google Maps
                    </a>
                  </p>
                )}
                <span className="contact-status">
                  {business.address ? 'Location details' : 'Address to be confirmed'}
                </span>
              </article>
              <article className="contact-card">
                <span className="contact-index">02 / SAY HELLO</span>
                <h3>Talk to KBZ.</h3>
                {business.telephoneNumber ? (
                  <p><a href={`tel:${business.telephoneNumber}`}>{business.telephoneNumber}</a></p>
                ) : (
                  <p>Phone details to be confirmed.</p>
                )}
                {hasWhatsApp && (
                  <p><a href={`https://wa.me/${whatsappNumber}`}>WhatsApp: {business.whatsappNumber}</a></p>
                )}
                <p className="contact-detail">
                  {business.operatingHours || 'Opening hours to be announced.'}
                </p>
                <p className="contact-detail">
                  {business.launchDate
                    ? `Launch: ${business.launchDate}`
                    : 'Launch date to be announced.'}
                </p>
                <span className="contact-status">
                  {business.telephoneNumber || hasWhatsApp ? 'Contact details' : 'Details coming soon'}
                </span>
              </article>
            </div>

            {(business.instagram || business.facebook) ? (
              <div className="social-links" aria-label="Social media">
                {business.instagram && (
                  <a href={business.instagram} target="_blank" rel="noreferrer">Instagram</a>
                )}
                {business.facebook && (
                  <a href={business.facebook} target="_blank" rel="noreferrer">Facebook</a>
                )}
              </div>
            ) : (
              <p className="social-placeholder">Official social pages to be confirmed.</p>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#home" className="footer-brand">
            <img src={brandLogo} alt="" />
            <span><strong>{business.name}</strong><small>{business.restaurantName}</small></span>
          </a>
          <p>{business.tagline}</p>
          <a href="#home" className="back-to-top">Back to top ↑</a>
        </div>
        <div className="container footer-bottom">
          <span>© {business.name}</span>
          <span>{business.location} · {business.status}</span>
        </div>
      </footer>
      <a className="scroll-top" href="#home" aria-label="Back to top">
        <span aria-hidden="true">↑</span>
        <span>Top</span>
      </a>
    </div>
  )
}

export default App
