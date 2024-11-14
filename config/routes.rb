Rails.application.routes.draw do
  devise_for :users

  root "auth#login" 

  namespace :api do
    namespace :v1 do
      post 'signup', to: 'auth#signup'
      post 'login', to: 'auth#login'
      resources :users, only: [:index, :show, :update, :destroy] do
        collection do
          get :current
          get :archived
          get :navbar_search
        end
        member do
          post :unarchive
          get :profile
        end
      end
    end
  end
end
