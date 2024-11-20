class DropTableSkillsUsers < ActiveRecord::Migration[8.0]
  def change
    drop_table :skills_users
  end
end
