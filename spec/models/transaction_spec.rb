require 'rails_helper'

RSpec.describe Transaction, type: :model do
  let(:transaction) { build(:transaction) }
  let(:merchant) { create(:merchant, :active) }

  describe 'Associations' do
    it { should belong_to(:merchant) }
    it { should belong_to(:parent).class_name('Transaction').optional }
    it { should have_many(:children).class_name('Transaction') }
  end

  describe 'Validations' do
    it { should validate_presence_of(:status) }
    it { should validate_presence_of(:customer_email) }
    it { should validate_presence_of(:customer_phone) }
    it { should validate_uniqueness_of(:uuid) }
    it { should define_enum_for(:status).with_values(pending: 0, approved: 1, reversed: 2, refunded: 3, error: 4) }
  end

  describe 'Callbacks' do
    it 'generates uuid before validation on create' do
      transaction.validate
      expect(transaction.uuid).not_to be_nil
    end

    it 'sets default status before validation on create' do
      transaction.validate
      expect(transaction.status).to eq('pending')
    end
  end

  describe '#merchant_must_be_active' do
    context 'when merchant is active' do
      it 'is valid' do
        transaction.merchant = merchant
        expect(transaction).to be_valid
      end
    end

    context 'when merchant is not active' do
      it 'is not valid' do
        merchant.update!(status: :inactive)
        transaction.merchant = merchant
        expect(transaction).not_to be_valid
        expect(transaction.errors[:merchant]).to include('must be in active state')
      end
    end
  end
end
