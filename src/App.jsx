import { useMemo, useState } from 'react'
import './App.css'
import {
  business,
  communityPillars,
  heroImage,
  menuItems,
  storyImage,
  storyHighlights,
} from './config'

const formatPrice = (amount) => {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return 'Price on request'
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

  const buildWhatsAppMessage = () => {
    const lines = ['Hello Ko Bazlwaneng, I would like to order:']

    order.forEach((entry) => {
      const priceInfo = entry.price === null || entry.price === undefined ? '' : ` @ ${formatPrice(entry.price)}`
      lines.push(`- ${entry.name} x${entry.quantity}${priceInfo}`)
    })

    if (order.length === 0) {
      lines.push('- No items selected yet')
    }

    const subtotal = order.reduce((sum, entry) => {
      const itemPrice = Number(entry.price ?? 0)
      return sum + itemPrice * entry.quantity
    }, 0)

    if (subtotal > 0) {
      lines.push(`Total: ${formatPrice(subtotal)}`)
    }

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
          <a href="#home" className="brand" aria-label="Ko Bazlwaneng home">
            <img src="/logo-mark.svg" alt="Ko Bazlwaneng logo" className="brand-mark" />
            <span>Ko Bazlwaneng</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#menu">Menu</a>
            <a href="#story">Our Story</a>
            <a href="#contact">Contact Us</a>
          </nav>

          <a href="#order" className="primary-button">
            Order Food
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero-section container">
          <div className="hero-copy">
            <img src="/logo-ko-bazlwaneng.svg" alt="Ko Bazlwaneng logo" className="hero-logo" />
            <h1>Good Food. Good People. Good Purpose.</h1>
            <p className="hero-text">
              Delicious springbok, tasty sides, and a place where everyone is welcome.
            </p>
            <div className="hero-actions">
              <a href="#menu" className="primary-button large-button">
                See Our Menu
              </a>
              <button type="button" className="secondary-button large-button" onClick={openWhatsAppOrder} disabled={!hasWhatsApp}>
                {hasWhatsApp ? 'Order on WhatsApp' : 'WhatsApp ordering coming soon'}
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <img src={heroImage} alt="Springbok meal served with fries and drinks" />
          </div>
        </section>

        <section id="menu" className="menu-section container">
          <div className="section-heading">
            <p className="eyebrow">Mockup Menu</p>
            <h2>Township favourites from the grill.</h2>
            <p className="mockup-note">Sample dishes and prices for design review; final menu to be confirmed.</p>
          </div>

          <div className="menu-grid">
            {menuItems.map((item) => (
              <article key={item.id} className="menu-card">
                <img src={item.image} alt={item.name} />
                <div className="card-body">
                  <span className="card-tag">{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="card-meta">
                    <strong>{formatPrice(item.price)}</strong>
                    <button type="button" className="add-button" onClick={() => addToOrder(item)}>
                      Add to Order
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="order-section container" id="order">
          <div className="section-heading">
            <p className="eyebrow">Quick Order</p>
            <h2>Your order</h2>
          </div>

          <div className="order-layout">
            <div className="order-panel">
              {order.length === 0 ? (
                <p className="empty-state">Your basket is empty. Choose a meal to begin.</p>
              ) : (
                <ul className="order-list">
                  {order.map((entry) => (
                    <li key={entry.id} className="order-item">
                      <div>
                        <strong>{entry.name}</strong>
                        <span>{formatPrice(entry.price)}</span>
                      </div>

                      <div className="quantity-controls" aria-label={`Quantity for ${entry.name}`}>
                        <button type="button" onClick={() => updateQuantity(entry.id, entry.quantity - 1)}>
                          −
                        </button>
                        <span>{entry.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(entry.id, entry.quantity + 1)}>
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="summary-panel">
              <h3>Order summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button type="button" className="primary-button wide-button" onClick={openWhatsAppOrder} disabled={!hasWhatsApp}>
                Send to WhatsApp
              </button>
              {!hasWhatsApp && (
                <p className="setup-note">
                  WhatsApp ordering will be enabled when the confirmed business number is added in international format.
                </p>
              )}
            </aside>
          </div>
        </section>

        <section id="story" className="story-section container">
          <div className="story-copy">
            <p className="eyebrow">Our Story</p>
            <h2>More Than Food. A Place to Belong.</h2>
            <p>
              Ko Bazlwaneng is a Mamelodi-inspired township food stop where neighbours, families, and friends gather for a proper meal, good conversation, and a warm sense of belonging. We serve food with heart, pride, and real community spirit.
            </p>
            <ul className="story-list">
              {storyHighlights.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="story-image-card">
            <img src={storyImage} alt="Mockup food photo; replace with Ko Bazlwaneng food and community photography" />
            <p className="image-caption">Mockup food photography. Real food and community photos can be added when available.</p>
          </div>
        </section>

        <section className="faith-section container">
          <div className="section-heading center-heading">
            <p className="eyebrow">Faith & Community</p>
            <h2>Serving Great Food. Sharing Love. Building Community.</h2>
          </div>

          <div className="faith-copy">
            <p>
              The heart of Ko Bazlwaneng is rooted in Christian values: love, kindness, integrity, generosity, and respect. We believe a warm meal and a welcoming space can bring people together, help neighbours connect, and make every guest feel at home.
            </p>
            <div className="pillars" aria-label="Core values">
              {communityPillars.map((pillar) => (
                <span key={pillar} className="pillar-tag">
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section container">
          <div className="section-heading">
            <p className="eyebrow">Contact Us</p>
            <h2>Find us and place your order.</h2>
            {business.isMockup && (
              <p className="mockup-note">
                Mockup preview: business contact details, address, hours, and social links will be added when confirmed.
              </p>
            )}
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <h3>Business details</h3>
              <ul>
                {hasWhatsApp && <li><strong>WhatsApp:</strong> <a href={`https://wa.me/${whatsappNumber}`}>{business.whatsappNumber}</a></li>}
                {business.telephoneNumber && <li><strong>Telephone:</strong> <a href={`tel:${business.telephoneNumber}`}>{business.telephoneNumber}</a></li>}
                {business.location && <li><strong>Location:</strong> {business.location}</li>}
                {business.address && <li><strong>Address:</strong> {business.address}</li>}
                {business.operatingHours && <li><strong>Hours:</strong> {business.operatingHours}</li>}
                {business.directions && <li><strong>Directions:</strong> {business.directions}</li>}
              </ul>
            </div>

            <div className="contact-card">
              <h3>Connect online</h3>
              <div className="social-links">
                {business.instagram && (
                  <a href={business.instagram} target="_blank" rel="noreferrer">Instagram</a>
                )}
                {business.facebook && (
                  <a href={business.facebook} target="_blank" rel="noreferrer">Facebook</a>
                )}
                {!business.instagram && !business.facebook && (
                  <p>Social links will appear here once the official pages are confirmed.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
