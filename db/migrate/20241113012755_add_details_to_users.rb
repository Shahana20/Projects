class AddDetailsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :user_designation, :string
    add_column :users, :user_skills, :string
    add_column :users, :areas_of_specialization, :string
  end
end
