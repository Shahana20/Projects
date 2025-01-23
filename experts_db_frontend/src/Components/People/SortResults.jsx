import React from "react";
import axios from "axios";

function SortResults({ onSort, filteredResults }) {
  const [loading, setLoading] = React.useState(false);

  const handleSortChange = async (option) => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/v1/sort/users`, {
        params: {
          sort_by: option, 
          filtered_ids: filteredResults.map(result => result.id) 
        },
      });

      onSort(response.data);
      console.log("Sorted response", response.data);
    } catch (error) {
      console.error("Error fetching sorted users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-700">Sort Results By</h3>
      <div className="flex flex-col mt-4">
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("name_asc")}
        >
          Alphabetical Order (A-Z)
        </button>
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("name_desc")}
        >
          Alphabetical Order (Z-A)
        </button>
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("experience_asc")}
        >
          Experience (Low to High)
        </button>
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("experience_desc")}
        >
          Experience (High to Low)
        </button>
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("rating_asc")}
        >
          Rating (Low to High)
        </button>
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("rating_desc")}
        >
          Rating (High to Low)
        </button>
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("project_count_asc")}
        >
          Project Count (Low to High)
        </button>
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("project_count_desc")}
        >
          Project Count (High to Low)
        </button>
      </div>
    </div>
  );
}

export default SortResults;
