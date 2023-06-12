class Merchant < ApplicationRecord
    # Enum for status
    enum status: { active: 0, inactive: 1 }

    # Relations
    belongs_to :user
    belongs_to :admin, class_name: 'User', foreign_key: 'admin_id'
    #has_many :transactions, dependent: :restrict_with_error

    # Validations
    validates :description, presence: true
end
