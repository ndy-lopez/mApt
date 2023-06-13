Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get 'my-maps', to: 'maps#my_maps', as: :my_maps
  resources :maps do
    get 'compare', to: 'maps#compare', as: :compare
    resources :potential_locations, only: [:create]
    resources :point_of_interests, only: [:index, :create]
  end
  resources :point_of_interests, only: [:destroy]
  resources :potential_locations, only: [:destroy]
end
