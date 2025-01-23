class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  include JwtHelper
  respond_to :json
  def create
    user = User.new(user_params)
    puts user_params
    if user.save
      token = generate_jwt_token(user)
      puts token
      render json: { message: 'User created successfully', user: user, token: token  }, status: :created
    else
      render json: { message: 'Error creating user', errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, skills_attributes: [:id, :name, :_destroy], education_details_attributes: [:id, :university, :start_year, :end_year, :_destroy], career_details_attributes: [:id, :company, :designation, :start_year, :end_year, :_destroy], project_details_attributes: [:id, :title, :description, :duration, :_destroy])
  end

  def respond_with(resource, _opts = {})
  puts "Resouce #{resource}"
  puts "resource persisted? #{resource.persisted?}"
  puts "Validation errors: #{resource.errors.full_messages}"
    if request.method == 'POST' && resource.persisted?
      puts resource
      # binding.pry
      render json: { message: 'Signed up sucessfully.', data: resource }, status: :ok
    elsif request.method == 'DELETE'
      render json: { message: 'Account deleted successfully.'}, status: :ok
    else
      render json: {
        message: "User couldn't be created successfully.",
        errors: resource.errors.full_messages.to_sentence
      }, status: :unprocessable_entity
    end
  end
end