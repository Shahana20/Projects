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
    # puts "Is user nill? #{@user.nil?}"

    role = UserRole.find_by(role: params[:user][:role])
    puts "Role param: #{params[:user][:role]}"
    puts "---------------------------------"
    # puts params[:user][:skills_users_attributes]
    puts "---------------------------------"
    puts "Full Params: #{params.inspect}"
    if role
      puts "Found Role: #{role.role}, ID: #{role.id}"
      @user.user_role_id = role.id
    else
      return render json: { message: 'Role not found' }, status: :not_found
    end

    puts "Skills from Params: #{params[:skills_users_attributes].inspect}"
    skills = params[:skills_users_attributes]
    skill_ids = Skill.where(name: skills).pluck(:id)
    @user.user_skill_id = skill_ids

    puts "Specialized Skills from Params: #{params[:specialized_user_attributes].inspect}"
    skills = params[:specialized_user_attributes]
    special_skill_ids = Skill.where(name: skills).pluck(:id)
    @user.user_specialized_skill_id = special_skill_ids

    if @user.update(user_params)
      render json: { message: 'User updated successfully', user: @user }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :id, :first_name, :last_name, :location,
      skills_attributes: [:id, :name],
      # skills: [:id, :name],
      specialized_skills_attributes: [:id, :name],
      # specialization: [:id, :name],
      project_details_attributes: [:id, :title, :url, :description, :duration],
      career_details_attributes: [:id, :company, :designation, :job_description, :start_year, :end_year, :is_current],
      education_details_attributes: [:id, :university, :degree, :department, :cgpa, :start_year, :end_year]
    )
  end

  # def user_params
  #   # devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
  #   params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, skills_attributes: [:id, :name, :_destroy], education_details_attributes: [:id, :university, :start_year, :end_year, :_destroy], career_details_attributes: [:id, :company, :designation, :start_year, :end_year, :_destroy], project_details_attributes: [:id, :title, :description, :duration, :_destroy])
  # end
end
