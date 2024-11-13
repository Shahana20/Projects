class CreateProjectDetails < ActiveRecord::Migration[8.0]
  def change
    create_table :project_details do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.string :url
      t.integer :duration 
      t.datetime :created_at, precision: 6, null: false
      t.datetime :updated_at, precision: 6, null: false
    end
  end
end
