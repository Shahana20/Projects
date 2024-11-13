Rails.application.routes.draw do
  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      post 'signup', to: 'auth#signup'
      post 'login', to: 'auth#login'
    end
  end

  root "home#index" 
  
end
