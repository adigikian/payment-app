class Transaction < ApplicationRecord
  belongs_to :merchant
  belongs_to :parent, class_name: 'Transaction', optional: true, foreign_key: 'parent_id'
  has_many :children, class_name: 'Transaction', foreign_key: 'parent_id'

  enum status: { pending: 0, approved: 1, reversed: 2, refunded: 3, error: 4 }

  validates :uuid, presence: true, uniqueness: true
  validates :status, presence: true, inclusion: { in: %w(pending approved reversed refunded error) }
  validates :customer_email, presence: true
  validates :customer_phone, presence: true
  before_validation :set_uuid
  validate :merchant_must_be_active
  validate :parent_transaction_must_be_approved_or_refunded, if: -> { parent.present? }
  after_initialize :set_default_status, if: :new_record?

  private

  def set_default_status
    self.status ||= :pending
  end

  def parent_transaction_must_be_approved_or_refunded
    unless parent.approved? || parent.refunded?
      errors.add(:parent, "Parent transaction must be in approved or refunded state.")
    end
  end

  def set_uuid
    self.uuid = SecureRandom.uuid
  end

  def merchant_must_be_active
    errors.add(:merchant, "must be in active state") unless merchant.active?
  end
end