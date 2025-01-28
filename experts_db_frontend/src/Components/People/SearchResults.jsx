import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Filter from "./Filter";
import SortResults from "./SortResults";
import axios from "axios";

function SearchResults() {
  const location = useLocation();
  const { results = [], query } = location.state || {};

  const [filteredResults, setFilteredResults] = useState(results);
  const [sortedResults, setSortedResults] = useState(results);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    skills: [],
    specializations: [],
    roles: [],
    companies: [],
    designations: [],
  });

  const [appliedFilters, setAppliedFilters] = useState([]);
  useEffect(() => {
    setAppliedFilters([]);
    setFilteredResults(results);
    setSortedResults(results);
  }, [results]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const locationsData = await axios.get(`http://localhost:4000/api/v1/filter/locations`);
        const skillsData = await axios.get(`http://localhost:4000/api/v1/filter/skills`);
        const rolesData = await axios.get(`http://localhost:4000/api/v1/filter/roles`);
        const companiesData = await axios.get(`http://localhost:4000/api/v1/filter/companies`);
        const designationsData = await axios.get(`http://localhost:4000/api/v1/filter/designations`);
        const careerData = await axios.get(`http://localhost:4000/api/v1/career_details`)
        

        setFilterOptions({
          locations: locationsData.data,
          skills: skillsData.data,
          specializations: skillsData.data, 
          roles: rolesData.data,
          companies: companiesData.data,
          designations: designationsData.data,
          careerDetails: careerData.data
        });
      } catch (error) {
        console.error("Error fetching filter data", error);
      }
    };

    fetchFilterData();
  }, []);

  const handleFilterChange = (filtered, applied) => {
    setFilteredResults(filtered);
    setSortedResults(filtered);
    setAppliedFilters(applied);
    console.log("applied filters", appliedFilters);
  };

  const handleSortChange = (sorted) => {
    setSortedResults(sorted);
  };

  return (
    <div className="mt-6">
      <div className="mb-4 flex justify-end gap-4 relative">
        <button
          className="border border-gray-300 bg-white rounded-md px-4 py-2 shadow hover:shadow-lg focus:outline-none"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </button>

        <button
          className="border border-gray-300 bg-white rounded-md px-4 py-2 shadow hover:shadow-lg focus:outline-none"
          onClick={() => setShowSort(!showSort)}
        >
          Sort By
        </button>

        {showFilter && (
          <div className="absolute right-0 top-12 z-10">
            <Filter
              filterOptions={filterOptions}
              results={results}
              onApplyFilters={handleFilterChange}
              onClose={() => setShowFilter(false)}
            />
          </div>
        )}
        {console.log("Inside search results", filteredResults)}
        {showSort && (
          <div className="absolute right-16 top-12 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <SortResults
              results={filteredResults}
              onSort={handleSortChange}
              filteredResults={filteredResults}
            />
          </div>
        )}
      </div>

      {appliedFilters.length > 0 && (
        <div className="mb-4 p-4 rounded-md">
          <div className="flex flex-wrap gap-2 mt-2">
            {appliedFilters.map((filter, index) => (
              <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                {filter.name}: {filter.value}
                <button
                  className="ml-2 text-white hover:text-red-500"
                  onClick={() => {
                    const newFilters = appliedFilters.filter((_, i) => i !== index);
                    setAppliedFilters(newFilters);
                    handleFilterChange(results, newFilters);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

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
