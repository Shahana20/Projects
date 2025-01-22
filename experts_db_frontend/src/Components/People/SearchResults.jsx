// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// function SearchResults() {
    
//     const location = useLocation();
//     const { results, query } = location.state || {};
//     const [sortedResults, setSortedResults] = useState(results);
//     const [showFilter, setShowFilter] = useState(false);


//     const handleSortChange = (e) => {
//       const sortOption = e.target.value;
  
//       if (sortOption === "alphabetical") {
//         const sorted = [...results].sort((a, b) => 
//           `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
//         );
//         setSortedResults(sorted);
//       } else {
//         setSortedResults(results); 
//       }
//       setShowFilter(false);
//     };

//     console.log("Inside search results component",results);

//   return (
//     <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {results.length > 0 ? (
//         results.map((result) => (
//           <div
//             key={result.id}
//             className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
//           >
//             <div className="text-center">
//               <h3 className="text-xl font-semibold">{result.first_name} {result.last_name}</h3>
//               <Link
//                 to={`/results`} state={{ userId: result.id }}
//                 className="mt-4 inline-block text-blue-600 hover:text-blue-800"
//               >
//                 View Profile
//               </Link>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="col-span-full text-center text-gray-500">
//           No results found.
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchResults;
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const { results = [], query } = location.state || {};

  const [sortedResults, setSortedResults] = useState(results);
  const [showFilter, setShowFilter] = useState(false);

  const handleSortChange = (option) => {
    if (option === "alphabetical") {
      const sorted = [...results].sort((a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
      );
      setSortedResults(sorted);
    } else {
      setSortedResults(results); // Reset to original results if no sorting
    }
    setShowFilter(false); // Close the filter menu
  };

  console.log("Inside search results component", sortedResults);

  return (
    <div className="mt-6">
      {/* Filter Button */}
      <div className="mb-4 flex justify-end relative">
        <button
          className="border border-gray-300 bg-white rounded-md px-4 py-2 shadow hover:shadow-lg focus:outline-none"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </button>

        {/* Dropdown Menu */}
        {showFilter && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <h3 className="px-4 py-2 font-semibold text-gray-700">Sort By</h3>
            <button
              className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
              onClick={() => handleSortChange("alphabetical")}
            >
              Alphabetical Order
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedResults.length > 0 ? (
          sortedResults.map((result) => (
            <div
              key={result.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold">
                  {result.first_name} {result.last_name}
                </h3>
                <Link
                  to={`/results`}
                  state={{ userId: result.id }}
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
