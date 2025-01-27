class RemoveDoublePrecisionFromEducationDetails < ActiveRecord::Migration[8.0]
  def change
    remove_column :education_details, :double_precision, :float
  end
end
