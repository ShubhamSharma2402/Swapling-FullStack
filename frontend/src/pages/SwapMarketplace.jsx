import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PackageOpen, Handshake, Calendar, Loader2, Leaf } from 'lucide-react';

const SwapMarketplace = () => {
  const { user } = useContext(AuthContext);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [itemName, setItemName] = useState('');
  const [materials, setMaterials] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchSwaps = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/swaps');
      const data = await response.json();
      setSwaps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  const handleAddSwap = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first to add an item.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/swaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, materials, description, image, price: price ? Number(price) : undefined })
      });
      if (response.ok) {
        setItemName('');
        setMaterials('');
        setDescription('');
        setPrice('');
        setImage(null);
        setImagePreview(null);
        fetchSwaps(); // Refresh the list
      }
    } catch (err) {
      console.error("Failed to add swap");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-10">
      
      {/* Left Column: Form */}
      <div className="w-full md:w-1/3">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <PackageOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">List an Item</h2>
          </div>
          
          <form onSubmit={handleAddSwap}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input 
                type="text" 
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="e.g. 5 unused notebooks"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Materials</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                placeholder="e.g. Cotton, Wood, Plastic"
                value={materials}
                onChange={e => setMaterials(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price to Buy (Leave blank if Swap-only)</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input 
                  type="number" 
                  className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="0.00"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2 text-center">
                  <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded-md mx-auto shadow-sm" />
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary resize-none"
                placeholder="Describe condition and what you want in exchange..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting || !user}
              className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-white 
                ${(!user || isSubmitting) ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary focus:ring-2 focus:ring-offset-2 focus:ring-primary'} 
                transition-colors flex justify-center mt-6`}
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add to Swap Marketplace'}
            </button>
            {!user && <p className="text-sm text-red-500 mt-3 text-center">Login required to list items</p>}
          </form>
        </div>
      </div>
      
      {/* Right Column: Marketplace */}
      <div className="w-full md:w-2/3">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Swap Marketplace</h1>
            <p className="text-gray-600">Browse items listed by the community.</p>
          </div>
          <p className="text-sm font-semibold text-primary">{swaps.length} Items Listed</p>
        </div>
        
        {loading ? (
           <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-4">
            {swaps.map(swap => (
              <div key={swap._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between gap-4 hover:shadow-md transition">
                <div className="flex gap-4 w-full sm:w-auto">
                  {swap.image ? (
                    <img src={swap.image} alt={swap.itemName} className="w-24 h-24 object-cover rounded-lg shadow-sm flex-shrink-0" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-50 flex flex-col items-center justify-center rounded-lg border border-gray-200 text-gray-400 flex-shrink-0">
                      <PackageOpen size={32} strokeWidth={1} />
                    </div>
                  )}
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {swap.itemName}
                        {swap.price ? <span className="text-green-600 font-semibold ml-2">₹{swap.price}</span> : null}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{swap.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mt-2 flex-wrap">
                      {swap.materials && <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded font-semibold"><Leaf size={14} className="text-primary"/> {swap.materials}</span>}
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><Handshake size={14} /> Listed by: {swap.user}</span>
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"><Calendar size={14} /> {new Date(swap.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                  <button onClick={() => alert("Swap requested! (Demo feature)")} className="w-full sm:w-auto px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-md text-sm font-medium transition-colors whitespace-nowrap shadow-sm">
                    Request Swap
                  </button>
                  {swap.price ? (
                    <button onClick={() => alert(`Buying item for ₹${swap.price}! (Demo feature)`)} className="w-full sm:w-auto px-6 py-2 bg-primary text-white hover:bg-secondary rounded-md text-sm font-medium transition-colors whitespace-nowrap shadow-sm">
                      Buy for ₹{swap.price}
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {swaps.length === 0 && (
              <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">No items listed yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapMarketplace;
