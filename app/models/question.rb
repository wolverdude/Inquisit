class Question < ActiveRecord::Base
  belongs_to :asker, :class_name => "User"
  attr_accessible :description, :title
end
