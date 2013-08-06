require 'test_helper'

class VoteTest < ActiveSupport::TestCase

  def setup
    @vote = votes(:one)
  end

  # validations
  test "Validates presence of user" do
    assert_presence_validation(@vote, :user)
  end

  test "Validates presence of answer" do
    assert_presence_validation(@vote, :answer)
  end

  test "Validates uniqueness of user_id for same answer_id" do
    assert_uniqueness_validation(@vote, :user_id)
  end

  test "Does not validate uniqueness of user_id for different answer_id" do
    assert_uniqueness_validation(@vote, :user_id, false) do |vote|
      vote.answer_id += 1
    end
  end

end
