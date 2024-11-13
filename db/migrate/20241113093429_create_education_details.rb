class CreateEducationDetails < ActiveRecord::Migration[8.0]
  def change
    create_table :education_details do |t|
      t.string :university
      t.string :degree 
      t.string :department
      t.integer :start_year
      t.integer :end_year
      t.float :cgpa, :double_precision
      t.datetime :created_at, precision: 6, null: false
      t.datetime :updated_at, precision: 6, null: false
      t.references :user, null: false, foreign_key: true
    end
  end
end
