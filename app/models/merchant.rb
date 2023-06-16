# frozen_string_literal: true

class Merchant < ApplicationRecord
  enum status: { active: 0, inactive: 1 }

  has_many :transactions

  belongs_to :user
  belongs_to :admin, class_name: 'User', foreign_key: 'admin_id'

  validates :description, presence: true

  accepts_nested_attributes_for :user

  def update_total_amount(amount)
    self.total_transaction_sum += amount
    save!
  end
end
