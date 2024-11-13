class CreateUserRolesUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :user_roles_users, id:false do |t|
      t.references :user, null: false, foreign_key: true, type: :bigint
      t.references :user_role, null: false, foreign_key:true, type: :bigint
    end
  end
end
