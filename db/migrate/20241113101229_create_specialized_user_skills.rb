class CreateSpecializedUserSkills < ActiveRecord::Migration[8.0]
  def change
    create_table :specialized_user_skills, id:false do |t|
      t.references :users, null: false, foreign_key: true
      t.references :skills, null: false, foreign_key: true
    end
  end
end
