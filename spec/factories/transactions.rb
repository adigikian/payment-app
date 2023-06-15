# spec/factories/transactions.rb
FactoryBot.define do
  factory :transaction do
    uuid { SecureRandom.uuid }
    status { Transaction.statuses.keys.sample }
    customer_email { Faker::Internet.email }
    customer_phone { Faker::PhoneNumber.cell_phone_in_e164 }
    merchant

    factory :authorize_transaction, class: 'AuthorizeTransaction' do
      amount { Faker::Commerce.price(range: 0..100.0) }
      type { 'AuthorizeTransaction' }
    end

    factory :charge_transaction, class: 'ChargeTransaction' do
      amount { Faker::Commerce.price(range: 0..100.0) }
      type { 'ChargeTransaction' }
    end

    factory :refund_transaction, class: 'RefundTransaction' do
      amount { Faker::Commerce.price(range: 0..100.0) }
      type { 'RefundTransaction' }
    end

    factory :reversal_transaction, class: 'ReversalTransaction' do
      amount { nil }
      type { 'ReversalTransaction' }
    end
  end
end
