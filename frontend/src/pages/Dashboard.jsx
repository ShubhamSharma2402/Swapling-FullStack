import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Leaf, Recycle, Box, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    productsViewed: 12,
    swapsCompleted: 3,
    plasticSavedKg: 4.5
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Your Impact Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.username}! Here is your contribution to a sustainable planet.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Eco Products Viewed</p>
              <h3 className="text-4xl font-extrabold text-gray-900">{stats.productsViewed}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
              <Box size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Swaps Completed</p>
              <h3 className="text-4xl font-extrabold text-gray-900">{stats.swapsCompleted}</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-500 rounded-lg">
              <Recycle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 text-green-50 opacity-50">
             <Leaf size={120} />
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-primary mb-1">Est. Plastic Saved</p>
              <h3 className="text-4xl font-extrabold text-primary">{stats.plasticSavedKg} <span className="text-xl">kg</span></h3>
            </div>
            <div className="p-3 bg-primary text-white rounded-lg shadow-sm">
              <Trash2 size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
           <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
         </div>
         <ul className="divide-y divide-gray-200">
           <li className="px-6 py-4 flex items-center gap-4">
             <div className="bg-green-100 p-2 rounded-full text-green-600"><Leaf size={16} /></div>
             <p className="text-gray-700 font-medium">Viewed <span className="text-gray-900">Bamboo Toothbrush</span></p>
             <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
           </li>
           <li className="px-6 py-4 flex items-center gap-4">
             <div className="bg-purple-100 p-2 rounded-full text-purple-600"><Recycle size={16} /></div>
             <p className="text-gray-700 font-medium">Listed <span className="text-gray-900">Old Textbooks</span> for swap</p>
             <span className="ml-auto text-sm text-gray-500">1 day ago</span>
           </li>
         </ul>
      </div>
    </div>
  );
};

export default Dashboard;
