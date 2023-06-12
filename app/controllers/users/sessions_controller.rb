class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)

    render json: {
        success: true,
        user: {
            id: resource.id,
            email: resource.email,
            name: resource.name,
            role: resource.role # assuming the user model has a 'role' attribute
        }
    }
  end

  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render json: { success: signed_out }
  end
end
