class Batch < ApplicationRecord
    include Discard::Model
    before_create :set_slug
  
    has_one_attached :batch_profile
    has_many :users_batches
    has_many :users, through: :users_batches
  
    has_many :batches_skills
    has_many :skills, through: :batches_skills
  
    belongs_to :creator, class_name: 'User'
  
    validates :name, :organization, :start_date, :end_date, presence: true
    validate :end_date_after_start_date
    validates :name, uniqueness: true
  
    private
  
    def set_slug
      self.slug = name.parameterize
    end
  
    def batch_skills
      skills.pluck(:name)
    end
  
    def self.batch_skills
      self.kept.includes(:skills).map do |batch|
        { id: batch.id, skill_names: batch.skills.pluck(:name) }
      end
    end
    
  
    def end_date_after_start_date
      return unless end_date.present? && start_date.present? && end_date < start_date
  
      errors.add(:end_date, "can't be before the start date")
    end
end
