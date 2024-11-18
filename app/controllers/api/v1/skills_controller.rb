class Api::V1::SkillsController < ApplicationController
    def index
      @skilltypes = Skill.types
      @skills = Skill.skills
      render json: { skilltypes: @skilltypes, skills: @skills }
    end
end
  