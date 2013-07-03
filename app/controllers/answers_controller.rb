class AnswersController < ApplicationController

  def index
    answers = Answer.where(:question_id => params[:question_id])
    if answers
      render :json => answers
    else
      render :json => "answer not found", :status => :not_found
    end
  end

  def create

  end

  def update

  end

  def destroy
    answer = Answer.find(params[:id])
    if answer
      render :json => answer
    else
      render :json => "answer not found", :status => :not_found
    end
  end

end
