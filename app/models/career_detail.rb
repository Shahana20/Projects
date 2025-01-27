class CareerDetail < ApplicationRecord
  belongs_to :user

  validates :company, :designation, :start_year, presence: true
  validates :is_current, inclusion: { in: [true, false] }
  validates :start_year, numericality: { only_integer: true, less_than_or_equal_to: ->(career) { career.end_year } }, if: -> { end_year.present? }
  
end
