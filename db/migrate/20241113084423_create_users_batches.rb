class CreateUsersBatches < ActiveRecord::Migration[6.0]
  def change
    create_table :users_batches, id:false do |t|
      t.references :user, null: false, foreign_key: true
      t.references :batch, null: false, foreign_key: true
      t.boolean :is_mentor, default: false

      t.timestamps
    end
  end
end
