import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, Checkbox, ListItemText, Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

function EditUserProfile() {
  const [step, setStep] = useState(1);
  const [skillsList, setSkillsList] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [projects, setProjects] = useState([{ title: '', description: '', url: '', duration: '', skills: [] }]);
  const [experiences, setExperiences] = useState([{ company: '', designation: '', start_year: '', end_year: '', is_current: false }]);
  const [education, setEducation] = useState([{ university: '', degree: '', department: '', cgpa: '', start_year: '', end_year: '' }]);
  const [common,setCommon] = useState([]);
  const [user, setUser] = useState({});
  const storedToken = localStorage.getItem("jwt_token");
  const user_id = jwtDecode(storedToken).sub;


  useEffect(() => {
    async function fetchData() {
      try {
        const skillsResponse = await fetch('http://localhost:4000/api/v1/skills');
        const rolesResponse = await fetch('http://localhost:4000/api/v1/user_roles');
        const specializationResponse = await fetch('http://localhost:4000/api/v1/skills');
        const response = await axios.get(`http://localhost:4000/api/v1/users/${user_id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`, 
          },
        });
        
        const storedUser = response.data.user;

        const skillsData = await skillsResponse.json();
        const rolesData = await rolesResponse.json();
        const specializationData = await specializationResponse.json();

        setSkillsList(skillsData.skills);
        setUserRoles(rolesData);
        setSpecializationList(specializationData.skills);
        setUser(storedUser);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const validationSchemas = {
    1: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      role: Yup.string().required("Role is required"),
      location: Yup.string().required("Location is required"),
      skills: Yup.array().min(1, "At least one skill is required"),
      specialization: Yup.array().min(1, "At least one specialization is required"),
    }),
    2: Yup.object({
      projects: Yup.array().of(
        Yup.object({
          title: Yup.string().required("Project title is required"),
          description: Yup.string().required("Project description is required"),
          duration: Yup.string().required("Project duration is required"),
          skills: Yup.array().min(1, "At least one skill is required for the project"),
        })
      ),
    }),
    3: Yup.object({
      experiences: Yup.array().of(
        Yup.object({
          company: Yup.string().required("Company name is required"),
          designation: Yup.string().required("Designation is required"),
          start_year: Yup.string().required("Start year is required"),
          end_year: Yup.string()
            .when("is_current", {
              is: false,
              then: Yup.string().required("End year is required"),
            })
            .test(
              "is-greater",
              "End year must be greater than start year",
              function (end_year) {
                const { start_year } = this.parent;
                return end_year >= start_year;
              }
            ),
        })
      ),
      education: Yup.array().of(
        Yup.object({
          university: Yup.string().required("University name is required"),
          cgpa: Yup.number().required("CGPA is required").min(0).max(10),
          start_year: Yup.string().required("Start year is required"),
          end_year: Yup.string()
            .when("is_current", {
              is: false,
              then: Yup.string().required("End year is required"),
            })
            .test(
              "is-greater",
              "End year must be greater than start year",
              function (end_year) {
                const { start_year } = this.parent;
                return end_year >= start_year;
              }
            ),
        })
      ),
    }),
  };
 
 
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      role: '',
      location: '',
      skills: [],
      specialization: [],
      projects: projects,
      experiences: experiences,
      education: education,
    },
    validationSchema: validationSchemas[step],
    onSubmit: async (values) => {
      try {
        const formData = {
          first_name: values.first_name,
          last_name: values.last_name,
          role: values.role,
          location: values.location,
          skills_users_attributes: values.skills, 
          specialized_user_attributes: values.specialization, 
          project_details_attributes: projects, 
          career_details_attributes: experiences, 
          education_details_attributes: education 
        };

        console.log("values", values)
        console.log("Form Data:", formData);

        const response = await axios.patch(
          `http://localhost:4000/api/v1/users/${user_id}`,
          { user: formData }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`
            }
          }
        );
    
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
    
      
        if (response.status === 200 && response.headers['content-type'].includes('application/json')) {
          console.log('Response Data:', response.data);
          window.location.href = "/view";
        } else {
          console.error('Unexpected response format');
          alert('Unexpected error submitting form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
    
        if (error.response) {
          console.error('Error Response:', error.response.data);
          alert(`Error: ${error.response.data.message || 'Failed to submit form'}`);
        } else {
          alert('Error submitting form. Please try again.');
        }
      }
    },
  });




  const handleSkillsChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue('skills', value);
  };

  const handleSpecializationChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue('specialization', value);
  };

  const handleAddProject = () => {
    setProjects([...projects, { title: '', description: '', url:'', duration: '', skills: [] }]);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: '', designation: '',job_description: '', start_year: '', end_year: '', is_current: false }]);
  };

  const handleAddEducation = () => {
    setEducation([...education, { university: '', degree: '', department: '', cgpa: '', start_year: '', end_year: '' }]);
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleRemoveExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleRemoveEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index, name, value) => {
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [name]: value,
      };
      return updatedProjects;
    });
  };

  const handleExperienceChange = (index, name, value) => {
    setExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [name]: value,
      };
      return updatedExperiences;
    });
  };

  const handleEducationChange = (index, name, value) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [name]: value,
      };
      return updatedEducation;
    });
  };

  const renderYearOptions = (start, end) => {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years.map(year => (
      <MenuItem key={year} value={year}>{year}</MenuItem>
    ));
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Personal Details</h2>
            <div className="mb-4">
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </div>
            <div className="mb-4">
              <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formik.values.role}
                  onChange={(e) => {formik.setFieldValue("role", e.target.value)
                    console.log("Role changed to:", e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>Select Role</em>
                  </MenuItem>
                  {userRoles.map((role) => (
                    <MenuItem key={role.id} value={role.role}>
                      {role.role}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formik.touched.role && formik.errors.role}</FormHelperText>
              </FormControl>
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </div>
            <div className="mb-4">
              <FormControl fullWidth error={formik.touched.skills && Boolean(formik.errors.skills)}>
                <InputLabel>Skills</InputLabel>
                <Select
                  multiple
                  name="skills"
                  value={formik.values.skills}
                  onChange={handleSkillsChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {skillsList.map((skill) => (
                    <MenuItem key={skill.id} value={skill.name}>
                      <Checkbox checked={formik.values.skills.indexOf(skill.name) > -1} />
                      <ListItemText primary={skill.name} />
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formik.touched.skills && formik.errors.skills}</FormHelperText>
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl fullWidth error={formik.touched.specialization && Boolean(formik.errors.specialization)}>
                <InputLabel>Areas of Specialization</InputLabel>
                <Select
                  multiple
                  name="specialization"
                  value={formik.values.specialization}
                  onChange={handleSpecializationChange}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {specializationList.map((spec) => (
                    <MenuItem key={spec.id} value={spec.name}>
                      <Checkbox checked={formik.values.specialization.indexOf(spec.name) > -1} />
                      <ListItemText primary={spec.name} />
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{formik.touched.specialization && formik.errors.specialization}</FormHelperText>
              </FormControl>
            </div>
            <div className="flex justify-between">
              <Button variant="contained" color="primary" onClick={() => setStep(2)}>
                Next
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-10 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <TextField
                  fullWidth
                  label="Project Title"
                  name={`projects[${index}].title`}
                  value={project.title || ''}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Project Description"
                  name={`projects[${index}].description`}
                  value={project.description || ''}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Project URL"
                  name={`projects[${index}].url`}
                  value={project.url || ''}
                  onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Project Duration (in months)"
                  name={`projects[${index}].duration`}
                  value={project.duration || ''}
                  onChange={(e) => handleProjectChange(index, 'duration', e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel>Skills Used</InputLabel>
                  <Select
                    multiple
                    name={`projects[${index}].skills`}
                    value={project.skills}
                    onChange={(e) => handleProjectChange(index, 'skills', e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {skillsList.map((skill) => (
                      <MenuItem key={skill.id} value={skill.name}>
                        <Checkbox checked={project.skills.indexOf(skill.name) > -1} />
                        <ListItemText primary={skill.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" color="secondary" onClick={() => handleRemoveProject(index)}>
                  Remove Project
                </Button>
              </div>
            ))}
            <div className="flex justify-between">
              <Button variant="contained" color="primary" onClick={handleAddProject}>
                Add Another Project
              </Button>
              <Button variant="contained" color="primary" onClick={() => setStep(1)}>
                Prev
              </Button>
              <Button variant="contained" color="primary" onClick={() => setStep(3)}>
                Next
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Professional Details</h2>
            {experiences.map((experience, index) => (
              <div key={index} className="mb-4">
                <TextField
                  fullWidth
                  label="Company Name"
                  name={`experiences[${index}].company`}
                  value={experience.company || ''}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Designation"
                  name={`experiences[${index}].designation`}
                  value={experience.designation || ''}
                  onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Job description"
                  name={`experiences[${index}].job_description`}
                  value={experience.job_description || ''}
                  onChange={(e) => handleExperienceChange(index, 'job_description', e.target.value)}
                />
                <FormControl fullWidth>
                  <InputLabel>Start Year</InputLabel>
                  <Select
                    name={`experiences[${index}].start_year`}
                    value={experience.start_year}
                    onChange={(e) => handleExperienceChange(index, 'start_year', e.target.value)}
                  >
                    {renderYearOptions(2000, new Date().getFullYear())}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel>End Year</InputLabel>
                  <Select
                    name={`experiences[${index}].end_year`}
                    value={experience.is_current ? '' : experience.end_year}
                    onChange={(e) => handleExperienceChange(index, 'end_year', e.target.value)}
                    disabled={experience.is_current}
                  >
                    {renderYearOptions(2000, new Date().getFullYear())}
                  </Select>
                </FormControl>
                
                <Checkbox
                  checked={experience.is_current}
                  onChange={(e) => handleExperienceChange(index, 'is_current', e.target.checked)}
                />
                Current Employee
                <Button variant="contained" color="secondary" onClick={() => handleRemoveExperience(index)}>
                  Remove Experience
                </Button>
              </div>
            ))}
            <div className="flex justify-between">
              <Button variant="contained" color="primary" onClick={handleAddExperience}>
                Add Another Experience
              </Button>
              <Button variant="contained" color="primary" onClick={() => setStep(2)}>
                Prev
              </Button>
              <Button variant="contained" color="primary" onClick={() => setStep(4)}>
                Next
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Education Details</h2>
            {education.map((edu, index) => (
              <div key={index} className="mb-4">
                <TextField
                  fullWidth
                  label="University Name"
                  name={`education[${index}].university`}
                  value={edu.university}
                  onChange={(e) => handleEducationChange(index, 'university', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Degree"
                  name={`education[${index}].degree`}
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Department"
                  name={`education[${index}].department`}
                  value={edu.department}
                  onChange={(e) => handleEducationChange(index, 'department', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="CGPA"
                  name={`education[${index}].cgpa`}
                  value={edu.cgpa}
                  onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                />
                
                <FormControl fullWidth>
                  <InputLabel>Start Year</InputLabel>
                  <Select
                    name={`education[${index}].start_year`}
                    value={edu.start_year}
                    onChange={(e) => handleEducationChange(index, 'start_year', e.target.value)}
                  >
                    {renderYearOptions(2000, new Date().getFullYear())}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel>End Year</InputLabel>
                  <Select
                    name={`education[${index}].end_year`}
                    value={edu.end_year}
                    onChange={(e) => handleEducationChange(index, 'end_year', e.target.value)}
                  >
                    {renderYearOptions(2000, new Date().getFullYear())}
                  </Select>
                </FormControl>
                
                <Button variant="contained" color="secondary" onClick={() => handleRemoveEducation(index)}>
                  Remove Education
                </Button>
              </div>
            ))}
            <div className="flex justify-between">
              <Button variant="contained" color="primary" onClick={handleAddEducation}>
                Add Another Education
              </Button>
              <Button variant="contained" color="primary" onClick={() => setStep(3)}>
                Prev
              </Button>
              <Button variant="contained" color="primary" onClick={formik.handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderForm()}</>;
}

export default EditUserProfile;