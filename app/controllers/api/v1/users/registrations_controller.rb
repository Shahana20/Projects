class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json
  def create

    user = User.new(user_params)
    if user.save
      render json: { message: 'User created successfully', user: user }, status: :created
    else
      render json: { message: 'Error creating user', errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    # devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
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