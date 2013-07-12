class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :token_authenticatable, #:confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :questions, :foreign_key => :asker_id
  has_many :answers
  has_many :votes
  has_many :voted_answers, :through => :votes, :source => :answer

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :bio

end
