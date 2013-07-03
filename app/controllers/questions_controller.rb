class QuestionsController < ApplicationController

  def create

  end

  def destroy

  end

  def index
    render :json => Question.all
  end

  def show
    question = Question.where(:id => params[:id]).includes(:answers).first
    if question
      render :json => question.to_json(:include => :answers)
    else
      render :json => "question not found", :status => :not_found
    end
  end

  def update

  end
end
