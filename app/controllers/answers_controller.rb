class AnswersController < ApplicationController

  def create
    params[:answer][:question_id] = params[:question_id]
    @answer = current_user.answers.build(params[:answer])

    if @answer.save
      render "show"
    else
      render :json => @answer.errors.full_messages, :status => 422
    end
  end

  def destroy
    @answer = Answer.find(params[:id])
    @answer.destroy
    render "show"
  end

  def index
    @answers = Answer.where(:question_id => params[:question_id])
  end

  def show
    @answer = Answer.find(params[:id])
  end

  def update
    @answer = Answer.find(params[:id])
    if @answer.update_attributes(params[:answer])
      render "show"
    else
      render :json => @answer.errors.full_messages, :status => 422
    end
  end

end
