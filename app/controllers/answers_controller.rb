class AnswersController < ApplicationController
  respond_to :json

  def create
    params[:answer][:question_id] = params[:question_id]
    @answer = current_user.answers.build(params[:answer])

    if @answer.save
      @answer = Answer.with_vote_info(current_user.id).find(@answer.id)
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
    @answers = Answer.with_vote_info(current_user.id)
                     .where(question_id: params[:question_id])
  end

  def show
    @answer = Answer.with_vote_info(current_user.id).find(params[:id])
  end

  def update
    @answer = Answer.find(params[:id])
    if @answer.update_attributes(params[:answer])
      @answer = Answer.with_vote_info(current_user.id).find(@answer.id)
      render "show"
    else
      render :json => @answer.errors.full_messages, :status => 422
    end
  end
end
