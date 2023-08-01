# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TransactionService, type: :service do
  let(:merchant) { create(:merchant) }
  let(:authorize_transaction) do
    transaction = AuthorizeTransaction.new(
      merchant:,
      amount: 100.0,
      customer_email: 'customer@test.com',
      customer_phone: '1234567890'
    )
    transaction.status = :approved
    transaction.save
    transaction
  end
  let(:charge_transaction) do
    transaction = ChargeTransaction.new(
      merchant:,
      amount: 50.0,
      customer_email: 'customer@test.com',
      customer_phone: '1234567890',
      parent: authorize_transaction
    )
    transaction.status = :approved
    transaction.save
    transaction
  end

  describe '#create_transaction' do
    context 'when transaction type is AuthorizeTransaction' do
      let(:params) do
        {
          merchant_id: merchant.id,
          type: 'AuthorizeTransaction',
          amount: 100.0,
          customer_email: 'customer@test.com',
          customer_phone: '1234567890'
        }
      end
      let(:service) { described_class.new(params:) }

      it 'creates an AuthorizeTransaction' do
        result = service.create_transaction
        expect(result).to be_a AuthorizeTransaction
        expect(result.errors).to be_empty
      end
    end

    context 'when transaction type is ChargeTransaction' do
      let(:params) do
        {
          merchant_id: merchant.id,
          type: 'ChargeTransaction',
          parent_id: authorize_transaction.id,
          amount: 50.0,
          customer_email: 'customer@test.com',
          customer_phone: '1234567890'
        }
      end
      let(:service) { described_class.new(params:) }

      it 'creates a ChargeTransaction' do
        result = service.create_transaction
        expect(result).to be_a ChargeTransaction
        expect(result.errors).to be_empty
      end
    end

    context 'when transaction type is RefundTransaction' do
      let(:params) do
        {
          merchant_id: merchant.id,
          type: 'RefundTransaction',
          parent_id: charge_transaction.id,
          amount: 50.0,
          customer_email: 'customer@test.com',
          customer_phone: '1234567890'
        }
      end
      let(:service) { described_class.new(params:) }

      it 'creates a RefundTransaction' do
        result = service.create_transaction
        expect(result).to be_a RefundTransaction
        expect(result.errors).to be_empty
      end
    end

    context 'when transaction type is ReversalTransaction' do
      let(:params) do
        {
          merchant_id: merchant.id,
          type: 'ReversalTransaction',
          parent_id: authorize_transaction.id,
          customer_email: 'customer@test.com',
          customer_phone: '1234567890'
        }
      end
      let(:service) { described_class.new(params:) }

      it 'creates a ReversalTransaction' do
        result = service.create_transaction
        expect(result).to be_a ReversalTransaction
        expect(result.errors).to be_empty
      end
    end
  end

  describe '#update_transaction' do
    let(:params) do
      {
        id: authorize_transaction.id,
        status: 'refunded'
      }
    end
    let(:service) { described_class.new(params:) }

    it 'updates the transaction status' do
      result = service.update_transaction
      expect(result).to be_a AuthorizeTransaction
      expect(result.status).to eq 'refunded'
    end
  end

  describe '#fetch_transactions_for_merchant' do
    let(:service) { described_class.new(params: { merchant_id: merchant.id }) }

    it 'returns all transactions for the merchant' do
      authorize_transaction
      result = service.merchant_transactions
      expect(result).to be_a Array
      expect(result.size).to eq 1
      expect(result.first[:type]).to eq 'AuthorizeTransaction'
    end
  end
end
