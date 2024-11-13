class CreateReviews < ActiveRecord::Migration[8.0]
  def change
    create_table :reviews do |t|
      t.references :skills, null: false, foreign_key: true
      t.references :users, null: false, foreign_key: true
      t.integer :marks
      t.text :comments
      t.datetime :created_at, precision: 6, null: false
      t.datetime :updated_at, precision: 6, null: false
      t.datetime :discarded_at, null: false
      t.references :competency_levels, foreign_key: true
    end
  end
end
