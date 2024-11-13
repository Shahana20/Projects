class Api::V1::AuthController < ApplicationController
    def signup
      user = User.create!(user_params)
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
      params.require(:auth).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end
  