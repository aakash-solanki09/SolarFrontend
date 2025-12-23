import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pages, page, setPage, total, limit, setLimit }) => {
    if (total === 0) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-sm gap-4">
            {/* Mobile / Small Screen: Simple Prev/Next */}
            <div className="flex flex-1 justify-between sm:hidden w-full">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <div className="flex items-center gap-2">
                     <span className="text-sm text-gray-700">Page {page} of {pages}</span>
                </div>
                <button
                    onClick={() => setPage(Math.min(pages, page + 1))}
                    disabled={page === pages}
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${page === pages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex flex-1 items-center justify-between">
                <div>
                     {setLimit && (
                        <div className="flex items-center gap-2">
                            <label htmlFor="limit" className="text-sm text-gray-700">Rows:</label>
                            <select
                                id="limit"
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value));
                                    setPage(1); // Reset to page 1 on limit change
                                }}
                                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-solar-600 sm:text-sm sm:leading-6 cursor-pointer"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{Math.min((page - 1) * limit + 1, total)}</span> to <span className="font-medium">{Math.min(page * limit, total)}</span> of{' '}
                        <span className="font-medium">{total}</span> results
                    </p>

                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        
                        {/* Show limited page numbers around current page */}
                        {pages > 0 && 
                            // Create array of page numbers [1...pages]
                            [...Array(pages).keys()]
                            .map(x => x + 1)
                            // Filter to show only relevant pages (Optional: customize logic)
                            // For now, let's show all if small, or strict subset if large. 
                            // Simplest: Just map over strict slice
                            .filter(p => p === 1 || p === pages || (p >= page - 1 && p <= page + 1))
                            .map((p, index, array) => {
                                // Logic to add dots could go here but keeping it simple for now
                                // Returning button directly
                                return (
                                     <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        aria-current={p === page ? 'page' : undefined}
                                        className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solar-600 ${
                                            p === page
                                                ? 'bg-solar-600 text-white'
                                                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })
                        }
                        
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === pages}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === pages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
