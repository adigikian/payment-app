# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  # Define enum for role
  enum role: { admin: 0, merchant: 1 }

  # Relations
  has_one :merchant
  has_many :admin_merchants, class_name: 'Merchant', foreign_key: :admin_id # Merchants this user administers

  # Validations
  validates :name, :email, presence: true
  validates :email, uniqueness: true

  def merchant_id
    merchant&.id
  end
end
