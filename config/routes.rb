Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }
      resources :users, only: [:index, :show, :update, :destroy] do
        member do
          patch :update_partial
        end
      end
      resources :user_roles
      resources :skills
      resources :reviews, only: [:create, :index, :show, :update, :destroy]
      resources :competency_levels
      resources :career_details
      get '/filter/locations', to: 'filters#locations'
      get '/filter/skills', to: 'filters#skills'
      get '/filter/roles', to: 'filters#roles'
      get '/filter/companies', to: 'filters#companies'
      get '/filter/designations', to: 'filters#designations'
      get "/sort/users", to: "sort#sort_users"
      get  'passwords/forgot', to: 'passwords#forgot', as: :forgot_password
      post 'passwords/forgot', to: 'passwords#send_reset_email'
      patch 'passwords/reset', to: 'passwords#update_password'
    end
  end
end
