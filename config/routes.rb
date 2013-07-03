Clonora::Application.routes.draw do

  root :to => "root#index"
  match "index" => "root#index"

  devise_for :users

  resources :questions, :except => [:edit, :new] do
    resource :answer, :only => [:create]
  end
  resources :answers, :except => [:create, :edit, :new]

end
