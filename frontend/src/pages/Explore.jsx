import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { Loader2 } from 'lucide-react';
import API_BASE_URL from '../apiConfig';

const INITIAL_PRODUCTS = [
  { _id: '1', name: 'Bamboo Toothbrush', ecoScore: 9, material: 'Bamboo, Nylon', prices: { amazon: 120, flipkart: 110 }, imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', description: 'Sustainable bamboo toothbrush. Good alternative to plastic.' },
  { _id: '2', name: 'Plastic Bottle', ecoScore: 2, material: 'PET Plastic', prices: { amazon: 20, flipkart: 20 }, imageUrl: 'https://images.unsplash.com/photo-1614846027182-53f7ecba1672?w=400', description: 'Harmful single-use plastic water bottle.' },
  { _id: '3', name: 'Steel Water Bottle', ecoScore: 8, material: 'Stainless Steel', prices: { amazon: 499, flipkart: 450 }, imageUrl: 'https://images.unsplash.com/photo-1602143399827-bd95ef6f0c26?w=400', description: 'Reusable steel water bottle. Best for environment.' },
  { _id: '4', name: 'Cotton Tote Bag', ecoScore: 7, material: 'Organic Cotton', prices: { amazon: 150, flipkart: 140 }, imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400', description: 'Reusable shopping bag made of organic cotton.' }
];

const Explore = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState('all');

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch");
        }
      } catch (err) {
        console.error("No backend found, using mock data directly would go here if not handled by backend fallback.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.material.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Score filter
    let matchesScore = true;
    if (filterScore === 'high') matchesScore = product.ecoScore >= 8;
    else if (filterScore === 'medium') matchesScore = product.ecoScore >= 5 && product.ecoScore <= 7;
    else if (filterScore === 'low') matchesScore = product.ecoScore < 5;

    return matchesSearch && matchesScore;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Explore Products</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Discover everyday items and see their environmental impact. 
          Compare prices across platforms and choose eco-friendly alternatives.
        </p>
      </div>

      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filterScore={filterScore} 
        setFilterScore={setFilterScore} 
      />

      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;
