# app/services/transaction_service.rb
class TransactionService
  def initialize(params: {})
    @params = params
  end

  def create_transaction
    return { error: 'Merchant not found' } if @params[:merchant_id].blank?
    transaction_type = @params[:type].constantize
    transaction = transaction_type.new(@params)
    if transaction.save
      transaction
    else
      { errors: transaction.errors.full_messages }
    end
  end

  def update_transaction
    transaction = Transaction.find(@params[:id])
    transaction.status = @params[:status]

    if transaction.save
      transaction
    else
      { errors: transaction.errors.full_messages }
    end
  end

  def fetch_transactions_for_merchant
    merchant = Merchant.find_by(id: @params[:merchant_id])
    if merchant
      merchant.transactions.map{ |transaction| transaction.as_json.merge(type: transaction.class.name)}
    else
      nil
    end
  end
end
