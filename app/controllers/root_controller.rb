class RootController < ApplicationController

  def index
    @user = current_user
    @questions = Question.all
  end

end
