require 'rails_helper'

RSpec.describe MerchantsController, type: :controller do
  let(:user) { create(:user) }
  let(:admin) { create(:admin) }
  let(:merchant) { create(:merchant, admin_id: admin.id, user_id: user.id) }

  before do
    sign_in user
  end

  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      get :show, params: { id: merchant.id }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      let(:valid_attributes) do
        {
            description: 'Valid Description',
            status: 'active',
            admin_id: admin.id,
            user_attributes: attributes_for(:user)
        }
      end

      it 'creates a new Merchant' do
        expect {
          post :create, params: { merchant: valid_attributes }
        }.to change(Merchant, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid parameters' do
      let(:invalid_attributes) do
        {
            description: nil,
            status: 'active',
            admin_id: admin.id,
            user_attributes: attributes_for(:user)
        }
      end

      it 'does not create a new Merchant' do
        expect {
          post :create, params: { merchant: invalid_attributes }
        }.not_to change(Merchant, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end


  describe 'PUT #update' do
    context 'with valid parameters' do
      it 'updates the requested merchant' do
        put :update, params: { id: merchant.id, merchant: { description: 'New Description' } }
        merchant.reload
        expect(merchant.description).to eq('New Description')
      end
    end

    context 'with invalid parameters' do
      it 'does not update the merchant' do
        put :update, params: { id: merchant.id, merchant: { description: nil } }
        merchant.reload
        expect(merchant.description).not_to eq(nil)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested merchant' do
      merchant = Merchant.create!(description: 'Merchant to be destroyed', status: 0, admin_id: admin.id, user_id: user.id)
      expect {
        delete :destroy, params: { id: merchant.id }
      }.to change(Merchant, :count).by(-1)
    end
  end
end
