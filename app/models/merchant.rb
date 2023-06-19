class Merchant < ApplicationRecord
  enum status: { active: 0, inactive: 1 }

  has_many :transactions

  belongs_to :user
  belongs_to :admin, class_name: 'User', foreign_key: 'admin_id', optional: true

  validates :description, presence: true

  accepts_nested_attributes_for :user

  before_validation :set_admin_id

  def update_total_amount(amount)
    self.total_transaction_sum ||= 0
    self.total_transaction_sum += amount
    save!
  end

  private

  def set_admin_id
    self.admin_id = user_id if admin_id.nil? && user.present?
  end
end
