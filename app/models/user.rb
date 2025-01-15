class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Discard::Model
  include Devise::JWT::RevocationStrategies::JTIMatcher

  before_create :set_default_user_role

  devise :database_authenticatable, :registerable,:recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  has_one_attached :profile_image
  
  has_many :users_batches
  has_many :batches, through: :users_batches
  has_and_belongs_to_many :skills
  has_and_belongs_to_many :user_roles
  has_many :specialized_user_skills
  # has_and_belongs_to_many :specialized_skills, join_table: :specialized_user_skills, class_name: 'Skill'
  # User model
  has_and_belongs_to_many :specialized_skills, join_table: :specialized_user_skills, foreign_key: :user_id, association_foreign_key: :skill_id, class_name: 'Skill'

  has_many :education_details, -> { order(end_year: :desc, created_at: :desc) }, dependent: :destroy
  has_many :career_details, -> { order(end_year: :desc, created_at: :desc) }, dependent: :destroy
  has_many :project_details, dependent: :destroy
  # has_many :reviews, foreign_key: :user_id
  has_many :reviews_given, class_name: 'Review', foreign_key: 'reviewer_id'
  has_many :reviews_received, class_name: 'Review', foreign_key: 'users_id'

  # validates :first_name, presence: true
  # validates :last_name, presence: true
  # validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # validates :password, presence: true, length: { minimum: 6 }, allow_blank: true

  # PROFILE_PHOTO_CONTENT_TYPES = ['image/png', 'image/jpg', 'image/jpeg'].freeze


  def self.generate_jwt(user)
    payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
    JWT.encode(payload, Rails.application.secret_key_base)
  end

  def self.find_by_jti(jti)
    find_by(jti: jti)
  end

  def set_default_user_role
    self.user_role_id ||= 3
  end
  private

  def username_does_not_contain_uppercase
    if username && username =~ /[A-Z]/
      errors.add(:username, "cannot contain uppercase characters")
    end
  end

  def username_does_not_start_with_number
    if username && username =~ /^[0-9]/
      errors.add(:username, "cannot start with a number")
    end
  end

  def self.active_mentors
    select('users.id', 'users.username', 'users.first_name', 'users.last_name', 'users.email', 'users.location', 'users.updated_at', 'career_details.designation', 'career_details.company')
      .joins(:career_details, :user_roles).where(user_roles: { role: 'Mentor' })
      .where('career_details.id = (SELECT MAX(cd.id) FROM career_details cd WHERE cd.user_id = users.id AND cd.start_year <= ? AND cd.end_year >= ?)', Date.today.year, Date.today.year)
      .order(:id)
  end

  def self.active_candidates
    select('users.id', 'users.username', 'users.first_name', 'users.last_name', 'users.email', 'users.location', 'users.updated_at', 'career_details.designation')
      .joins(:career_details, :user_roles).where(user_roles: { role: 'Candidate' })
      .where('career_details.id = (SELECT MAX(cd.id) FROM career_details cd WHERE cd.user_id = users.id AND cd.start_year >= ? AND cd.end_year <= ?)', 2010, Date.today.year)
      .order(:id)
  end

  # def correct_profile_image_mime_type
  #   return unless profile_image.attached? && !profile_image.content_type.in?(PROFILE_PHOTO_CONTENT_TYPES)

  #   errors.add(:profile_image, 'must be a PNG, JPG, or JPEG file')
  # end

  def user_role_ids
    user_roles.pluck(:id)
  end

  def specialized_skill_names
    specialized_skills.pluck(:name)
  end

  def companies
    career_details.pluck(:company, :start_year, :end_year)
  end

  def company
    career_details.first.company if career_details.any?
  end

  def designation
    career_details.first.designation if career_details.any?
  end

  def university
    education_details.first.university if education_details.any?
  end

  def profile_image_url
    Rails.application.routes.url_helpers.url_for(profile_image) if profile_image.attached?
  end
  
  def self.user_batches
    self.kept.includes(:batches).map do |user|
      { id: user.id, batch_names: user.batches.pluck(:name) }
    end
  end
  
  def self.skills_users
    self.kept.includes(:skills).map do |user|
      { id: user.id, skill_names: user.skills.pluck(:name) }
    end
  end
  
  def self.specialized_skills_users
    self.kept.includes(:skills).map do |user|
      { id: user.id, specialized_skill_names: user.specialized_skills.pluck(:name) }
    end
  end
  
  def self.user_universities
    self.kept.includes(:education_details).map do |user|
      { id: user.id, university_name: user.education_details.pluck(:university).first }
    end
  end

  accepts_nested_attributes_for :skills, allow_destroy: true
  accepts_nested_attributes_for :specialized_user_skills, allow_destroy: true
  accepts_nested_attributes_for :education_details, allow_destroy: true
  accepts_nested_attributes_for :career_details, allow_destroy: true
  accepts_nested_attributes_for :project_details, allow_destroy: true

end
