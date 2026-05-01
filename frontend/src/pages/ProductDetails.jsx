import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Info, Leaf, ShoppingBag } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePlatform, setActivePlatform] = useState('amazon');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          const found = data.find(p => p._id === id);
          setProduct(found);
        }
      } catch (err) {
        console.error("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Link to="/explore" className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Back to explore
        </Link>
      </div>
    );
  }

  const getScoreBadge = (score) => {
    if (score >= 8) return { label: 'Eco Friendly 🌱', bg: 'bg-green-100 text-green-800' };
    if (score >= 5) return { label: 'Moderate ⚠️', bg: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Harmful ❌', bg: 'bg-red-100 text-red-800' };
  };

  const badge = getScoreBadge(product.ecoScore);
  const isBestDeal = (platform) => {
      if (platform === 'amazon') return product.prices.amazon <= product.prices.flipkart;
      if (platform === 'flipkart') return product.prices.flipkart <= product.prices.amazon;
      return false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/explore" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Explore
      </Link>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 h-[400px] md:h-auto bg-gray-100 p-8 flex items-center justify-center">
           <img 
            src={product.imageUrl || "https://placehold.co/600x600"} 
            alt={product.name} 
            className="max-h-full object-contain rounded-xl shadow-sm"
           />
        </div>
        
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col">
          <div className="mb-6 flex flex-wrap items-center gap-3">
             <span className={`px-3 py-1 rounded-full text-sm font-bold ${badge.bg}`}>
               {badge.label}
             </span>
             <span className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
               <Leaf size={14} /> Score: {product.ecoScore}/10
             </span>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-8">{product.description}</p>
          
          <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Info size={18} /> Specifications</h3>
            <ul className="space-y-2 text-gray-700">
               <li><span className="font-medium text-gray-900">Material:</span> {product.material}</li>
               <li><span className="font-medium text-gray-900">Impact:</span> {product.ecoScore >= 8 ? 'Low environmental impact. Good choice!' : 'Consider finding a greener alternative.'}</li>
            </ul>
          </div>

          <div className="mt-auto border-t border-gray-200 pt-8">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ShoppingBag size={18} /> Price Comparison</h3>
            
            <div className="bg-gray-100 p-1.5 rounded-xl mb-6 flex">
                <button 
                onClick={() => setActivePlatform('amazon')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activePlatform === 'amazon' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                Amazon
                </button>
                <button 
                onClick={() => setActivePlatform('flipkart')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activePlatform === 'flipkart' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                Flipkart
                </button>
            </div>

            <div className="bg-white border-2 border-primary rounded-xl p-6 relative">
              {isBestDeal(activePlatform) && (
                <div className="absolute -top-3 -right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                   ✨ Best Deal
                </div>
              )}
              <p className="text-gray-500 mb-2 capitalize">{activePlatform} Latest Price</p>
              <p className="text-4xl font-extrabold text-gray-900">₹{product.prices[activePlatform]}</p>
            </div>
            
            <button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-4 rounded-xl transition-transform hover:scale-[1.02] shadow-sm">
              Buy on {activePlatform.charAt(0).toUpperCase() + activePlatform.slice(1)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
