class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question
  attr_accessible :anonymous, :question_id, :text
end
