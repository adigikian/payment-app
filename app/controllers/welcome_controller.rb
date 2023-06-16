# frozen_string_literal: true

class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [:show]

  def show
    render json: current_user.as_json(methods: [:merchant_id]), status: :ok
  end

  def index; end
end
