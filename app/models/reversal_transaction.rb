# frozen_string_literal: true

class ReversalTransaction < Transaction
  include Transactions

  private

  def parent_class
    AuthorizeTransaction
  end

  def transition_status
    :reversed
  end

  def a_reversal?
    true
  end
end
