class AddFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :role_id, :bigint
    add_column :users, :location, :string
    add_column :users, :username, :string
    add_column :users, :profile_picture, :string
  end
end
