class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.datetime :created_at, precision: 6, null: false
      t.datetime :updated_at, precision: 6, null: false
      t.string :caption
      t.text :overview
      t.string :url 
      t.string :location
      t.integer :people
      t.string :company_type
    end
  end
end
