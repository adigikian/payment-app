require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  it 'is valid with valid attributes' do
    expect(user).to be_valid
  end

  it 'is not valid without a name' do
    user.name = nil
    expect(user).not_to be_valid
  end

  it 'is not valid without an email' do
    user.email = nil
    expect(user).not_to be_valid
  end

  it 'is not valid with a duplicate email' do
    user.save
    another_user = build(:user, email: user.email)
    expect(another_user).not_to be_valid
  end

  describe 'Associations' do
    it { should have_one(:merchant) }
    it { should have_many(:admin_merchants) }
  end

  describe 'enum role' do
    it { should define_enum_for(:role).with_values(admin: 0, merchant: 1) }
  end

  describe '#merchant_id' do
    context 'when the user has a merchant' do
      let(:merchant) { create(:merchant, user: user) }

      it 'returns the merchant id' do
        expect(user.merchant_id).to eq(merchant.id)
      end
    end

    context 'when the user does not have a merchant' do
      it 'returns nil' do
        expect(user.merchant_id).to be_nil
      end
    end
  end
end
