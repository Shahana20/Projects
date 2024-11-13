class CreateCareerDetails < ActiveRecord::Migration[8.0]
  def change
    create_table :career_details do |t|
      t.string :company
      t.string :designation
      t.integer :start_year
      t.integer :end_year
      t.text :job_description
      t.timestamps
      t.references :user, null: false, foreign_key: true
      t.boolean :is_current
    end
  end
end
