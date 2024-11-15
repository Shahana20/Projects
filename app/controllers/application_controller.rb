class ApplicationController < ActionController::API
   include Devise::Controllers::Helpers
  # include AuthHelper
 
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
  def configure_permitted_parameters
    # Allow custom parameters for sign_up and account_update actions
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password])
  end
  # before_action :authenticate_user!
  # def authenticate_user!
  #   token = request.headers['Authorization']&.split(' ')&.last
  #   puts "encoded token : #{token}"
  #   decoded_token = decode_jwt(token)
  #   puts "decoded token : #{decoded_token}"
  #   if decoded_token
  #     Rails.logger.debug "Decoded: #{decoded_token}"
  #     @current_user = User.find_by(id: decoded_token["user_id"])
  #     puts @current_user
  #   end
  #   render json: { errors: ['Unauthorized'] }, status: :unauthorized unless @current_user
  # end
  # def decode_jwt(token)
  #   JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' }).first
  # rescue JWT::ExpiredSignature
  #   Rails.logger.warn("JWT token has expired")
  #   nil
  # rescue JWT::DecodeError => e
  #   Rails.logger.warn("JWT decoding failed: #{e.message}")
  #   nil
  # end
end