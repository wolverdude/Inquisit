class QuestionsController < ApplicationController
  respond_to :json

  def create
    @question = current_user.questions.build(params[:question])
    if @question.save
      render "show_attrs"
    else
      render :json => @question.errors.full_messages, :status => 422
    end
  end

  def destroy
    @question = Question.find_by_id(params[:id])
    @question.destroy
    render "show_attrs"
  end

  def index
    @questions = Question.all
  end

  def show
    @question = Question.find(params[:id])
    @answers = @question.answers_with_vote_info(current_user.id)
                .includes(:user).order("vote_tally DESC")
  end

  def update
    @question = Question.find(params[:id])
    if @question.update_attributes(params[:question])
      render "show_attrs"
    else
      render :json => @question.errors.full_messages, :status => 422
    end
  end
end
