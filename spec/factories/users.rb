# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "User #{n}" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    role { 'admin' }

    factory :admin do
      role { 'admin' }
    end

    factory :merchant_user do
      role { 'merchant' }
    end
  end
end
