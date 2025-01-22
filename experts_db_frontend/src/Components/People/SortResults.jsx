import React from "react";

function SortResults({ results, onSort }) {
  const [sortOption, setSortOption] = React.useState("default");

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortedResults = React.useMemo(() => {
    let sortedData = [...results];
    if (sortOption === "alphabetical") {
      sortedData = sortedData.sort((a, b) =>
        `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
      );
    }
    return sortedData;
  }, [results, sortOption]);

  React.useEffect(() => {
    onSort(sortedResults);
  }, [sortedResults, onSort]);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-700">Sort Results By</h3>
      <div className="flex flex-col mt-4">
        <button
          className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => handleSortChange("alphabetical")}
        >
          Alphabetical Order (A-Z)
        </button>
      </div>
    </div>
  );
}

export default SortResults;
