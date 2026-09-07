import BookingFormAppleStyle from './components/BookingFormAppleStyle';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Navigation from './components/Navigation';

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
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Photography That Sells
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional product, fashion, restaurant and model photography — shot in our Milan studio or on location.
          </p>
          <a
            href="#booking"
            className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Book a Shoot
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">About MEOCY</h2>
          <p className="text-lg text-gray-700 leading-8">
            We are not just content creators — we operate a professional studio in Milan with comprehensive equipment and expertise. Whether you run a clothing brand, sell physical products, own a restaurant, or need a model shoot, you can send your items to our studio for controlled, branded photography — or we come to you: your shop, your restaurant, outdoor locations, anywhere your brand needs the best visual content, created professionally.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Packages & Pricing</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Basic', price: '€200', features: ['Studio shoots', '15 photos', 'Raw & edited'] },
              { name: 'Silver', price: '€400', features: ['4 hours on-location', '40 photos', '1 video'] },
              { name: 'Gold', price: '€750', features: ['6 hours', '2 locations', '75 photos'], featured: true },
              { name: 'Platinum', price: '€1000', features: ['8 hours', '100 photos', '10 videos'] },
            ].map(pkg => (
              <div
                key={pkg.name}
                className={`p-6 rounded-lg border ${
                  pkg.featured
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                <p className={`text-2xl font-bold mb-4 ${pkg.featured ? '' : 'text-gray-900'}`}>{pkg.price}</p>
                <ul className="space-y-2 text-sm">
                  {pkg.features.map(feature => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

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
      <footer className="border-t border-gray-200 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} MEOCY Studio. All rights reserved.</p>
          <p className="mt-2">hello@meocy.com | Milan, Italy</p>
        </div>
      </footer>
    </div>
  );
}
