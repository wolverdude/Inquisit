Clonora::Application.routes.draw do
  get "root/index"

  devise_for :users

  root :to => "root#index"
end
