import React from "react";
import { Link, useLocation } from "react-router-dom";

function SearchResults() {
    
    const location = useLocation();
    const { results, query } = location.state || {};

    console.log("Inside search results component",results);

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {results.length > 0 ? (
        results.map((result) => (
          <div
            key={result.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold">{result.first_name} {result.last_name}</h3>
              <Link
                to={`/results`} state={{ userId: result.id }}
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
  );
}

export default SearchResults;
