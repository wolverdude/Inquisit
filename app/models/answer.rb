class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question
  has_many :votes
  attr_accessible :anonymous, :question_id, :text

  validates_presence_of :user, :question_id, :text

  ## gets answers with sum of votes and what the current user's vote is.
  def self.with_vote_info(current_user_id)
    select_clause = <<-SQL
        answers.*,
        COALESCE(SUM(votes.count), 0) AS vote_tally,
        SUM(
          CASE WHEN votes.user_id = ?
            THEN votes.count
            Else 0
          END
        ) AS current_user_vote
      SQL

    Answer.select(sanitize_sql_array([select_clause, current_user_id])) \
          .joins('LEFT JOIN votes ON answers.id = votes.answer_id') \
          .group('answers.id')
  end

end
