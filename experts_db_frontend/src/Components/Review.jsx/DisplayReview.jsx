import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayReviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndEnrichReviews = async () => {
      setLoading(true);

      try {
        const headResponse = await axios.head(`http://localhost:4000/api/v1/reviews/${userId}`);
        if (headResponse.status === 404) {
          setReviews([]); 
        } else {
          const reviewsResponse = await axios.get(`http://localhost:4000/api/v1/reviews/${userId}`);
          const reviewsData = reviewsResponse.data;
          const enrichedReviews = await Promise.all(
            reviewsData.map(async (review) => {
              try {
                const [reviewerResponse, skillsResponse] = await Promise.all([
                  axios.get(`http://localhost:4000/api/v1/users/${review.reviewer_id}`),
                  axios.get(`http://localhost:4000/api/v1/skills`),
                ]);

                const reviewedSkills = skillsResponse.data.skills.find(
                  (skill) => skill.id === review.skills_id
                );

                return {
                  ...review,
                  reviewer_name: reviewerResponse.data.user.first_name,
                  reviewer_specialization: reviewedSkills ? reviewedSkills.name : "Unknown",
                  skill_id: reviewedSkills ? reviewedSkills.id : null,
                  stars: review.marks / 20.0,
                };
              } catch (innerError) {
                console.error("Error enriching review:", innerError);
                return { ...review, error: true };
              }
            })
          );

          setReviews(enrichedReviews); 
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]); 
      } finally {
        setLoading(false); 
      }
    };

    fetchAndEnrichReviews(); 
  }, [userId]);


  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <p className="text-xl text-gray-600">Loading reviews...</p>
      </div>
    );
  }


  if (!reviews.length) {
    return (
      <div className="flex justify-center items-center py-6">
        <p className="text-xl text-gray-600">No reviews to display.</p>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-700">{review.reviewer_name|| "Unknown"}</h3>
            <div className="text-yellow-500">
              {"⭐".repeat(Math.round(review.stars)) || "No Rating"}
            </div>
          </div>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Skill:</strong> {review.reviewer_specialization || "Unknown"}
            </p>
            <p>
              <strong>Comments:</strong> {review.comments || "No comments"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayReviews;
