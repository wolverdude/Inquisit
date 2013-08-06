require 'test_helper'

class QuestionTest < ActiveSupport::TestCase

  def setup
    @question = questions(:one)
  end

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
    @question.description = nil
    assert_valid @question, :description, "description presence being validated"
  end

end
