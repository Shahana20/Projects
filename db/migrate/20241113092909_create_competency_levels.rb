class CreateCompetencyLevels < ActiveRecord::Migration[8.0]
  def change
    create_table :competency_levels do |t|
      t.string :competency
      t.datetime :created_at, precision: 6, null: false
      t.datetime :updated_at, precision: 6, null: false
    end
  end
end
