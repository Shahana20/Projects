module JwtHelper
    require 'jwt'
  
    def generate_jwt_token(user)
      payload = {
        sub: user.id, 
        jti: user.jti, 
        exp: 24.hours.from_now.to_i 
      }
      secret_key = Rails.application.credentials.secret_key_base
      JWT.encode(payload, secret_key)
    end
  end
  