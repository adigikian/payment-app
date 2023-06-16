# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    def create
      perform_authentication
      sign_in(resource_name, resource)

      render_success_response
    end

    def destroy
      signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
      render json: { success: signed_out }
    end

    private

    def perform_authentication
      self.resource = warden.authenticate!(auth_options)
    end

    def render_success_response
      render json: {
        success: true,
        user: user_response
      }
    end

    def user_response
      {
        id: resource.id,
        email: resource.email,
        name: resource.name,
        merchant_id: resource&.merchant&.id,
        role: resource.role
      }
    end

    def respond_with(resource, _opts = {})
      render json: resource
    end

    def respond_to_on_destroy
      render json: { message: 'Logged out.' }
    end
  end
end
