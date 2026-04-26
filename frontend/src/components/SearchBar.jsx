import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, filterScore, setFilterScore }) => {
  return (
    <div className="flex w-full mb-8 flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex-shrink-0 w-full sm:w-48">
        <select
          value={filterScore}
          onChange={(e) => setFilterScore(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="all">All Eco Scores</option>
          <option value="high">Eco Friendly (8-10)</option>
          <option value="medium">Moderate (5-7)</option>
          <option value="low">Harmful (&lt; 5)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
