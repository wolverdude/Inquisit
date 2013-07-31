class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :token_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :questions, :foreign_key => :asker_id
  has_many :answers
  has_many :votes
  has_many :voted_answers, :through => :votes, :source => :answer

  attr_accessible :email, :password, :password_confirmation,
                  :remember_me, :name, :bio

end
