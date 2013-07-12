class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :answer
  attr_accessible :answer_id, :count

  validates_presence_of :user, :answer
  validates_uniqueness_of :user_id, :scope => :answer_id
  validates_inclusion_of :count, :in => [1, 0, -1]

end
