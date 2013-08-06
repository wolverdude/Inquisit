source 'https://rubygems.org'
ruby '1.9.3'

# backend
gem 'rails', '3.2.13'
gem 'pg'
gem 'devise'
gem 'rabl'

# frontend
gem 'jquery-rails'
gem 'backbone-on-rails'

# scripting
gem 'nokogiri'
gem 'rest-client'

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end

group :development, :test do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'debugger'
  gem 'letter_opener'
end

group :test do
  gem 'mocha', :require => false
end

group :production do
  gem 'newrelic_rpm'
end