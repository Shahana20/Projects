import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUserAlt, FaUserTie, FaStar, FaStarHalf } from "react-icons/fa";
import { MdOutlineMail, MdLocationOn } from "react-icons/md";
import { SlBadge } from "react-icons/sl";

import ReviewForm from "../Review.jsx/ReviewForm";
import DisplayReviews from "../Review.jsx/DisplayReview";

function ResultProfile() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const [skills, setSkills] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [careerDetails, setCareerDetails] = useState({});
  const [projectDetails, setProjectDetails] = useState({});
  const [educationDetails, setEducationDetails] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);


  const userRoleId = JSON.parse(localStorage.getItem('user'))?.user_role_id;
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/${userId}`
        );
        const rolesResponse = await axios.get(`http://localhost:4000/api/v1/user_roles`);
        const skillsResponse = await axios.get(`http://localhost:4000/api/v1/skills`);
        

        const roles = rolesResponse.data;
        const userRole = roles.find(role=> role.id === response.data.user.user_role_id) || 'Unknown role';

        const userSkills = response.data.user.user_skill_id.map(
            (id) => (skillsResponse.data.skills).find((skill) => skill.id === id)?.name || 'Unknown Skill'
        );

        const specializations = response.data.user.user_specialized_skill_id.map(
            (id) => (skillsResponse.data.skills).find((specialization) => specialization.id === id)?.name || 'Unknown specialization'
        );

      console.log("Viewer role", userRoleId)
        
        const careers = response.data.career_details;
        const projects = response.data.project_details;
        const education = response.data.education_details;

        
        setUser(response.data.user);
        setRole(userRole);
        setSkills(userSkills);
        setSpecializations(specializations);
        setCareerDetails(careers);
        setProjectDetails(projects);
        setEducationDetails(education);

      } catch (err) {
        setError("Error fetching user details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);



  if (loading) {
    return (
      <div className="my-8 px-4">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 px-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  const handleReviewSubmission = (reviewData) => {
    console.log('Review Submitted:', reviewData);
    setShowReviewForm(false); 
  };
  

  return (
    <div className="mt-12 pt-4">
      {user ? (
        <>
          <div className="flex flex-col sm:flex-row items-start">
            <div className="sm:w-3/4 ml-0 sm:ml-4">
              <div className="text-3xl font-bold mb-2 flex items-center">
                <FaUserAlt className="mr-2" />
                {user.first_name} {user.last_name}
              </div>
              <div className="text-lg mb-2 flex items-center">
                <MdOutlineMail className="mr-2" />
                {user.email}
              </div>
              <div className="text-lg mb-2 flex items-center">
                <MdLocationOn className="mr-2" />
                {user.location}
              </div>
              <div className="text-lg mb-2 flex items-center">
                <FaUserTie className="mr-2 text-blue-500" />
                {role.role}
              </div>
              <div className="flex items-center mb-2">
                <SlBadge className="mr-2" />
                <span className="text-lg">
                  {skills.length > 0
                    ? skills.join(", ")
                    : "No skills available"}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="font-bold mr-2">Areas of Specialization:</span>
                <span className="text-lg">
                  {specializations.length > 0
                    ? specializations.join(", ")
                    : "No specializations available"}
                </span>
              </div>
            </div>
          </div>
          {userRoleId === 2 && (
            <>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-primary"
              onClick={() => setShowReviewForm(true)}
              >
                Add a Review
              </button>
            </div>
            {showReviewForm && (
              <ReviewForm userId={userId} onReviewSubmitted={handleReviewSubmission} />
            )}
            </>
          )}

          <div className="mt-8 text-xl font-semibold">
            <b>PERFORMANCE</b>
            <DisplayReviews userId={userId} />
          </div>


          <div className="mt-8 text-xl font-semibold">
            <b>EXPERIENCE</b>
            <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-96">
              {(careerDetails || []).map((career, index) => (
                <div
                  key={career.id}
                  className={`mb-4 ${
                    index !== (user.career_details || []).length - 1
                      ? "border-b border-gray-300 pb-4"
                      : ""
                  }`}
                >
                  <p className="text-xl font-bold">
                    Company Name:{" "}
                    <span className="font-normal">{career.company}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    Designation:{" "}
                    <span className="font-normal">{career.designation}</span>
                  </p>
                  <p className="text-gray-600">
                    Description:{" "}
                    <span className="font-normal">
                      {career.job_description}
                    </span>
                  </p>
                  <p className="text-gray-500 mt-2">
                    Duration: {career.start_year} -{" "}
                    {career.is_current ? "Present" : career.end_year}
                  </p>
                </div>
              ))}
            </div>
          </div>



          <div className="mt-8 text-xl font-semibold">
            <b>PROJECTS</b>
            <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-96">
              {(projectDetails || []).map((project, index) => (
                <div
                  key={project.id}
                  className={`mb-4 ${
                    index !== (user.project_details || []).length - 1
                      ? "border-b border-gray-300 pb-4"
                      : ""
                  }`}
                >
                  <p className="text-xl font-bold">
                    Project Title:{" "}
                    <span className="font-normal">{project.title}</span>
                  </p>
                  <p className="text-gray-600">
                    Description:{" "}
                    <span className="font-normal">{project.description}</span>
                  </p>
                  {project.url && (
                    <p className="text-blue-500 hover:text-blue-700">
                      URL: <a href={project.url}>{project.url}</a>
                    </p>
                  )}
                  <p className="text-xl font-bold">
                    Project Duration:{" "}
                    <span className="font-normal">{project.duration + " "}</span>
                    months
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xl font-semibold">
            <b>EDUCATION</b>
            <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-96">
              {(educationDetails || []).map((education, index) => (
                <div
                  key={education.id}
                  className={`mb-4 ${
                    index !== (user.education_details || []).length - 1
                      ? "border-b border-gray-300 pb-4"
                      : ""
                  }`}
                >
                  <p className="text-xl font-bold">
                    University:{" "}
                    <span className="font-normal">{education.university}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    Degree:{" "}
                    <span className="font-normal">{education.degree}</span>
                  </p>
                  <p className="text-gray-600">
                    Department:{" "}
                    <span className="font-normal">{education.department}</span>
                  </p>
                  <p className="text-gray-600">
                    CGPA: <span className="font-normal">{education.cgpa}</span>
                  </p>
                  <p className="text-gray-500 mt-2">
                    Duration: {education.start_year} - {education.end_year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">User not found</div>
      )}
    </div>
  );
}

export default ResultProfile;
