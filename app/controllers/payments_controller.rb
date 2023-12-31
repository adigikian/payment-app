# frozen_string_literal: true

class PaymentsController < ApplicationController
  def create
    service = TransactionService.new(params: payment_params)
    transaction = service.create_transaction

    if transaction.is_a?(Transaction)
      render json: transaction.as_json.merge(type: transaction.class.name), status: :created
    else
      render_error(transaction.errors.full_messages.to_sentence, :unprocessable_entity)
    end
  end


  def update
    service = TransactionService.new(params: update_params)
    updated_transaction = service.update_transaction

    if updated_transaction.is_a?(Transaction)
      render json: { message: 'Payment status updated successfully' }, status: :ok
    else
      render_error(updated_transaction.errors.full_messages.to_sentence, :unprocessable_entity)
    end
  end


  def index
    merchant = Merchant.find_by(id: params[:merchant_id])

    if merchant
      transactions = merchant.transactions.map do |transaction|
        transaction.as_json.merge(type: transaction.class.name)
      end

      render json: transactions, status: :ok
    else
      render_error('Merchant not found', :not_found)
    end
  end


  private

  def payment_params
    params.require(:payment).permit(:amount, :customer_email, :customer_phone, :merchant_id, :type, :status,
                                    :parent_id)
  end

  def update_params
    params.permit(:id, :status)
  end
end
