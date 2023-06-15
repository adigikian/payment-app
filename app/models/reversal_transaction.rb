class ReversalTransaction < Transaction
  include Transactions

  private

  def parent_class
    AuthorizeTransaction
  end

  def transition_status
    :reversed
  end

  def is_a_reversal?
    true
  end
end