class CreateSkills < ActiveRecord::Migration[6.0]
  def change
    create_table :skills do |t|
      t.string :name
      t.integer :parent_id, index: true
      t.timestamps
    end
  end
end