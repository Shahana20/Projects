class ProjectDetail < ApplicationRecord
    belongs_to :user
    include Timestamp
    has_and_belongs_to_many :skills
    validates_presence_of :title, :description, :url, :duration
    validates :url, format: { with: %r{\A(http|https)://([\w-]+\.)+[\w-]+(/[\w-]*)*(\?.*)?\z}i, message: 'invalid URL format' }
    validates :duration, numericality: { greater_than: 0, message: 'must be greater than 0' }
end
