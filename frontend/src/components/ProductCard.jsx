import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, ExternalLink, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [activePlatform, setActivePlatform] = useState('amazon');
  
  // Logic to determine score tag
  const getScoreBadge = (score) => {
    if (score >= 8) return { label: 'Eco Friendly 🌱', bg: 'bg-green-100 text-green-800 border-green-200' };
    if (score >= 5) return { label: 'Moderate ⚠️', bg: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    return { label: 'Harmful ❌', bg: 'bg-red-100 text-red-800 border-red-200' };
  };

  const badge = getScoreBadge(product.ecoScore);
  const isAmazonCheaper = product.prices.amazon <= product.prices.flipkart;
  const isFlipkartCheaper = product.prices.flipkart <= product.prices.amazon;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        <img 
          src={product.imageUrl || "https://placehold.co/400x300"} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex gap-1">
           <span className={`px-2 py-1 rounded-full text-xs font-semibold border shadow-sm ${badge.bg}`}>
             {badge.label} ({product.ecoScore}/10)
           </span>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <Info className="w-4 h-4" /> Material: <span className="font-medium text-gray-700">{product.material}</span>
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="border-t border-gray-100 pt-4 mt-auto">
          {/* Interactive Price Comparison */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-3">
            <button 
              onClick={() => setActivePlatform('amazon')}
              className={`flex-1 text-sm py-1 font-medium rounded-md transition-colors ${activePlatform === 'amazon' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Amazon
            </button>
            <button 
              onClick={() => setActivePlatform('flipkart')}
              className={`flex-1 text-sm py-1 font-medium rounded-md transition-colors ${activePlatform === 'flipkart' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Flipkart
            </button>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100 transition-all">
             <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-600 capitalize">{activePlatform} Price:</span>
             </div>
             <div className="text-right">
                <p className="text-xl font-bold text-gray-900">₹{product.prices[activePlatform]}</p>
                {activePlatform === 'amazon' && isAmazonCheaper && <span className="text-xs text-primary font-medium">✨ Best Deal</span>}
                {activePlatform === 'flipkart' && isFlipkartCheaper && <span className="text-xs text-primary font-medium">✨ Best Deal</span>}
             </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
         <Link to={`/product/${product._id}`} className="text-primary hover:text-secondary text-sm font-medium flex items-center justify-center gap-1 transition-colors">
            View Full Details <ExternalLink className="w-4 h-4" />
         </Link>
      </div>
    </div>
  );
};

export default ProductCard;
