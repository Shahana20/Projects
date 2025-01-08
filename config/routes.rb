Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }
      resources :users, only: [:index, :show, :update] do
        member do
          patch :update_partial
        end
      end
      # patch '/users/:id', to: 'users#update', as: :update_user
      # get '/users/:id', to: 'users#show', as: :show_user
      # get '/users', to: 'users#index', as: :show_users
      resources :user_roles
      resources :skills
    end
  end
end
