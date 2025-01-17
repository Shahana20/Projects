class Api::V1::SkillsController < ApplicationController
    def index
      @skilltypes = Skill.types
      @skills = Skill.skills
      render json: { skilltypes: @skilltypes, skills: @skills }
    end

    def show
      puts "Received params: #{params.inspect}"
      skills = Skill.where(id: params[:id])
      if skills.any?
        render json: skills, status: :ok
      else
        render json: { error: 'Skills not found' }, status: :not_found
      end
    end
end
  