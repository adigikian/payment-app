# frozen_string_literal: true

FactoryBot.define do
  factory :merchant do
    sequence(:description) { |n| "Merchant Description #{n}" }
    status { 'active' }
    total_transaction_sum { 0.0 }
    association :user, factory: :merchant_user

    # Assumes that there are always admins in the system
    association :admin, factory: :admin
  end
end
