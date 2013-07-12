class Question < ActiveRecord::Base
  belongs_to :asker, :class_name => "User"
  has_many :answers
  has_and_belongs_to_many :topics

  attr_accessible :anonymous, :description, :title, :topic_ids

  validates_presence_of :asker, :title
  validates_uniqueness_of :title

  def answers_with_vote_info(current_user_id)
    Answer.with_vote_info(current_user_id).where(:question_id => self.id)
  end
end
