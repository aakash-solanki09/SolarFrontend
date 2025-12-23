import { Search, X } from 'lucide-react';

const SearchBar = ({ keyword, setKeyword, placeholder = 'Search...' }) => {
    return (
        <div className="relative max-w-lg w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-solar-500 transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-solar-500 focus:ring-1 focus:ring-solar-500 sm:text-sm transition-all shadow-sm hover:shadow-md"
                placeholder={placeholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
                <button
                    onClick={() => setKeyword('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
