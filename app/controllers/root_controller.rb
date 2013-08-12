class RootController < ApplicationController
  respond_to :html
  skip_before_filter :authenticate_user!
  before_filter :soft_authenticate_user!

  def index
    @user = current_user
    @questions = Question.all
    render :index
  end

  def soft_authenticate_user!
    unless user_signed_in?
      redirect_to new_user_session_url
    end
  end

end
