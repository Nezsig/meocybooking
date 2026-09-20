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
      <section className="meocy-hero">
        <div className="max-w-4xl mx-auto">
          <h1>Photography That Sells</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-normal">
            Professional product, fashion, restaurant and model photography — shot in our Milan studio or on location.
          </p>
          <a
            href="#booking"
            className="inline-block px-10 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            Book a Shoot
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="meocy-section bg-white max-w-4xl mx-auto">
        <h2>About MEOCY</h2>
        <p className="text-base text-gray-700 leading-8 max-w-3xl">
          We are not just content creators — we operate a professional studio in Milan with comprehensive equipment and expertise. Whether you run a clothing brand, sell physical products, own a restaurant, or need a model shoot, you can send your items to our studio for controlled, branded photography — or we come to you: your shop, your restaurant, outdoor locations, anywhere your brand needs the best visual content, created professionally.
        </p>
      </section>

      {/* Packages */}
      <section id="packages" className="meocy-section bg-gray-50 max-w-6xl mx-auto">
        <h2>Packages & Pricing</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: 'Basic', price: '€200', features: ['Studio shoots', '15 photos', 'Raw & edited'] },
            { name: 'Silver', price: '€400', features: ['4 hours on-location', '40 photos', '1 video'] },
            { name: 'Gold', price: '€750', features: ['6 hours', '2 locations', '75 photos'], featured: true },
            { name: 'Platinum', price: '€1000', features: ['8 hours', '100 photos', '10 videos'] },
          ].map(pkg => (
            <div
              key={pkg.name}
              className={`meocy-package-card ${pkg.featured ? 'bg-gradient-to-br from-white to-[rgba(122,204,0,0.05)] border-gray-900' : ''}`}
            >
              <h3 className="text-xl font-black uppercase -tracking-tighter mb-3">{pkg.name}</h3>
              <p className={`meocy-package-price mb-6`}>{pkg.price}</p>
              <p className="text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">Package details</p>
              <ul className="space-y-3">
                {pkg.features.map(feature => (
                  <li key={feature} className="text-sm text-gray-700">
                    <span className="text-[#7acc00] font-bold mr-2">→</span>
                    {feature}
                  </li>
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
      <section id="booking" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Book Your Shoot</h2>
          <BookingFormAppleStyle />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 px-12">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-lg mb-4">MEOCY Studio</h4>
              <p className="text-gray-400 text-sm">Professional photography studio in Milan. Product, fashion, restaurant and model photography.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <a href="mailto:hello@meocy.com" className="text-gray-400 text-sm hover:text-[#7acc00] transition">hello@meocy.com</a>
              <p className="text-gray-400 text-sm mt-2">Milan, Italy</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Hours</h4>
              <p className="text-gray-400 text-sm">Monday - Friday<br />9:00 AM - 6:00 PM CET</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} MEOCY Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
