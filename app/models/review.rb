class Review < ApplicationRecord
  include Discard::Model
  belongs_to :user
  include Timestamp
  belongs_to :skill
  belongs_to :competency_level
  belongs_to :reviewer, class_name: 'User'

  validates :user_id, :skill_id, :reviewer_id, :marks, :comments, presence: true
  validates :marks, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
end
