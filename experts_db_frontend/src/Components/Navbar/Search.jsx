import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/users`);
        const skillsResponse = await axios.get(`http://localhost:4000/api/v1/skills`);
        
        setUsers(response.data.users || []);
        setSkills(skillsResponse.data.skills);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      performSearch(value);
    } else {
      setResults([]);
    }
  };

  const performSearch = (searchTerm) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const skill = skills.find(skill => skill.name.toLowerCase() === lowercasedSearchTerm);
    let filteredResults = [];

    if (skill) {
      filteredResults = users.filter((user) =>
        user.user_skill_id && user.user_skill_id.includes(skill.id)
      );
    } else {
      filteredResults = users.filter((user) => {
        const firstName = user.first_name ? user.first_name.toLowerCase() : "";
        const lastName = user.last_name ? user.last_name.toLowerCase() : "";

        const isNameMatch = firstName.includes(lowercasedSearchTerm) || lastName.includes(lowercasedSearchTerm);
        const isSkillMatch = user.user_skill_id.some((userSkillId) =>
          skills.some((skill) => skill.id === userSkillId && skill.name.toLowerCase().includes(lowercasedSearchTerm))
        );

        return isNameMatch || isSkillMatch;
      });
    }

    setResults(filteredResults);
  };

  const handleResultClick = (userId) => {
    navigate("/results", { state: { userId } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/search-results", { state: { results, query } });
    }
  };

  return (
    <div className="relative w-full md:w-1/2 mt-6">
      <input
        type="text"
        placeholder="Search your requirement here"
        className="w-full px-4 py-2 text-gray-900 bg-gray-100 rounded-full border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />

      {query && results.length > 0 && (
        <div className="absolute z-10 bg-gray-800 border border-gray-600 text-white rounded-md mt-2 w-full max-h-40 overflow-auto shadow-lg">
          {results.map((result) => (
            <div
              key={result.id}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleResultClick(result.id)}
            >
              {result.first_name} {result.last_name}
            </div>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="absolute z-10 bg-gray-800 border border-gray-600 text-white rounded-md mt-2 w-full px-4 py-2 text-sm">
          No results found.
        </div>
      )}
    </div>
  );
}

export default Search;
