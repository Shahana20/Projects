class RenameUsersIdToUserIdInSkillsUsers < ActiveRecord::Migration[8.0]
  def change
    rename_column :skills_users, :users_id, :user_id
  end
end
