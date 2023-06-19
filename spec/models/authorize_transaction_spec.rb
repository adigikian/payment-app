require 'rails_helper'

RSpec.describe AuthorizeTransaction, type: :model do
  let(:transaction) { build(:authorize_transaction) }

  describe 'Validations' do
    it { should validate_numericality_of(:amount).is_greater_than(0) }
  end
end
