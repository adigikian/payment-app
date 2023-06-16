# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_230_613_133_226) do
  create_table 'jwt_denylist', force: :cascade do |t|
    t.string 'jti', null: false
    t.datetime 'exp', null: false
    t.index ['jti'], name: 'index_jwt_denylist_on_jti'
  end

  create_table 'merchants', force: :cascade do |t|
    t.string 'description'
    t.integer 'status'
    t.integer 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'admin_id'
    t.float 'total_transaction_sum'
    t.index ['admin_id'], name: 'index_merchants_on_admin_id'
    t.index ['user_id'], name: 'index_merchants_on_user_id'
  end

  create_table 'transactions', force: :cascade do |t|
    t.string 'uuid'
    t.decimal 'amount'
    t.integer 'status'
    t.string 'customer_email'
    t.string 'customer_phone'
    t.integer 'merchant_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'type'
    t.integer 'parent_id'
    t.index ['merchant_id'], name: 'index_transactions_on_merchant_id'
    t.index ['parent_id'], name: 'index_transactions_on_parent_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'name'
    t.string 'email'
    t.integer 'role'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'encrypted_password', default: '', null: false
    t.string 'reset_password_token'
    t.datetime 'reset_password_sent_at'
    t.datetime 'remember_created_at'
    t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
  end

  add_foreign_key 'merchants', 'users'
  add_foreign_key 'transactions', 'merchants'
end
