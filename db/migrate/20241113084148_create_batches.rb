class CreateBatches < ActiveRecord::Migration[6.0]
  def change
    create_table :batches do |t|
      t.string :name
      t.string :organization
      t.date :start_date
      t.date :end_date
      t.references :creator, null: false, foreign_key: { to_table: :users }
      t.text :description
      t.string :slug
      t.datetime :discarded_at

      t.timestamps
    end

    add_index :batches, :slug, unique: true
  end
end
