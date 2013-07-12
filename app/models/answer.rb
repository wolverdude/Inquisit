class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question
  has_many :votes
  attr_accessible :anonymous, :question_id, :text

  validates_presence_of :user, :question_id, :text

  def self.with_vote_tally
    Answer.select('answers.*, SUM(votes.count) as vote_tally') \
          .joins('LEFT JOIN votes ON answers.id = votes.answer_id') \
          .group('answers.id')
  end
end
