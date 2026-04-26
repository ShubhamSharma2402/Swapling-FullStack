import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600"
            alt="Nature Background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
            Swap for a <span className="text-green-200">Sustainable</span> Future
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-green-50 mx-auto mb-10">
            Swapling helps you discover eco-friendly products, compare their sustainability score, and trade items with the community rather than throwing them away.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link to="/explore" className="bg-white text-primary hover:bg-gray-50 font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Explore Products <ArrowRight size={20} />
            </Link>
            <Link to="/swap" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-full transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Join Swap Market <Recycle size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Why choose Swapling?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Eco Score Checking</h3>
              <p className="text-gray-600">Instantly know if a product is truly green. Our simple scoring system demystifies sustainability.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Recycle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Swaps</h3>
              <p className="text-gray-600">Reduce waste by swapping what you don't need for what you do. One person's trash is another's treasure.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Track Your Impact</h3>
              <p className="text-gray-600">View real numbers on your dashboard. See exactly how much plastic and CO2 you've saved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
