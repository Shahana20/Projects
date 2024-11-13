class CreateBatchesSkills < ActiveRecord::Migration[8.0]
  def change
    create_table :batches_skills do |t|
      t.references :batches, foreign_key: true
      t.references :skills, foreign_key: true

    end
  end
end
