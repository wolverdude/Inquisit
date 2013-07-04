class TopicsController < ApplicationController

  def create

  end

  def update

  end

  def destroy

  end

  def index
    @topics = Topic.all
  end

  def show
    @topic = Topic.find(params[:id])
  end

end
