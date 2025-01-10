import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalf, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdLocationOn, MdOutlineMail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { SlBadge } from 'react-icons/sl';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [userRoleName, setUserRoleName] = useState('');
  const [skills, setSkills] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [error, setError] = useState(null);

  const userDetails = JSON.parse(localStorage.getItem('user'));
  console.log('user details', userDetails);
  const userId = userDetails.id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/users/${userId}`);
        const userData = response.data;
        const roleResponse = await axios.get(`http://localhost:4000/api/v1/user_roles`);
        const skillResponse = await axios.get(`http://localhost:4000/api/v1/skills`);
        const allSkills = skillResponse.data.skills;
        const allRoles = roleResponse.data;
        const foundRole = allRoles.find(role => role.id === userData.user.user_role_id);
        
        const userSkills = userData.user.user_skill_id.map(
          (id) => allSkills.find((skill) => skill.id === id)?.name || 'Unknown Skill'
        );
        console.log(userSkills);
        
        const userSpecialization = userData.user.user_specialized_skill_id.map(
          (id) => allSkills.find((skill) => skill.id === id)?.name || 'Unknown Specializations'
        );

        setUser(userData);
        setRoles(allRoles);
        setSkills(userSkills);
        setSpecializations(userSpecialization)
        setUserRoleName(foundRole.role);
      } catch (error) {
        console.error('Error fetching user or skills data:', error);
      }
    };
    fetchUserData();
  }, [userId]);
  

  return (
    <div className="mt-12 pt-4">
      {error && <div className="text-red-500">{error}</div>}
      {user ? (
        <>
          <div className="flex flex-col sm:flex-row items-start">
            <div className="sm:w-3/4 ml-0 sm:ml-4">
              <div className="text-3xl font-bold mb-2 flex items-center">
                <FaUserAlt className="mr-2" />
                {user.user.first_name} {user.user.last_name}
              </div>
              <div className="text-lg mb-2 flex items-center">
                <MdOutlineMail className="mr-2" />
                {user.user.email}
              </div>
              <div className="text-lg mb-2 flex items-center">
                <MdLocationOn className="mr-2" />
                {user.user.location}
              </div>
              <div className="text-lg mb-2 flex items-center">
                <FaUserTie className="mr-2 text-blue-500" />
                {userRoleName}
              </div>
              <div className="flex items-center mb-2">
                <SlBadge className="mr-2" />
                <span className="text-lg">
                  {skills.length > 0 ? skills.join(', ') : 'No skills available'}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <span className="font-bold mr-2">Areas of Specialization:</span>
                <span className="text-lg">
                {specializations.length > 0 ? specializations.join(', ') : 'No specializations available'}
                </span>
              </div>
              <div className="absolute top-42 right-5 mt-3 mr-3 flex gap-2">
                <Link to={`/edit`}>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition">
                    Edit
                  </button>
                </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xl font-semibold">
            <b>PERFORMANCE</b>
            <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-96">
              {(user.skills || []).length > 0 ? (
                user.skills.map((skill) => {
                  const fullStars = Math.floor(skill.rating);
                  const hasHalfStar = skill.rating % 1 !== 0;

                  return (
                    <div key={skill.id} className="flex justify-between items-center mb-3">
                      <div className="me-auto text-lg font-medium">{skill.name}</div>
                      <div>
                        {[...Array(fullStars)].map((_, index) => (
                          <FaStar key={index} className="text-yellow-500 text-xl" />
                        ))}
                        {hasHalfStar && <FaStarHalf className="text-yellow-500 text-xl" />}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-lg text-gray-500">No reviews added</div>
              )}
            </div>
          </div>

          <div className="mt-8 text-xl font-semibold">
            <b>EXPERIENCE</b>
            <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-96">
              {(user.career_details || []).map((career, index) => (
                <div
                  key={career.id}
                  className={`mb-4 ${index !== (user.career_details || []).length - 1 ? 'border-b border-gray-300 pb-4' : ''
                    }`}
                >
                  <p className="text-xl font-bold">
                    Company Name: <span className="font-normal">{career.company}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    Designation: <span className="font-normal">{career.designation}</span>
                  </p>
                  <p className="text-gray-600">
                    Description: <span className="font-normal">{career.job_description}</span>
                  </p>
                  <p className="text-gray-500 mt-2">
                    Duration: {career.start_year} - {career.is_current ? 'Present' : career.end_year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xl font-semibold">
            <b>PROJECTS</b>
            <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-96">
              {(user.project_details || []).map((project, index) => (
                <div
                  key={project.id}
                  className={`mb-4 ${index !== (user.project_details || []).length - 1 ? 'border-b border-gray-300 pb-4' : ''
                    }`}
                >
                  <p className="text-xl font-bold">
                    Project Title: <span className="font-normal">{project.title}</span>
                  </p>
                  <p className="text-gray-600">
                    Description: <span className="font-normal">{project.description}</span>
                  </p>
                  {project.url && (
                    <p className="text-blue-500 hover:text-blue-700">
                      URL: <a href={project.url}>{project.url}</a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>



          <div className="mt-8 text-xl font-semibold">
            <b>EDUCATION</b>
            <div className="mt-4 bg-white shadow-lg rounded-lg p-4 overflow-auto max-h-96">
              {(user.education_details || []).map((education, index) => (
                <div
                  key={education.id}
                  className={`mb-4 ${index !== (user.education_details || []).length - 1 ? 'border-b border-gray-300 pb-4' : ''
                    }`}
                >
                  <p className="text-xl font-bold">
                    University: <span className="font-normal">{education.university}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    Degree: <span className="font-normal">{education.degree}</span>
                  </p>
                  <p className="text-gray-600">
                    Department: <span className="font-normal">{education.department}</span>
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
        <div>Loading...</div>
      )}
    </div>
  );
};
export default UserProfile;
