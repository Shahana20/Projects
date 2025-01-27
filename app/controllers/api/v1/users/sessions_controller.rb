class Api::V1::Users::SessionsController < Devise::SessionsController
  include RackSessionFix
  def create
    user = User.find_by(email: params[:user][:email])
    token = user.jti
    puts "Inside create"
    if token.present? && valid_token?(token)
      user = User.find_by(id: decoded_token(token)['sub'])
      render json: { message: 'User logged in successfully', user: user, token: token }, status: :ok
    else
      if user&.valid_password?(params[:user][:password])
        puts "Inside else"
        token = generate_jwt_token(user)
        render json: { message: 'User found successfully', user: user, token: token }, status: :created
      else
        render json: { message: "Invalid email or password." }, status: :unauthorized
      end
    end
  end

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

private
  

  def valid_token?(token)
    decoded_token = decode_jwt_token(token)
    puts "Decoded token #{decoded_token}"
    return false unless decoded_token
    user = User.find_by(id: decoded_token['sub'])
    user && user.jti == decoded_token['jti'] 
  rescue JWT::DecodeError
    false
  end

  def decode_jwt_token(token)
    puts Rails.application.credentials.secret_key_base
    decode = JWT.decode(token, Rails.application.credentials.secret_key_base).first
  end