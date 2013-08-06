require 'test_helper'

class QuestionTest < ActiveSupport::TestCase

  def setup
    @question = questions(:one)
  end

  # validations
  test "Validates presence of asker" do
    assert_presence_validation(@question, :asker)
  end

  test "Validates presence of title" do
    assert_presence_validation(@question, :title)
  end

  test "Validates uniqueness of title" do
    assert_uniqueness_validation(@question, :title)
  end

  test "Does not validate presence of description" do
    assert_presence_validation(@question, :description, false)
  end

  # self.answers_with_vote_info
  test "answers_with_vote_info calls Answer.with_vote_info" do
    Answer.stubs(:where)
    Answer.expects(:with_vote_info).returns(Answer)

    @question.answers_with_vote_info(1)
  end

  test "answers_with_vote_info should limit by it's own id" do
    Answer.stubs(:with_vote_info).returns(Answer)
    Answer.expects(:where).with(question_id: @question.id)

    @question.answers_with_vote_info(1)
  end

end
