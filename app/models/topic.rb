class Topic < ActiveRecord::Base
  has_and_belongs_to_many :questions

  attr_accessible :description, :title

  validates_presence_of :title
end
