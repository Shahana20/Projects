class AddRolesToUserRoles < ActiveRecord::Migration[8.0]
  def change
    reversible do |dir|
      dir.up do
        execute <<-SQL
          INSERT INTO user_roles (id, role, created_at, updated_at) 
          VALUES 
            (1, 'Admin', NOW(), NOW()), 
            (2, 'Mentor', NOW(), NOW()), 
            (3, 'Candidate', NOW(), NOW());
        SQL
      end
    end
  end
end
