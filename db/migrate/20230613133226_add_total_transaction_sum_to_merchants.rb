class AddTotalTransactionSumToMerchants < ActiveRecord::Migration[7.0]
  def change
    add_column :merchants, :total_transaction_sum, :float
  end
end
