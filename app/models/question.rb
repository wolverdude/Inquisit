class Question < ActiveRecord::Base
  belongs_to :asker, :class_name => "User"
  has_many :answers
  has_and_belongs_to_many :topics

  attr_accessible :anonymous, :description, :title, :topic_ids

  validates_presence_of :asker, :title
end
