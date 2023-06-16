# frozen_string_literal: true

class AddTypeToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :type, :string
  end
end
