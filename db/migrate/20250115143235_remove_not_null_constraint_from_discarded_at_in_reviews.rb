class RemoveNotNullConstraintFromDiscardedAtInReviews < ActiveRecord::Migration[8.0]
  def change
    change_column_null :reviews, :discarded_at, true
  end
end
