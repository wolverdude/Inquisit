class Topic < ActiveRecord::Base
  has_and_belongs_to_many :questions

  attr_accessible :description, :title

  validates_presence_of :title

  ## Gets topics matching a search term.
  #  Excludes topics already tagged on question_id if given.
  def self.match(term, question_id=nil)
    matcher = "%#{term.downcase}%"
    query = Topic.where("LOWER(title) LIKE ?", matcher).order("LENGTH(title)")

    if question_id
      query = query
        .joins("LEFT JOIN questions_topics
                ON topics.id = questions_topics.topic_id")
        .where("COALESCE(questions_topics.question_id, 0) != ?", question_id)
    end

    query
  end

end
