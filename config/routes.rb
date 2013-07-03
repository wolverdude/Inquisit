Clonora::Application.routes.draw do
  get "questions/index"

  get "questions/show"

  get "root/index"

  devise_for :users

  root :to => "root#index"
end
