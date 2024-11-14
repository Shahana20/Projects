class RenameUsersIdToUserIdInSpecializedUserSkills < ActiveRecord::Migration[8.0]
  def change
    rename_column :specialized_user_skills, :users_id, :user_id
  end
end
