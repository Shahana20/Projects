class AuthenticationService
    HMAC_SECRET = Rails.application.secret_key_base
  
    def self.issue_token(user)
      payload = {
        user_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        jti: user.jti,  
        exp: 24.hours.from_now.to_i 
      }
      JWT.encode(payload, HMAC_SECRET)
    end
  end
  