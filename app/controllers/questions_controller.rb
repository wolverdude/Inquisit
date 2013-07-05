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
    @question = Question.find_by_id(params[:id])
    @question.destroy
    render "show"
  end

  def index
    @questions = Question.all
  end

  def show
    @question = Question.includes(:answers => :user).find(params[:id])
  end

  def update
    @question = Question.find(params[:id])
    if @question.update_attributes(params[:question])
      render "show"
    else
      render :json => @question.errors.full_messages, :status => 422
    end
  end
end
