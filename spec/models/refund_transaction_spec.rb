require 'rails_helper'

RSpec.describe RefundTransaction, type: :model do
  let(:transaction) { build(:refund_transaction) }

  describe 'Validations' do
    it { should validate_numericality_of(:amount).is_greater_than(0) }
  end
end
