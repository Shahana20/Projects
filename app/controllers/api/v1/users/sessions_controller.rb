class Api::V1::Users::SessionsController < Devise::SessionsController
  include RackSessionFix
   def create
    user = User.find_by(email: params[:user][:email])
     if user&.valid_password?(params[:user][:password])
      render json: {message: "user found successfully", user: user}, status: :created
    else
      render json: {
        message: "Invalid email or password."
      }, status: :unauthorized
    end
   end
  respond_to :json
  
  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end