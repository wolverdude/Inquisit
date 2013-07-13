class UsersController < ApplicationController
  before_filter :enforce_current_user, :only => [:update]
  respond_to :json

  def show
    @user = User.includes(:questions, :answers).find(params[:id])
  end

  def update
    @user = current_user
    if @user.update_attributes(params[:user])
      render "show_attrs"
    else
      render :json => @user.errors.full_messages, :status => 422
    end
  end

  def enforce_current_user
    unless current_user.id == params[:id].to_i
      render :json => ["not signed in as this user"], :status => 401
    end
  end

end
