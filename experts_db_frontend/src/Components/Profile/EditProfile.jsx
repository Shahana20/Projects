import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, Checkbox, ListItemText, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setYear, getYear } from 'date-fns';

function EditUserProfile() {
  const [step, setStep] = useState(1);
  const [skillsList, setSkillsList] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [projects, setProjects] = useState([{ title: '', description: '', duration: '', skills: [] }]);
  const [experiences, setExperiences] = useState([{ company: '', designation: '', startYear: '', endYear: '', isCurrent: false }]);
  const [education, setEducation] = useState([{ university: '', cgpa: '', startYear: '', endYear: '' }]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const skillsResponse = await fetch('http://localhost:4000/api/v1/skills');
        const rolesResponse = await fetch('http://localhost:4000/api/v1/user_roles');
        const specializationResponse = await fetch('http://localhost:4000/api/v1/skills');
        
        const skillsData = await skillsResponse.json();
        const rolesData = await rolesResponse.json();
        const specializationData = await specializationResponse.json();
        
        setSkillsList(skillsData.skills);
        setUserRoles(rolesData);
        setSpecializationList(specializationData.skills);
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
          startYear: Yup.number().required("Start year is required"),
          endYear: Yup.number().when("isCurrent", {
            is: false,
            then: Yup.number().required("End year is required"),
          }),
        })
      ),
      education: Yup.array().of(
        Yup.object({
          university: Yup.string().required("University name is required"),
          cgpa: Yup.number().required("CGPA is required").min(0).max(10),
          startYear: Yup.number().required("Start year is required"),
          endYear: Yup.number().when("isCurrent", {
            is: false,
            then: Yup.number().required("End year is required"),
          }),
        })
      ),
    }),
  };
  

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      role: '',
      location: '',
      skills: [],
      specialization: [],
      startYear: '',
      endYear: '',
      projects: projects,
      experiences: experiences,
      education: education,
    },
    validationSchema: validationSchemas[step],
    onSubmit: (values) => {
      alert('Form submitted successfully!');
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
    setProjects([...projects, { title: '', description: '', duration: '', skills: [] }]);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: '', designation: '', startYear: '', endYear: '', isCurrent: false }]);
  };

  const handleAddEducation = () => {
    setEducation([...education, { university: '', cgpa: '', startYear: '', endYear: '' }]);
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


  const handleProjectChange = (event, index) => {
    const { name, value } = event.target; 
  
    setProjects((prevProjects) => {
      const updatedProjects = [...prevProjects];
      updatedProjects[index] = { ...updatedProjects[index], [name]: value };
      return updatedProjects;
    });
  };
  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;
    setExperiences(newExperiences);
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const newEducation = [...education];
    newEducation[index][name] = value;
    setEducation(newEducation);
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
                  onChange={formik.handleChange}
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
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-4">
                <TextField
                  fullWidth
                  label="Project Title"
                  name={`projects[${index}].title`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Project Description"
                  name={`projects[${index}].description`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Project Duration (Months)"
                  name={`projects[${index}].duration`}
                  value={project.duration}
                  onChange={(event) => handleProjectChange(event, index)}
                  type="number"
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
                  value={experience.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Designation"
                  name={`experiences[${index}].designation`}
                  value={experience.designation}
                  onChange={(e) => handleExperienceChange(index, 'designation', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Start Year"
                  name={`experiences[${index}].startYear`}
                  value={experience.startYear}
                  onChange={(e) => handleExperienceChange(index, 'startYear', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="End Year"
                  name={`experiences[${index}].endYear`}
                  value={experience.endYear}
                  onChange={(e) => handleExperienceChange(index, 'endYear', e.target.value)}
                />
                <Checkbox
                  checked={experience.isCurrent}
                  onChange={(e) => handleExperienceChange(index, 'isCurrent', e.target.checked)}
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
                  label="CGPA"
                  name={`education[${index}].cgpa`}
                  value={edu.cgpa}
                  onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Start Year"
                  name={`education[${index}].startYear`}
                  value={edu.startYear}
                  onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)}
                />
                <TextField
                  fullWidth
                  label="End Year"
                  name={`education[${index}].endYear`}
                  value={edu.endYear}
                  onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)}
                />
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
