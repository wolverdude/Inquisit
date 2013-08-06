ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'mocha/setup'

class ActiveSupport::TestCase
  fixtures :all

  def assert_invalid(model, attribute, message=nil)
    model.valid?
    assert !model.errors[attribute].empty?, message
  end

  def assert_valid(model, attribute, message=nil)
    model.valid?
    assert model.errors[attribute].empty?, message
  end

  def assert_presence_validation(model, attribute)
    model.send("#{attribute}=", nil)

    assert_invalid model, attribute, "presence of #{attribute} not validated"
  end

  def assert_uniqueness_validation(model, attribute)
    copy = model.clone
    copy.id = nil

    debugger
    assert_invalid copy, attribute, "uniqueness of #{attribute} not validated"
  end
end
