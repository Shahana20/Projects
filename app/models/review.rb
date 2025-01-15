class Review < ApplicationRecord
  belongs_to :user, foreign_key: :users_id 
  belongs_to :reviewer, class_name: 'User', foreign_key: :reviewer_id 
  belongs_to :skill, foreign_key: :skills_id
  belongs_to :competency_level, foreign_key: :competency_levels_id

  validates :users_id, :reviewer_id, :skills_id, :competency_levels_id, presence: true
end
