class CareerDetail < ApplicationRecord
    belongs_to :user
    # include Timestamp
    validates_presence_of :company, :designation, :start_year, :end_year, :job_description
    validate :start_year_before_end_year
  
    def start_year_before_end_year
      return unless start_year.present? && end_year.present? && start_year > end_year
  
      errors.add(:start_year, 'must be before the end year')
    end
end
