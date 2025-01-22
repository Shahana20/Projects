class Api::V1::CareerDetailsController < ApplicationController
    def index
        @career_details = CareerDetail.all
        render json: @career_details
    end
end
