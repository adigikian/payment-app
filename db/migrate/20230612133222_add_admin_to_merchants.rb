class AddAdminToMerchants < ActiveRecord::Migration[7.0]
  def change
    add_column :merchants, :admin_id, :integer
    add_index :merchants, :admin_id
  end
end
