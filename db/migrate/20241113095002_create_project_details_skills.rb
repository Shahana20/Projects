class CreateProjectDetailsSkills < ActiveRecord::Migration[8.0]
  def change
    create_table :project_details_skills do |t|
      t.references :project_details, foreign_key: true
      t.references :skills, foreign_key: true
    end
  end
end
