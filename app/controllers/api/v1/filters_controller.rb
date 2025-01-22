class Api::V1::FiltersController < ApplicationController
    def locations
      locations = User.distinct.pluck(:location).reject { |location| location.blank? }
      render json: locations
    end
  
    def skills
        skills = Skill.distinct.reject do |skill|
            skill.name.blank? || ["Technical", "Non-Technical"].include?(skill.name)
        end
        render json: skills
    end
  
    def roles
      roles = UserRole.distinct.reject { |role| role.role.blank? }
      render json: roles
    end
  
    def companies
      companies = CareerDetail.distinct.pluck(:company).reject { |company| company.blank? }
      render json: companies
    end
  
    def designations
      designations = CareerDetail.distinct.pluck(:designation).reject { |designation| designation.blank? }
      render json: designations
    end
  end
  