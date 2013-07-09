class VotesController < ApplicationController
  respond_to :json

  def upvote
    vote(1)
  end

  def downvote
    vote(-1)
  end

  def destroy
    @vote = current_user.votes.find_by_answer_id(params[:answer_id])
    @vote.count = 0

    save_and_render
  end

  private

  def vote(count)
    @vote = current_user.votes.find_by_answer_id(params[:answer_id])
    if @vote
      @vote.count = count
    else
      @vote = current_user.votes.build({
        :answer_id => params[:answer_id],
        :count => count
      })
    end

    save_and_render
  end

  private

  def save_and_render
    if @vote.save
      render :json => @vote
    else
      render :json => @vote.errors.full_messages, :status => 422
    end
  end

end
