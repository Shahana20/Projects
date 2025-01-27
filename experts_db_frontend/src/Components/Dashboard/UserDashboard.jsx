import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const UserDashboard = () => {
    const[mentorsCount, setMentorsCount] = useState(0);
    const[candidatesCount, setCandidatesCount] = useState(0);
    const token = localStorage.getItem("jwt_token");
    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Declared token", decodedToken); 
        }
        const fetchUsers = async() => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/users',
                    {headers: {
                        Authorization: `Bearer ${token}`
                    }}
                );
                // console.log(response);
                const allUsers = response.data.users;
                let mentors = 0;
                let candidates = 0;

                response.data.users.forEach(user => {
                    if (user.user_role_id === 2) mentors++;
                    if (user.user_role_id === 3) candidates++;
                });

                // const mentorsCount = (allUsers.filter(user => user.user_role_id === 2)).length;
                setMentorsCount(mentors);
                // const candidatesCount = (allUsers.filter(user => user.user_role_id === 3)).length;
                setCandidatesCount(candidates);
            }
            catch(error) {
                console.log("Error fetching data", error);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div className="container mt-5">
            {/* Welcome Section */}
            <div className="jumbotron text-center bg-primary text-white py-5 rounded">
                <h1 className="display-4">Welcome to Your Dashboard</h1>
                <p className="lead">View the counts of mentors and candidates in the system.</p>
            </div>

            {/* Counts Section */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title">Mentors</h5>
                            <h1 className="display-3 text-primary">{mentorsCount}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title">Candidates</h5>
                            <h1 className="display-3 text-success">{candidatesCount}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="text-center mt-5">
                <Link to="/view" className="btn btn-primary btn-lg mx-2">
                    Go to Profile
                </Link>
            </div>
        </div>
    );
}

export default UserDashboard;