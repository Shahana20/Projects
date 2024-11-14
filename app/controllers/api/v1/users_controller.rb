class Api::V1::UsersController < ApplicationController
    before_action :authenticate_user!, only: [:current]
    before_action :set_user, only: %i[show update profile destroy]
  
    # GET /api/v1/users
    def index
      @users = User.kept.includes(:user_roles)
      render json: @users.to_json(methods: %i[user_role_ids companies])
    end
  
    # GET /api/v1/users/:id
    def show
      render json: @user, methods: %i[skills batches user_role_ids skill_ids specialized_skill_ids]
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    end
  
    # PATCH/PUT /api/v1/users/:id
    def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
    end
  
    # GET /api/v1/users/archived
    def archived
      @users = User.discarded.includes(:specialized_skills)
      render json: @users.to_json(methods: %i[user_role_ids specialized_skill_names company designation university])
    end
  
    # POST /api/v1/users/:id/unarchive
    def unarchive
      @user = User.discarded.find(params[:id])
      @user.undiscard
      render json: @user
    end
  
    # GET /api/v1/users/:id/profile
    def profile
      if @user.profile_image.attached?
        urls = generate_image_urls(@user.profile_image)
        image_name = urls[:original].split('/').last
        urls[:image_name] = image_name
        render json: urls
      else
        render json: { error: 'Profile image not found' }, status: :not_found
      end
    end
  
    # GET /api/v1/users/current
    def current
      render json: current_user
    end
  
    # DELETE /api/v1/users/:id
    def destroy
      @user.discard
      head :no_content
    end
  
    # GET /api/v1/users/navbar_search
    def navbar_search
      mentors = User.kept.active_mentors
      candidates = User.kept.active_candidates
      batches = Batch.kept.select(:id, :name, :organization, :description, :slug, :updated_at)
  
      mentors_data = format_user_data(mentors, 'mentor')
      candidates_data = format_user_data(candidates, 'candidate')
      batches_data = format_batch_data(batches)
  
      data = {
        mentors: { options: mentors_data, type: 'mentor' },
        candidates: { options: candidates_data, type: 'candidate' },
        batches: { options: batches_data, type: 'batch' }
      }
  
      render json: data
    end
  
    private
  
    def set_user
      @user = User.find(params[:id])
    end
  
      def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :location, :profile_image)
      end

    def generate_image_urls(profile_image)
      {
        original: url_for(profile_image),
        image: url_for(profile_image.variant(resize: '250x250')),
        profile: url_for(profile_image.variant(resize: '200x200')),
        thumb: url_for(profile_image.variant(resize: '50x50')),
        search: url_for(profile_image.variant(resize: '120x120'))
      }
    end
  
    def format_user_data(users, badge)
      users.map do |user|
        user.attributes.merge({
          badge: badge,
          base: 'users',
          batches: User.user_batches.find { |ub| ub[:id] == user.id }&.fetch(:batch_names, []),
          skills: User.skills_users.find { |us| us[:id] == user.id }&.fetch(:skill_names, []),
          specialized_skill_names: User.specialized_skills_users.find { |us| us[:id] == user.id }&.fetch(:specialized_skill_names, [])
        })
      end
    end
  
    def format_batch_data(batches)
      batches.map do |batch|
        batch.attributes.merge({
          base: 'batches',
          batch_skills: Batch.batch_skills.find { |bs| bs[:id] == batch.id }&.fetch(:skill_names, [])
        })
      end
    end
end
  
