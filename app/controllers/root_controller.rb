class RootController < ApplicationController
  respond_to :html

  def index
    @user = current_user
    @questions = Question.all
  end

end
