class AddDeviseToUsers < ActiveRecord::Migration[6.0]
  def change
    change_table :users, bulk: true do |t|

      unless column_exists?(:users, :email)
        t.string :email, null: false, default: ""
      en
      
      unless column_exists?(:users, :encrypted_password)
        t.string :encrypted_password, null: false, default: ""
      end
      unless column_exists?(:users, :reset_password_token)
        t.string :reset_password_token
      end
      unless column_exists?(:users, :reset_password_sent_at)
        t.datetime :reset_password_sent_at
      end
      unless column_exists?(:users, :remember_created_at)
        t.datetime :remember_created_at
      end
    end
  end
end
