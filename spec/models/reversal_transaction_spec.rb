require 'rails_helper'

RSpec.describe ReversalTransaction, type: :model do
  let(:transaction) { build(:reversal_transaction) }

  describe 'Validations' do
    it { should_not validate_numericality_of(:amount).is_greater_than(0) }
  end
end
