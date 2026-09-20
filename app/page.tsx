import BookingFormAppleStyle from './components/BookingFormAppleStyle';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Navigation from './components/Navigation';
import PricingCalculator from './components/Calculator';

export const metadata = {
  title: 'MEOCY — Photography Studio, Milan',
  description: 'Professional photography studio in Milan. Product, fashion, restaurant and model photography.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <section className="hero">
        <h1>Photography That Sells</h1>
        <p className="hero-subtitle">
          Professional product, fashion, restaurant and model photography — shot in our Milan studio or on location.
        </p>
        <div className="hero-cta">
          <a href="#booking" className="cta-primary">Book a Shoot</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <h2>About MEOCY</h2>
        <p>
          We are not just content creators — we operate a professional studio in Milan with comprehensive equipment and expertise. Whether you run a clothing brand, sell physical products, own a restaurant, or need a model shoot, you can send your items to our studio for controlled, branded photography — or we come to you: your shop, your restaurant, outdoor locations, anywhere your brand needs the best visual content, created professionally.
        </p>
      </section>

      {/* Packages */}
      <section id="packages" className="packages">
        <h2>Packages & Pricing</h2>
        <div className="packages-grid">
          {[
            { name: 'Basic', price: '€200', features: ['Studio shoots', '15 photos', 'Raw & edited'] },
            { name: 'Silver', price: '€400', features: ['4 hours on-location', '40 photos', '1 video'] },
            { name: 'Gold', price: '€750', features: ['6 hours', '2 locations', '75 photos'], featured: true },
            { name: 'Platinum', price: '€1000', features: ['8 hours', '100 photos', '10 videos'] },
          ].map(pkg => (
            <div
              key={pkg.name}
              className={`package-card ${pkg.featured ? 'featured' : ''}`}
            >
              <h3 className="package-name">{pkg.name}</h3>
              <p className="package-price">{pkg.price}</p>
              <p className="package-info">Package details</p>
              <ul className="package-features">
                {pkg.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Price Calculator */}
      <PricingCalculator />

      {/* FAQ */}
      <FAQ />

      {/* Booking Form */}
      <section id="booking" className="booking">
        <h2>Book Your Shoot</h2>
        <div className="form-container">
          <BookingFormAppleStyle />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-section">
            <h4>MEOCY Studio</h4>
            <p>Professional photography studio in Milan. Product, fashion, restaurant and model photography.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <a href="mailto:hello@meocy.com">hello@meocy.com</a>
            <p>Milan, Italy</p>
          </div>
          <div className="footer-section">
            <h4>Hours</h4>
            <p>Monday - Friday<br />9:00 AM - 6:00 PM CET</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MEOCY Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
