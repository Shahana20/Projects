class UsersController < ApplicationController
    def user_params
        params.require(:user).permit(:name, skill_ids: [])
    end
end
