import React, { useState, useEffect } from "react";
import axios from "axios";

function ReviewForm({ userId, onReviewSubmitted }) {
  const [marks, setMarks] = useState(0);
  const [comments, setComments] = useState("");
  const [skills, setSkills] = useState([]);
  const [competency, setCompetency] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedCompetency, setSelectedCompetency] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const reviewer = JSON.parse(localStorage.getItem("user"));
  const reviewerId = reviewer?.id;

  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsResponse = await axios.get("http://localhost:4000/api/v1/skills");
        const competencyResponse = await axios.get("http://localhost:4000/api/v1/competency_levels");
        // console.log(competencyResponse.data);
        setSkills(skillsResponse.data.skills); 
        setCompetency(competencyResponse.data)
        // console.log(competency)
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSkill || !selectedCompetency || marks === "" || comments.trim() === "") {
      setError("Please fill out all the fields.");
      setSuccess(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const reviewData = {
      review: {
        users_id: userId,
        reviewer_id: reviewerId,
        skills_id: selectedSkill,
        competency_levels_id: selectedCompetency,
        marks,
        comments,
      },
    };

    try {
      const response = await axios.post("http://localhost:4000/api/v1/reviews", reviewData);
      onReviewSubmitted(response.data);
      setSuccess("Review submitted successfully.");
      setMarks(0);
      setComments("");
      setSelectedSkill("");
      setSelectedCompetency("");
    } catch (err) {
      setError("Failed to submit review. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add a Review</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="skills" className="block text-lg font-semibold mb-2">
            Select Skill
          </label>
          <select
            id="skills"
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            aria-label="Select Skill"
          >
            <option value="">Choose a skill</option>
            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        
        <div className="mb-4">
          <label htmlFor="competency" className="block text-lg font-semibold mb-2">
            Select Competency Level
          </label>
          <select
            id="competency"
            value={selectedCompetency}
            onChange={(e) => setSelectedCompetency(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            aria-label="Select Competency Level"
          >
            <option value="">Choose a competency level</option>
            {competency.map((level) => (
              <option key={level.id} value={level.id}>
                {level.competency}
              </option>
            ))}
          </select>
        </div>

        
        <div className="mb-4">
          <label htmlFor="marks" className="block text-lg font-semibold mb-2">
            Marks (0-100)
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="marks"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="w-full mr-4"
              aria-label="Marks Slider"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded w-20 text-center"
              aria-label="Marks Input"
            />
          </div>
        </div>

        
        <div className="mb-4">
          <label htmlFor="comments" className="block text-lg font-semibold mb-2">
            Comments
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full"
            rows="4"
            placeholder="Write your comments here..."
            aria-label="Comments"
          ></textarea>
        </div>

        
        <div className="flex justify-end">
          <button
            type="submit"
            className={`btn btn-primary ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
