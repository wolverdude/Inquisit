class TopicsController < ApplicationController

  def create
    if @topic = Topic.find_by_title(params[:topic][:title])
      render "show"
    else
      @topic = Topic.new(params[:topic])
      if @topic.save
        render "show"
      else
        render :json => @topic.errors.full_messages, :status => 422
      end
    end
    if params[:question_id]
      question = Question.find(params[:question_id])
      @topic.questions <<= question
    end
  end

  def destroy
    @topic = Topic.find(params[:id])
    @topic.destroy
    render "show"
  end

  def index
    @topics = Topic.all
  end

  def show
    @topic = Topic.find(params[:id])
  end

  def update
    @topic = Topic.find(params[:id])
    if @topic.update_attributes(params[:topic])
      render "show"
    else
      render :json => @topic.errors.full_messages, :status => 422
    end
    if params[:question_id]
      question = Question.find(params[:question_id])
      @topic.questions <<= question
    end
  end

end
