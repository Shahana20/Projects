class Api::V1::AuthController < ApplicationController
  def signup
    Rails.logger.debug "Received params: #{params.inspect}"
    user = User.new(user_params.merge(user_role_id: 3))
    if user.save
      token = User.generate_jwt(user)
      render json: { user: user, token: token }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    def login
      user = User.find_by(email: params[:email])
      if user&.valid_password?(params[:password])
        token = User.generate_jwt(user)
        render json: { user: user, token: token }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :user_role_id, :email, :password, :password_confirmation)
    end
end
  