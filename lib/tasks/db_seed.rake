# frozen_string_literal: true

# lib/tasks/db_seed.rake

require 'csv'

namespace :db do
  desc 'Seed the database'
  task seed: :environment do
    puts 'Seeding Users...'
    seed_users
    puts 'Seeding Merchants...'
    seed_merchants
    puts 'Done!'
  end

  def seed_users
    CSV.foreach(Rails.root.join('db', 'users.csv'), headers: true, &method(:create_user))
  end

  def create_user(row)
    User.find_or_create_by!(
      name: row['name'],
      email: row['email'],
      role: row['role']
    )
  end

  def seed_merchants
    CSV.foreach(Rails.root.join('db', 'merchants.csv'), headers: true, &method(:create_merchant))
  end

  def create_merchant(row)
    user = find_or_create_user(row)
    admin = find_or_create_admin(row)

    Merchant.find_or_create_by!(
      description: row['description'],
      status: Merchant.statuses[row['status']],
      admin_id: admin.id,
      user_id: user.id
    )
  end

  def find_or_create_user(row)
    User.find_or_create_by!(email: row['email'], name: row['name'], role: :merchant)
  end

  def find_or_create_admin(row)
    User.find_or_create_by(email: row['admin_email'])
  end
end
