class Api::V1::UsersController < ApplicationController

  # before_update :update_role_counts, if: :saved_change_to_user_role_id?

  def index
    users = User.all 
    render json: {users: users}
  end

  def update_role_counts
    previous_role_id = user_role_id_before_last_save
    UserRole.decrement_counter
  end
 
  def get_token_from_jti
    user = User.find_by_jti(params[:jti])
    if user
      token = AuthenticationService.issue_token(user)
      render json: { message: 'Token generated successfully', token: token }
    else
      render json: { message: 'User not found with this JTI' }, status: :not_found
    end
  end

  def show
    user = User.find(params[:id])
    render json: {
      user: user,
      skills: user.skills,
      career_details: user.career_details,
      project_details: user.project_details, 
      education_details: user.education_details 
    }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end


  def update
    puts "Received Params: #{params.inspect}"
    puts "Permitted Params: #{user_params.inspect}"
  
    @user = User.find_by(id: params[:id]) 
    return render json: { message: 'User not found' }, status: :not_found if @user.nil?

    first_name = params[:user][:first_name]
    last_name = params[:user][:last_name]
    role = params[:user][:role]
    location = params[:user][:location]
    skills_names = params[:user][:skills_users_attributes]
    areas_of_specialization = params[:user][:specialized_user_attributes]
    project_details = params[:user][:project_details_attributes]
    career_details = params[:user][:career_details_attributes]
    education_details = params[:user][:education_details_attributes]
    role_id = UserRole.find_by(role: role).id
    skill_ids = Skill.where(name: skills_names).pluck(:id)
    specialization_ids = Skill.where(name: areas_of_specialization).pluck(:id)

    user_role = UserRole.find_by(role: role)
    @user.user_role_id = role_id
    @user.user_skill_id = skill_ids
    @user.user_specialized_skill_id = specialization_ids

 
    if @user.update(user_params)
      render json: { message: 'User updated successfully', user: @user }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user
      @user.destroy
      render json: { message: 'User deleted successfully' }, status: :ok
    else
      render json: { message: 'User not found' }, status: :not_found
    end
  end


private

def user_params
  params.require(:user).permit(
    :first_name, :last_name, :email, :location, :user_role_id, :username, :profile_picture,
    project_details_attributes: [:id, :title, :description, :url, :duration, :_destroy],
    career_details_attributes: [:id, :company, :designation, :start_year, :end_year, :is_current, :_destroy],
    education_details_attributes: [:id, :university, :degree, :department, :cgpa, :start_year, :end_year, :_destroy]
  )
end

end
