# frozen_string_literal: true

class ChangeStautsTypeInTransactions < ActiveRecord::Migration[7.0]
  def change
    change_column(:transactions, :status, :integer)
  end
end
