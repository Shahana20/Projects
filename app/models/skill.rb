class Skill < ApplicationRecord
    belongs_to :parent, class_name: 'Skill', optional: true
    has_many :children, class_name: 'Skill', foreign_key: 'parent_id'
  
    has_many :batches_skills
    has_many :batches, through: :batches_skills
    has_many :reviews
  
    has_and_belongs_to_many :project_details
  
    has_and_belongs_to_many :users
    has_and_belongs_to_many :specialized_users, join_table: :specialized_user_skills, foreign_key: :skill_id, association_foreign_key: :user_id

  
    scope :types, -> { where(parent_id: nil) }
    scope :skills, -> { where.not(parent_id: nil) }
end
