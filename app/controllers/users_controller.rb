class UsersController < ApplicationController
  respond_to :json

  def show
    @user = User.includes(:questions, :answers).find(params[:id])
  end

end
