class RenameSkillsIdToSkillIdInSkillsUsers < ActiveRecord::Migration[8.0]
  def change
    rename_column :skills_users, :skills_id, :skill_id
  end
end
