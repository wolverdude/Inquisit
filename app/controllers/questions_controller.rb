class QuestionsController < ApplicationController

  def create
    @question = current_user.questions.build(params[:question])
    if @question.save
      render "show"
    else
      render :json => @question.errors.full_messages, :status => 422
    end
  end

  def destroy

  end

  def index
    @questions = Question.all
  end

  def show
    @question = Question.includes(:answers => :user).find(params[:id])
  end

  def update

  end
end
