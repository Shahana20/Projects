import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    location: "",
    skills: "",
    specialization: "",
    designation: "",
    company_name: "",
    project_name: "",
    project_description: "",
    project_skills: "",
    education: {
      university_name: "",
      cgpa: "",
      start_year: "",
      end_year: "",
    },
  });

  const navigate = useNavigate();

  // Auto-fill personal details on first page
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setFormData(prev => ({
        ...prev,
        first_name: storedUser.first_name,
        last_name: storedUser.last_name,
        role: storedUser.role,
        location: storedUser.location,
        skills: storedUser.skills,
        specialization: storedUser.specialization,
      }));
    }
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate the percentage of completion based on the current step
  const getProgressPercentage = () => {
    return (step - 1) * 33;
  };

  // Render form based on the current step
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="card w-full max-w-2xl mx-auto p-4 bg-base-100 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="First Name"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Last Name"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered w-full mb-4"
            >
              <option disabled value="">Select Role</option>
              <option>Admin</option>
              <option>Mentor</option>
              <option>Candidate</option>
            </select>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Location"
            />
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Skills"
            />
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="select select-bordered w-full mb-4"
            >
              <option disabled value="">Select Specialization</option>
              <option>Frontend</option>
              <option>Backend</option>
            </select>

            {/* Progress Bar */}
            <div className="w-full mb-4">
              <progress className="progress progress-primary w-full" value={getProgressPercentage()} max="100"></progress>
              <div className="text-center mt-2">{getProgressPercentage()}% Completed</div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="card w-full max-w-2xl mx-auto p-4 bg-base-100 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Career Details</h2>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Designation"
            />
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Company Name"
            />
            <input
              type="text"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Project Name"
            />
            <textarea
              name="project_description"
              value={formData.project_description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Project Description"
            />
            <input
              type="text"
              name="project_skills"
              value={formData.project_skills}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Skills Learned"
            />
            <button
              onClick={nextStep}
              className="btn btn-primary mr-4"
            >
              Next
            </button>
            <button
              onClick={prevStep}
              className="btn btn-secondary"
            >
              Back
            </button>

            {/* Progress Bar */}
            <div className="w-full mb-4">
              <progress className="progress progress-primary w-full" value={getProgressPercentage()} max="100"></progress>
              <div className="text-center mt-2">{getProgressPercentage()}% Completed</div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="card w-full max-w-2xl mx-auto p-4 bg-base-100 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Education Details</h2>
            <input
              type="text"
              name="university_name"
              value={formData.education.university_name}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="University Name"
            />
            <input
              type="text"
              name="cgpa"
              value={formData.education.cgpa}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="CGPA"
            />
            <input
              type="number"
              name="start_year"
              value={formData.education.start_year}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="Start Year"
            />
            <input
              type="number"
              name="end_year"
              value={formData.education.end_year}
              onChange={handleChange}
              className="input input-bordered w-full mb-4"
              placeholder="End Year"
            />
            <button
              onClick={() => alert("Form Submitted")}
              className="btn btn-success"
            >
              Submit
            </button>
            <button
              onClick={prevStep}
              className="btn btn-secondary ml-4"
            >
              Back
            </button>

            {/* Progress Bar */}
            <div className="w-full mb-4">
              <progress className="progress progress-primary w-full" value={getProgressPercentage()} max="100"></progress>
              <div className="text-center mt-2">{getProgressPercentage()}% Completed</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {renderForm()}
    </div>
  );
}

export default MultiStepForm;
