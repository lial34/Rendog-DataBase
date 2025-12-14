import React, { useState, useEffect, useMemo } from 'react';
import { Search, Info, Database, X } from 'lucide-react';
import ItemCard from './components/ItemCard.jsx';
import { parseData } from './utils.js';
import { RAW_DATA } from './data.js'; 

const App = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const parsedItems = parseData(RAW_DATA);
    setItems(parsedItems);
    const uniqueCategories = ['ALL', ...new Set(parsedItems.map(item => item.category))];
    setCategories(uniqueCategories);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(lowerSearch) ||
        item.category.toLowerCase().includes(lowerSearch) ||
        item.desc.toLowerCase().includes(lowerSearch);
      
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-indigo-500 selection:text-white">
      <style>{`
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
      `}</style>
      
      {/* 검색 섹션 */}
      <div className="flex flex-col items-center justify-center pt-24 pb-12 px-4">
        <div className="flex flex-col items-center animate-fade-in-down mb-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
            RendogDB
            </h1>
            <p className="text-gray-400 text-lg font-light tracking-wide">
             Get item prices faster than anyone else
            </p>
        </div>

        <div className="relative w-full max-w-2xl group z-10">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-12 py-5 bg-gray-800 border-2 border-gray-700 rounded-full text-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-xl hover:shadow-2xl hover:border-gray-600"
            placeholder="Search items"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 카테고리 필터 */}
        <div className="mt-8 w-full max-w-4xl pb-2">
            <div className="flex flex-wrap justify-center gap-2 px-4">
            {categories.map(cat => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border border-transparent
                    ${selectedCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-600'}`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>
      </div>

      {/* 결과 섹션 */}
      <div className="max-w-5xl mx-auto px-6 mb-4 flex justify-between items-end border-b border-gray-800 pb-2">
        <span className="text-gray-500 text-sm">
              Found {filteredItems.length} results
        </span>
        <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-900/30 px-3 py-1 rounded-md border border-indigo-500/30">
            <Info size={14} />
            <span>53 = 5강 30개 | 8172 = 8강 1개 + 7강 2개</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20 space-y-4">
        {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
        ))}

        {filteredItems.length === 0 && (
             <div className="text-center py-20 opacity-50 flex flex-col items-center">
                 <Database className="w-16 h-16 mb-4 text-gray-600"/>
                 <p className="text-xl text-gray-400">No items found matching "{searchTerm}"</p>
                 <p className="text-sm text-gray-600 mt-2">Try searching for item name or category.</p>
             </div>
        )}
      </div>
      
      <footer className="text-center py-10 text-gray-600 text-sm border-t border-gray-800 bg-gray-900/50">
          <p>© 2025 Rendog Market Price DB.</p>
          <p className="mt-1 opacity-50">Data updated: 2025.11.28</p>
          <p className="mt-1 opacity-50">Update Supporter: Version7</p>
      </footer>
    </div>
  );
};


export default App;

