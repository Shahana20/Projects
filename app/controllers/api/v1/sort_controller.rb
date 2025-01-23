class Api::V1::SortController < ApplicationController
    def sort_users
        filtered_ids = params[:filtered_ids] 
        filtered_users = User.where(id: filtered_ids)
        puts"------------------------------"
        puts Date.current.year
        case params[:sort_by]
        when "name_asc"
            users = filtered_users.order("users.first_name ASC")
        when "name_desc"
            users = users.order("users.first_name DESC")
        when "experience_asc", "experience_desc"
            users = filtered_users.left_joins(:career_details)
                        .select(
                        "users.*, 
                          SUM(CASE WHEN career_details.is_current THEN #{Date.current.year} 
                                ELSE career_details.end_year 
                              END - career_details.start_year) AS experience"
                        )
                        .group("users.id")
                        .order("experience #{sort_direction(params[:sort_by])}")
                        puts "------------------------------------------"
                        users.each do |user|
                            puts "User ID: #{user.id}, Total Experience Years: #{user.experience || 0}"
                        end
        when "rating_asc", "rating_desc"
            users = filtered_users.left_joins(:reviews)
                        .select(
                        "users.*, 
                        AVG(reviews.marks) AS rating"
                        )
                        .group("users.id")
                        .order("rating #{sort_direction(params[:sort_by])}")
        when "project_count_asc", "project_count_desc"
            users = filtered_users.left_joins(:project_details)
                        .select(
                        "users.*, 
                        COUNT(project_details.id) AS project_count"
                        )
                        .group("users.id")
                        .order("project_count #{sort_direction(params[:sort_by])}")
        else
            users = filtered_users.order("users.first_name ASC")
        end
    
        render json: users
    end
  
    private
    def sort_direction(sort_by)
      sort_by.ends_with?("_asc") ? "ASC" : "DESC"
    end
  end
  