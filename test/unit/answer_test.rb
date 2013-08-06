require 'test_helper'

class AnswerTest < ActiveSupport::TestCase

  def setup
    @answer = answers(:one)
    @answer_with_vote_info = Answer.with_vote_info(1).first
  end

  # validations
  test "Validates presence of user" do
    assert_presence_validation(@answer, :user)
  end

  test "Validates presence of question_id" do
    assert_presence_validation(@answer, :question_id)
  end

  test "Validates presence of text" do
    assert_presence_validation(@answer, :text)
  end

  # self.with_vote_info
  test "with_vote_info returns vote_tally" do
    assert(
      @answer_with_vote_info.has_attribute?(:vote_tally),
      "doesn't return vote_tally"
    )
  end

  test "with_vote_info returns vote_tally as an integer string" do
    vote_tally = @answer_with_vote_info.vote_tally

    assert !vote_tally.empty?, "current_user_vote is empty"
    assert vote_tally =~ /^\d*$/, "current_user_vote contains non-digits"
  end

  test "with_vote_info returns current_user_vote" do
    assert(
      @answer_with_vote_info.has_attribute?(:current_user_vote),
      "doesn't return current_user_vote"
    )
  end

  test "with_vote_info returns current_user_vote as an integer string" do
    vote = @answer_with_vote_info.current_user_vote

    assert ["-1", "0", "1"].include?(vote), "current_user_vote isn't in [-1, 0, 1]"
  end

end