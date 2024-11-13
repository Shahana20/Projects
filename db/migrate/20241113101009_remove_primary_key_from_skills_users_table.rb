class RemovePrimaryKeyFromSkillsUsersTable < ActiveRecord::Migration[8.0]
  def change
    remove_column :skills_users, :id
  end
end
