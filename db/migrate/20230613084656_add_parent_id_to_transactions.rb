# frozen_string_literal: true

# migration
class AddParentIdToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :parent_id, :integer
    add_index :transactions, :parent_id
  end
end
