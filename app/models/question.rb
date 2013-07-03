class Question < ActiveRecord::Base
  belongs_to :asker, :class_name => "User"
  has_many :answers
  attr_accessible :description, :title
end
