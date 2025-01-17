class Api::V1::ReviewsController < ApplicationController
  def create
    user = User.find_by(id: review_params[:users_id]) # Receiving the review
    reviewer = User.find_by(id: review_params[:reviewer_id]) # Posting the review
    skill = Skill.find_by(id: review_params[:skills_id])
    competency_level = CompetencyLevel.find_by(id: review_params[:competency_levels_id])
    review = Review.new(review_params)
    puts "--------------------------------"
    puts 
    puts "--------------------------------"
    

  
    if user && reviewer && skill && competency_level
      review = Review.new(review_params)
      if review.save
        render json: { message: 'Review created successfully', review: review }, status: :created
      else
        render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
      end
    else
      missing_entities = []
      missing_entities << 'User (recipient)' unless user
      missing_entities << 'Reviewer (creator)' unless reviewer
      missing_entities << 'Skill' unless skill
      missing_entities << 'Competency Level' unless competency_level
  
      render json: { errors: "The following must exist: #{missing_entities.join(', ')}" }, status: :unprocessable_entity
    end
  end
  

      def index
        reviews = Review.all
        render json: reviews, status: :ok
      end

      
      def show
        puts "Received params: #{params.inspect}"
        reviews = Review.where(users_id: params[:id])
        if reviews.any?
          render json: reviews, status: :ok
        else
          render json: { error: 'Reviews not found for the specified user' }, status: :not_found
        end
      end

      
      def update
        review = Review.find_by(id: params[:id])
        if review&.update(review_params)
          render json: { message: 'Review updated successfully', review: review }, status: :ok
        else
          render json: { errors: review&.errors&.full_messages || 'Review not found' }, status: :unprocessable_entity
        end
      end

      
      def destroy
        review = Review.find_by(id: params[:id])
        if review&.destroy
          render json: { message: 'Review deleted successfully' }, status: :ok
        else
          render json: { error: 'Review not found' }, status: :not_found
        end
      end

      private

     
      def review_params
        params.require(:review).permit(:skills_id, :users_id, :marks, :comments, :competency_levels_id, :reviewer_id)
      end
end
