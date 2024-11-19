class EducationDetail < ApplicationRecord
    belongs_to :user
    # include Timestamp
    # validates_presence_of :university, :degree, :department, :start_year, :end_year, :cgpa
    # validates :cgpa, numericality: { greater_than: 0, message: 'must be greater than 0' }
    # validate :start_year_before_end_year
  
    def start_year_before_end_year
      return unless start_year.present? && end_year.present? && start_year > end_year
  
      errors.add(:start_year, 'must be before the end year')
    end
end
