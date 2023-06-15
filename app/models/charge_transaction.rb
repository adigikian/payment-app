class ChargeTransaction < Transaction
  include Transactions

  private

  def parent_class
    AuthorizeTransaction
  end

  def transition_status
    :approved
  end
end