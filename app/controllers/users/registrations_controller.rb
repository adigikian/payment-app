module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
      build_resource(sign_up_params)
      resource.build_merchant(merchant_params[:merchant_attributes]) if resource.role == 'merchant'
      resource.save
      render_resource(resource)
    end

    private

    def merchant_params
      params.require(:user).permit(merchant_attributes: [:description, :status])
    end
  end
end
