module Transactions
  extend ActiveSupport::Concern

  included do
    validates :amount, numericality: { greater_than: 0 }, unless: :is_a_reversal?
    validate :parent_must_be_valid_transaction
    after_save :update_parent_status, if: :approved?
    after_save :update_merchant_total_amount, if: :approved?

    private

    def parent_must_be_valid_transaction
      unless parent.is_a?(parent_class)
        errors.add(:parent, "Parent transaction must be a #{parent_class.name.downcase} transaction.")
      end
    end

    def update_parent_status
      parent.update!(status: transition_status)
    rescue ActiveRecord::RecordInvalid => e
      errors.add(:parent, "Failed to update parent transaction: #{e.message}")
      throw(:abort)
    end

    def update_merchant_total_amount
      amount_modifier = is_a_reversal? ? -1 : 1
      merchant.update_total_amount(amount * amount_modifier)
    end

    def parent_class
      raise NotImplementedError, "You must implement the parent_class method"
    end

    def transition_status
      raise NotImplementedError, "You must implement the transition_status method"
    end

    def is_a_reversal?
      false
    end
  end
end
