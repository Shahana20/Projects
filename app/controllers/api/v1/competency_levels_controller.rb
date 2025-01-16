class Api::V1::CompetencyLevelsController < ApplicationController
    
    def index
        @competency_levels = CompetencyLevel.all
        if @competency_levels.empty?
          flash.now[:notice] = "No competency levels found"
        end
        render json: @competency_levels
    end
      
  
  end
  