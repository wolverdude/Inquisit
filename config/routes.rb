Clonora::Application.routes.draw do

  root :to => "root#index"
  match "index" => "root#index"

  devise_for :users
  resources :users, :only => [:show]

  resources :answers, :except => [:create, :edit, :new] do
    post "upvote" => "votes#upvote"
    post "downvote" => "votes#downvote"
    delete "unvote" => "votes#destroy"
  end

  resources :questions, :except => [:edit, :new] do
    resources :answers, :only => [:create]
    resources :topics, :only => [:create, :update]
  end

  resources :topics, :except => [:edit, :new] do
    resources :questions, :only => [:create]
  end
end
