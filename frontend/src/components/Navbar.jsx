import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, UserCircle, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow relative w-full z-10 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-tight text-gray-900">Swapling</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/explore" className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Explore
              </Link>
              <Link to="/swap" className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Swap Market
              </Link>
              <Link to="/dashboard" className="border-transparent text-gray-500 hover:border-primary hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Dashboard
              </Link>
              {user && user.email === 'sharma6336y@gmail.com' && (
                <Link to="/admin/add-product" className="border-transparent text-primary hover:border-primary hover:text-secondary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors">
                  Add Item (Admin)
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                 <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                   <UserCircle className="h-5 w-5" />
                   {user.username}
                 </span>
                 <button onClick={logout} className="text-gray-500 hover:text-red-500 transition flex items-center gap-1 text-sm bg-gray-100 px-3 py-1.5 rounded-md">
                   <LogOut className="h-4 w-4" /> Logout
                 </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                 <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">Login</Link>
                 <Link to="/register" className="ml-3 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
