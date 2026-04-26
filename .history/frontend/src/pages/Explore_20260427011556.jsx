import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { Loader2 } from 'lucide-react';

const Explore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState('all');

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://swapling-fullstack-1.onrender.com//api/products');
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

      {loading ? (
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
