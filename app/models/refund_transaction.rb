# frozen_string_literal: true

class RefundTransaction < Transaction
  include Transactions

  private

  def parent_class
    ChargeTransaction
  end

  def transition_status
    :refunded
  end
end
