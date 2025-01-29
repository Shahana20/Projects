class Api::V1::PasswordsController < ApplicationController
    def send_reset_email
        user = User.find_by(email: params[:email])

        if user
          user.update(
            reset_password_token: SecureRandom.hex(10), 
            reset_password_sent_at: Time.current
          )

          send_reset_email_to_user(user)
          render json: { message: "Password reset instructions sent.", reset_token: user.reset_password_token }, status: :ok
        else
          render json: { error: "Email not found." }, status: :not_found
        end
      end

      def reset
        token = params[:token]
        user = User.find_by(reset_password_token: token)

        if user.nil? || user.reset_password_sent_at < 2.hours.ago
          render json: { error: "Reset link expired or invalid." }, status: :unprocessable_entity
        else
          render json: { message: "Reset token is valid.", user_id: user.id }, status: :ok
        end
      end

  
      def update_password
        user = User.find_by(reset_password_token: params[:token])

        if user.nil? || user.reset_password_sent_at < 2.hours.ago
          render json: { error: "Reset link expired or invalid." }, status: :unprocessable_entity
        elsif user.update(password: params[:password], password_confirmation: params[:password_confirmation])
          user.update(reset_password_token: nil, reset_password_sent_at: nil) 
          render json: { message: "Password updated successfully." }, status: :ok
        else
          render json: { error: "Failed to reset password.", details: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    private
    def send_reset_email_to_user(user)
      message = <<~MESSAGE_END
        From: YourApp <your_email@example.com>
        To: #{user.email}
        Subject: Password Reset Instructions
  
        Hello #{user.email},
  
        We received a request to reset your password. Please use the following link to reset your password:
  
        http://localhost:3001/reset-password?token=#{user.reset_password_token}
  
        If you did not request a password reset, please ignore this email.
  
        Best regards,
        YourApp Team
      MESSAGE_END
  
      Net::SMTP.start('smtp.gmail.com', 587, 'gmail.com', 'shahanashanmuga@gmail.com', 'quwp yqlw iddj dhoc', :plain) do |smtp|
        smtp.send_message message, 'shahanashanmuga@gmail.com', user.email
      end
    end
end
