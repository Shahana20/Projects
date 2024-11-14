class RenameSkillsIdInSpecializedUserSkills < ActiveRecord::Migration[8.0]
  def change
    rename_column :specialized_user_skills, :skills_id, :skill_id
  end
end
