# frozen_string_literal: true

# spec/controllers/payments_controller_spec.rb
require 'rails_helper'

RSpec.describe PaymentsController, type: :controller do
  let(:merchant) { create(:merchant) } # assumes you have a merchant factory
  let(:transaction) { create(:transaction, merchant:) } # assumes you have a transaction factory

  describe '#create' do
    context 'with valid params' do
      let(:valid_params) do
        {
          payment: {
            amount: 100,
            customer_email: 'test@test.com',
            customer_phone: '1234567890',
            merchant_id: merchant.id,
            type: 'AuthorizeTransaction',
            status: 'pending'
          }
        }
      end

      it 'creates a new transaction' do
        expect { post :create, params: valid_params }.to change(Transaction, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) do
        {
          payment: {
            amount: 100,
            customer_email: 'test@test.com',
            customer_phone: '1234567890',
            merchant_id: nil,
            type: 'AuthorizeTransaction',
            status: 'pending'
          }
        }
      end

      it 'does not create a new transaction' do
        expect { post :create, params: invalid_params }.not_to change(Transaction, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe '#update' do
    let(:params) do
      {
        id: transaction.id,
        status: 'approved'
      }
    end

    it 'updates the transaction' do
      put(:update, params:)
      transaction.reload
      expect(transaction.status).to eq('approved')
    end
  end

  describe '#index' do
    context 'when merchant exists' do
      let(:params) do
        {
          merchant_id: merchant.id
        }
      end

      it 'fetches transactions for a merchant' do
        get(:index, params:)
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when merchant does not exist' do
      let(:params) do
        {
          merchant_id: 'invalid_id'
        }
      end

      it 'returns not found status' do
        get(:index, params:)
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
