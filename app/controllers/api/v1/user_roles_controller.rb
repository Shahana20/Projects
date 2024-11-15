class UserRolesController < ApplicationController
    def index
        @roles = UserRole.all
        render json: @roles
    end
end
