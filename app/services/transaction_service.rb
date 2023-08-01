# frozen_string_literal: true

# app/services/transaction_service.rb
class TransactionService
  def initialize(params: {})
    @params = params
  end

  def create_transaction
    return  if @params[:merchant_id].blank?
    transaction_type = @params[:type].constantize
    transaction = transaction_type.new(@params)
    transaction.save
    transaction
  end

  def update_transaction
    transaction = Transaction.find(@params[:id])
    transaction.status = @params[:status]
    transaction.save
    transaction
  end

  def merchant_transactions
    merchant = Merchant.find_by(id: @params[:merchant_id])
    return unless merchant
    merchant.transactions.map { |transaction| transaction.as_json.merge(type: transaction.class.name) }
  end
end
