class UpdateReviewsAddDiscardedAtDefault < ActiveRecord::Migration[8.0]
  def change
    def change
      change_column_default :reviews, :discarded_at, nil
    end
  end
end
