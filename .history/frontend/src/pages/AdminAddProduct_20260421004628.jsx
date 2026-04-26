import { useState } from 'react';
import { Loader2, PlusCircle, ShieldAlert } from 'lucide-react';

const AdminAddProduct = () => {
  const [name, setName] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [amazonPrice, setAmazonPrice] = useState('');
  const [flipkartPrice, setFlipkartPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    
    try {
      const payload = {
        name,
        material,
        description,
        imageUrl: image, 
        prices: {
          amazon: Number(amazonPrice),
          flipkart: Number(flipkartPrice)
        }
      };

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setName('');
        setMaterial('');
        setDescription('');
        setAmazonPrice('');
        setFlipkartPrice('');
        setImage(null);
        setImagePreview(null);
        setMessage('Product successfully added to the Explore page!');
      } else {
        setMessage('Failed to add product. Please check the backend.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error. Failed to add product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="bg-primary/20 p-2 rounded-lg text-primary">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Control Panel</h2>
            <p className="text-gray-500 text-sm">Add a new commercial item to the Explore Page</p>
          </div>
        </div>

        {message && (
          <div className={`p-4 mb-6 rounded-md text-sm font-medium ${message.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleAddProduct} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input 
                type="text" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={name} onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <input 
                type="text" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={material} onChange={e => setMaterial(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amazon Price (₹)</label>
              <input 
                type="number" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={amazonPrice} onChange={e => setAmazonPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flipkart Price (₹)</label>
              <input 
                type="number" required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={flipkartPrice} onChange={e => setFlipkartPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
            <textarea 
              required rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              value={description} onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Product Photo</label>
            <input 
              type="file" accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="h-32 object-cover rounded-md border" />
              </div>
            )}
          </div>

          <div className="pt-4">
            <button 
              type="submit" disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-md shadow-sm text-base font-bold text-white flex justify-center items-center gap-2
                ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-secondary focus:ring-2 focus:ring-offset-2 focus:ring-primary'} 
                transition-colors`}
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><PlusCircle className="w-5 h-5"/> Add Product to Explore Catalog</>}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">Note: The Eco-Score for this item will be automatically generated by our AI moderation system.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddProduct;
