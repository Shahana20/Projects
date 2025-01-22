class EducationDetail < ApplicationRecord
  belongs_to :user

  validates :university, :degree, :department, :start_year, :end_year, presence: true
  validates :cgpa, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 10 }
  validates :start_year, numericality: { only_integer: true, less_than_or_equal_to: ->(edu) { edu.end_year } }

  # Prevent overlapping education periods
  # validate :no_overlapping_periods

  # private

  # def no_overlapping_periods
  #   overlapping = user.education_details.where.not(id: id)
  #                                        .where("start_year <= ? AND end_year >= ?", end_year, start_year)
  #                                        .exists?
  #   errors.add(:base, "Education period overlaps with another record.") if overlapping
  # end
end
