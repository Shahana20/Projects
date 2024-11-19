class Api::V1::UsersController < ApplicationController
    def get_token_from_jti
      user = User.find_by_jti(params[:jti])
      if user
        token = AuthenticationService.issue_token(user)
        render json: { message: 'Token generated successfully', token: token }
      else
        render json: { message: 'User not found with this jti' }, status: :not_found
      end
    end

    def update
        @user = User.find(params[:id])
        
        return render json: { message: 'User not found' }, status: :not_found if @user.nil?
        if @user.update(user_params)
            render json: { message: 'User updated successfully', user: @user }, status: :ok
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

      
    #     ActiveRecord::Base.transaction do
    #       if @user.update(user_params)
    #         update_skills(@user, user_params[:skills]) if user_params[:skills].present?
    #         update_specialized_skills(@user, user_params[:specialized_skills]) if user_params[:specialized_skills].present?
    #         update_career_details
    #         update_project_details
    #         update_education_details
    #         render json: { message: 'User updated successfully', user: @user }, status: :ok
    #       else
    #         render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    #       end
    #     end
    #   end      

      def user_params
        params.require(:user).permit(
          :id, :first_name, :last_name, :role, :location,
          skills_attributes: [:id, :name],  
          specialized_skills: [:id, :name],  
          project_details_attributes: [:id, :title, :description, :duration],
          career_details_attributes: [:id, :company, :designation, :job_description, :start_year, :end_year, :is_current],
          education_details_attributes: [:id, :university, :cgpa, :start_year, :end_year]
        )
      end
      
  
    # def update_skills_users
    #   skill_names = params[:user][:skills].map { |skill| skill[:name] }
    #   if skill_names.present?
    #     @user.skills.clear
    #     skill_names.each do |skill_name|
    #       skill = Skill.find_by(name: skill_name)
    #       @user.skills << skill if skill && !@user.skills.include?(skill)
    #     end
    #     @user.save!
    #   else
    #     render json: { error: "No skills provided" }, status: :unprocessable_entity
    #   end
    # end
  
    # def update_specialized_user_skills
    #   new_skill_ids = params[:user][:specialized_skills].compact.uniq
    #   existing_skill_ids = @user.specialized_user_skills.pluck(:skill_id)
    #   skills_to_add = new_skill_ids - existing_skill_ids
    #   skills_to_remove = existing_skill_ids - new_skill_ids
    #   @user.specialized_user_skills.where(skill_id: skills_to_remove).destroy_all
    #   skills_to_add.each { |skill_id| @user.specialized_user_skills.create!(skill_id: skill_id) }
    # end

    # 
    # def update_career_details
    #   incoming_details = params[:user][:career_details]
    #   existing_details = @user.career_details.index_by(&:id)
    #   incoming_details.each do |detail|
    #     if detail[:id].present? && existing_details.key?(detail[:id].to_i)
    #       existing_details[detail[:id].to_i].update!(detail)
    #     else
    #       @user.career_details.create!(detail)
    #     end
    #   end
    #   incoming_ids = incoming_details.map { |d| d[:id].to_i }
    #   @user.career_details.where.not(id: incoming_ids).destroy_all
    # end
  
    # def update_project_details
    #   incoming_details = params[:user][:project_details]
    #   existing_details = @user.project_details.index_by(&:id)
    #   incoming_details.each do |detail|
    #     if detail[:id].present? && existing_details.key?(detail[:id].to_i)
    #       existing_details[detail[:id].to_i].update!(detail)
    #     else
    #       @user.project_details.create!(detail)
    #     end
    #   end
    #   incoming_ids = incoming_details.map { |d| d[:id].to_i }
    #   @user.project_details.where.not(id: incoming_ids).destroy_all
    # end
  
    # def update_education_details
    #   incoming_details = params[:user][:education_details]
    #   existing_details = @user.education_details.index_by(&:id)
    #   incoming_details.each do |detail|
    #     if detail[:id].present? && existing_details.key?(detail[:id].to_i)
    #       existing_details[detail[:id].to_i].update!(detail)
    #     else
    #       @user.education_details.create!(detail)
    #     end
    #   end
    #   incoming_ids = incoming_details.map { |d| d[:id].to_i }
    #   @user.education_details.where.not(id: incoming_ids).destroy_all
    # end
end
  