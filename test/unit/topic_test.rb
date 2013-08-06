require 'test_helper'

class TopicTest < ActiveSupport::TestCase

  def setup
    @topic = topics(:one)
  end

  # validations
  test "Validates presence of title" do
    assert_presence_validation(@topic, :title)
  end

end
