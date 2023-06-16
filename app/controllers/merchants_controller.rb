# frozen_string_literal: true

class MerchantsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_merchant, only: %i[show update destroy]

  def index
    merchants = Merchant.all
    render json: merchants, status: :ok
  end

  def show
    render json: @merchant, status: :ok
  end

  def create
    merchant = Merchant.new(merchant_params)

    if merchant.save
      render json: merchant, status: :created
    else
      render json: { error: merchant.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def update
    if @merchant.update(merchant_params)
      render json: @merchant, status: :ok
    else
      render json: { error: @merchant.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @merchant.destroy
    render json: { message: 'Merchant deleted successfully' }, status: :ok
  end

  private

  def set_merchant
    @merchant = Merchant.find(params[:id])
  end

  def merchant_params
    params.require(:merchant).permit(:description, :status, :admin_id, user_attributes: %i[name email role])
  end
end
