class CareerDetail < ApplicationRecord
  belongs_to :user

  validates :company, :designation, :start_year, :end_year, presence: true
  validates :is_current, inclusion: { in: [true, false] }
  validates :start_year, numericality: { only_integer: true, less_than_or_equal_to: ->(career) { career.end_year } }

  
  # validate :no_overlapping_periods

  # private

  # def no_overlapping_periods
  #   overlapping = user.career_details.where.not(id: id)
  #                                     .where("start_year <= ? AND end_year >= ?", end_year, start_year)
  #                                     .exists?
  #   errors.add(:base, "Career period overlaps with another record.") if overlapping
  # end
end
