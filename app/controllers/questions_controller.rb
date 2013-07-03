class QuestionsController < ApplicationController

  def create

  end

  def destroy

  end

  def index
    questions = Question.all
    if question
      render :json => questions
    else
      render :json => "question not found", :status => :not_found
    end
  end

  def show

  end

  def update

  end
end
