class AddUserSkillAndSpecializedSkillToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :user_skill_id, :integer, array: true, default: []
    add_column :users, :user_specialized_skill_id, :integer, array: true, default: []
  end
end
