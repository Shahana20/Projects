import React, { useState, useEffect } from "react";

function Filter({ onApplyFilters, onClose, filterOptions, results }) {
  const { locations, skills, roles, companies, designations, careerDetails } = filterOptions;

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCurrentCompany, setSelectedCurrentCompany] = useState("");
  const [selectedPastCompany, setSelectedPastCompany] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

  const [selectedFilters, setSelectedFilters] = useState([]);
    const handleApplyFilters = () => {
      const filteredResults = results.filter((user) => {
        const skillMatch =
          selectedSkills.length > 0
            ? selectedSkills.every(
                (selectedSkill) =>
                  user.user_skill_id.includes(selectedSkill) ||
                  user.user_specialized_skill_id.includes(selectedSkill)
              )
            : true;
        const currentCareerDetail = careerDetails.find(
          (career) =>
            career.user_id === user.id &&
            career.company === selectedCurrentCompany &&
            career.is_current === true
        );
        const pastCareerDetail = careerDetails.find(
          (career) =>
            career.user_id === user.id && career.company === selectedPastCompany
        );
        const designationDetail = careerDetails.find(
          (career) =>
            career.user_id === user.id && career.designation === selectedDesignation
        );
    
        return (
          (selectedLocation ? user.location === selectedLocation : true) &&
          skillMatch &&
          (selectedRole ? user.user_role_id == selectedRole : true) &&
          (selectedCurrentCompany ? currentCareerDetail : true) &&
          (selectedPastCompany ? pastCareerDetail : true) &&
          (selectedDesignation ? designationDetail : true)
        );
      });
    
      onApplyFilters(filteredResults, selectedFilters);
      onClose();
    };
    

  const handleSkillChange = (skillId) => {
    setSelectedSkills((prev) => {
      const updatedSkills = prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId];

        const selectedSkillNames = updatedSkills
        .map(skillId => {
          const skill = skills.find(s => s.id === skillId);
          return skill ? skill.name : null; 
        })
        .filter(name => name !== null); 
      
      updateSelectedFilters("Skills", selectedSkillNames);
      console.log("Selected skills names:", selectedSkillNames);
      return updatedSkills;
    });
  };

  const clearAllSkills = () => {
    setSelectedSkills([]);
    updateSelectedFilters("Skills", []);
  };

  const handleFilterClear = (filterName) => {
    switch (filterName) {
      case "Location":
        setSelectedLocation("");
        break;
      case "Skills":
        setSelectedSkills([]);
        break;
      case "Role":
        setSelectedRole("");
        break;
      case "Current Company":
        setSelectedCurrentCompany("");
        break;
      case "Past Company":
        setSelectedPastCompany("");
        break;
      case "Designation":
        setSelectedDesignation("");
        break;
      default:
        break;
    }

    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.name !== filterName)
    );
  };

  const addFilterToList = (filterName, filterValue) => {
    if (!selectedFilters.find((filter) => filter.name === filterName)) {
      setSelectedFilters((prev) => [
        ...prev,
        { name: filterName, value: filterValue },
      ]);
    }
  };

  const updateSelectedFilters = (filterName, filterValue) => {
    setSelectedFilters((prev) =>
      prev.filter((filter) => filter.name !== filterName)
    );

    if (filterValue.length > 0) {
      setSelectedFilters((prev) => [
        ...prev,
        { name: filterName, value: filterValue.join(", ") }, 
      ]);
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    addFilterToList("Location", e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    const roleName = roles.find((role) => role.id === parseInt(e.target.value))?.role || "";
    addFilterToList("Role", roleName);
  };

  const handleCurrentCompanyChange = (e) => {
    setSelectedCurrentCompany(e.target.value);
    addFilterToList("Current Company", e.target.value);
  };

  const handlePastCompanyChange = (e) => {
    setSelectedPastCompany(e.target.value);
    addFilterToList("Past Company", e.target.value);
  };

  const handleDesignationChange = (e) => {
    setSelectedDesignation(e.target.value);
    addFilterToList("Designation", e.target.value);
  };

  return (
    <div className="filter-menu p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>

      {selectedFilters.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-lg">Applied Filters:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFilters.map((filter, index) => (
              <div
                key={index}
                className="bg-blue-200 text-blue-700 px-3 py-1 rounded-lg flex items-center"
              >
                <span>{`${filter.name}: ${filter.value}`}</span>
                <button
                  className="ml-2 text-red-500"
                  onClick={() => handleFilterClear(filter.name)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="filter-section mb-4">
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handleLocationChange}
          value={selectedLocation}
        >
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section mb-4">
        <h3 className="text-lg font-semibold mb-2">Skills and Specializations</h3>
        <div className="relative">
          <div className="overflow-auto max-h-48 bg-white p-2 rounded-md shadow-md border border-gray-300">
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`skill-${index}`}
                    value={skill.id}
                    checked={selectedSkills.includes(skill.id)}
                    onChange={() => handleSkillChange(skill.id)}
                    className="mr-2 text-blue-500"
                  />
                  <label htmlFor={`skill-${index}`} className="text-sm text-gray-700">
                    {skill.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="text-blue-500 mt-2"
            onClick={clearAllSkills}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="filter-section mb-4">
        <h3 className="text-lg font-semibold mb-2">Roles</h3>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handleRoleChange}
          value={selectedRole}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.role}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section mb-4">
        <h3 className="text-lg font-semibold mb-2">Current Company</h3>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handleCurrentCompanyChange}
          value={selectedCurrentCompany}
        >
          <option value="">Select Current Company</option>
          {companies.map((career, index) => (
            <option key={index} value={career}>
              {career}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section mb-4">
        <h3 className="text-lg font-semibold mb-2">Past Company</h3>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handlePastCompanyChange}
          value={selectedPastCompany}
        >
          <option value="">Select Past Company</option>
          {companies.map((career, index) => (
            <option key={index} value={career}>
              {career}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section mb-4">
        <h3 className="text-lg font-semibold mb-2">Designation</h3>
        <select
          className="w-full p-2 border rounded-md"
          onChange={handleDesignationChange}
          value={selectedDesignation}
        >
          <option value="">Select Designation</option>
          {designations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        >
          Close
        </button>
        <button
          onClick={handleApplyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
