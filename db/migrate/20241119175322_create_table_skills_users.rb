class CreateTableSkillsUsers < ActiveRecord::Migration[8.0]
  
  def change
    create_join_table :skills, :users do |t|
      t.index [:skill_id]
      t.index [:user_id]
    end
  end
end
