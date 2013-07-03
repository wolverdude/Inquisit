class RootController < ApplicationController
  before_filter :authenticate_user!

  def index
    @user = current_user
    @questions = Question.all
  end

end
