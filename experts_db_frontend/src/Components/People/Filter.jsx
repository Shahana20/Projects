import React, { useState } from "react";

function Filter({ onApplyFilters, onClose, filterOptions, results }) {
  const { locations, skills, roles, companies, designations } = filterOptions;

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCurrentCompany, setSelectedCurrentCompany] = useState("");
  const [selectedPastCompany, setSelectedPastCompany] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");


  const handleApplyFilters = () => {
    const filteredResults = results.filter((user) => {
        console.log("Selected role "+ selectedRole + "user role "+ user.user_role_id);
        const skillMatch = selectedSkills.length > 0 ? 
        selectedSkills.every((selectedSkill) => (user.user_skill_id.includes(selectedSkill) || user.user_specialized_skill_id.includes(selectedSkill)))
        : true;
        const currentCareerDetail = careerDetails.find(
            (career) => career.user_id === user.id && career.is_current === true
          );
      return (
        (selectedLocation ? user.location === selectedLocation : true)  &&
        skillMatch &&
        (selectedRole ? user.user_role_id == selectedRole : true)
      );
    });

    
    
    onApplyFilters(filteredResults);
    console.log("Filtered Results:", filteredResults);
    onClose();
  };
  
  const handleSkillChange = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };
  

  const clearAllSkills = () => {
    setSelectedSkills([]);
  };

  return (
    <div className="filter-menu p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      
      <div className="filter-section mb-4">
        <h3 className="text-lg font-semibold mb-2">Location</h3>
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => setSelectedLocation(e.target.value)}
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
                   { console.log("Selected skill", selectedSkills)}
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
          onChange={(e) => setSelectedRole(e.target.value)}
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
          onChange={(e) => setSelectedCurrentCompany(e.target.value)}
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
          onChange={(e) => setSelectedPastCompany(e.target.value)}
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
          onChange={(e) => setSelectedDesignation(e.target.value)}
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

      <div className="filter-actions flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Filter;
