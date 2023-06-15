Rails.application.routes.draw do
  devise_for :users, controllers: {
      registrations: 'users/registrations',
      sessions: 'users/sessions'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "welcome#index"
  resources :merchants
  post 'payments', to: 'payments#create'
  patch 'payments/:id', to: 'payments#update'
  put 'payments/:id', to: 'payments#update'
  get 'payments', to: 'payments#index'
end
