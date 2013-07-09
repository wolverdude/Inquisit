class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question
  has_many :votes
  attr_accessible :anonymous, :question_id, :text

  validates_presence_of :user, :question_id, :text

  def vote_tally
    self.votes.sum('count')
  end

end
