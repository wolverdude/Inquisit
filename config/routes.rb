Inquisit::Application.routes.draw do

  root :to => "root#index"
  match "index" => "root#index"

  devise_for :users
  resources :users, :only => [:show, :update]

  resources :answers, :except => [:create, :edit, :new] do
    post "upvote" => "votes#upvote"
    post "downvote" => "votes#downvote"
    delete "unvote" => "votes#destroy"
  end

  resources :questions, :except => [:edit, :new] do
    resources :answers, :only => [:create]
  end

  resources :topics, :except => [:edit, :new] do
    resources :questions, :only => [:create]
  end
end
