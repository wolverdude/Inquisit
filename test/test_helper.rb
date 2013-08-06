ENV["RAILS_ENV"] = "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'mocha/setup'

class ActiveSupport::TestCase
  fixtures :all

  # Validate tells whether the attribute is supposed to be validated.
  # To assert no validation, pass validate = false.
  def assert_validation(model, attribute, validate=true)
    negator = "not" if validate

    yield(model, attribute) if block_given?

    model.valid?
    assert(
      # (if it's not validated, errors should be empty)
      # (if it is validated, errors should not be empty)
      validate ^ model.errors[attribute].empty?,
      "uniqueness of #{attribute} #{negator} being validated"
    )
  end

  def assert_presence_validation(model, attribute, validate=true)
    assert_validation(model, attribute, validate) do |model, attribute|
      model.send("#{attribute}=", nil)

      model
    end
  end

  def assert_uniqueness_validation(model, attribute, validate=true)
    assert_validation(model, attribute, validate) do |model, attribute|
      copy = model.clone
      copy.id = nil

      # block for testing scopes
      yield(copy) if block_given?

      copy
    end
  end

end
