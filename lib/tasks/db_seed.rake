# lib/tasks/db_seed.rake

require 'csv'

namespace :db do
  desc "Seed the database"
  task seed: :environment do
    puts "Seeding Users..."
    seed_users
    puts "Seeding Merchants..."
    seed_merchants
    puts "Done!"
  end

  def seed_users
    CSV.foreach(Rails.root.join('db', 'users.csv'), headers: true) do |row|
      User.find_or_create_by!(
          name: row['name'],
          email: row['email'],
          role: row['role']
      )
    end
  end

  def seed_merchants
    CSV.foreach(Rails.root.join('db', 'merchants.csv'), headers: true) do |row|
      puts "row #{row}"
      user = User.find_or_create_by!(email: row['email'],name: row['name'], role: :merchant)
      admin = User.find_or_create_by(email: row['admin_email'])
      puts "admin #{admin.inspect}"
      puts "user #{user.inspect}"
      Merchant.find_or_create_by!(
          description: row['description'],
          status: Merchant.statuses[row['status']],
          admin_id: admin.id,
          user_id: user.id
      )
    end
  end
end
