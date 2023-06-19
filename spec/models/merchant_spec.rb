require 'rails_helper'

RSpec.describe Merchant, type: :model do
  let(:merchant) { build(:merchant) }

  describe 'validations' do
    it { should validate_presence_of(:description) }
  end

  describe 'associations' do
    it { should have_many(:transactions) }
    it { should belong_to(:user) }
    it { should belong_to(:admin) }
  end

  describe 'enum' do
    it { should define_enum_for(:status).with_values(active: 0, inactive: 1) }
  end

  describe '#update_total_amount' do
    let(:amount) { 10.0 }

    it 'updates the total_transaction_sum' do
      expect {
        merchant.update_total_amount(amount)
      }.to change(merchant, :total_transaction_sum).by(amount)
    end
  end
end
