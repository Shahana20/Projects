class ApplicationController < ActionController::API
  def authenticate_user!
    token = request.headers['Authorization']&.split(' ')&.last
    decoded_token = decode_jwt(token)
    Rails.logger.debug "Decoded: #{decoded_token}"
    @current_user = User.find(decoded_token["user_id"]) if decoded_token
    # puts @current_user
    render json: { errors: ['Unauthorized'] }, status: :unauthorized unless @current_user
  end

  def decode_jwt(token)
    JWT.decode(token, Rails.application.secret_key_base).first
  rescue JWT::DecodeError
    nil
  end
end
