class RenameColumnUsers < ActiveRecord::Migration[8.0]
  def change
    rename_column :users, :role_id, :user_role_id
  end
end
