class TopicsController < ApplicationController

  def create
    @topic = Topic.new(params[:topic])
    if @topic.save
      render "show"
    else
      render :json => @topic.errors.full_messages, :status => 422
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
  end

end
