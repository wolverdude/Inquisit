## scrapes topic names from wiktionary.org
# I had to scrape directly from an html page
# because their API breaks when you put colons
# in the query string.

require 'nokogiri'
require 'rest-client'

## Webpage wrapper class
class CategoryPage

  def initialize(url)
    resp = RestClient.get(url)
    @document = Nokogiri.HTML(resp)
  end

  ## Scrapes topic names off the page
  def categories
    categories = []
    els = @document.css('.CategoryTreeLabel')

    els.each do |el|
      if el.text =~ /^en:/
        category = el.text.sub(/^en:/, '')
        categories.push(category)
      end
    end

    categories
  end

  ## Gets the url of the next page of topic names
  def next_url
    els = @document.css("[text()*='next 200']")
    return if els.empty?

    path = els.first.attr('href')
    'http://en.wiktionary.org' + path
  end
end

## Saves the scraped topics into the database if they don't already exist there.
def save_topics(titles)
  titles.each do |title|
    Topic.create({title: title}) unless Topic.find_by_title(title)
  end
end

url = 'http://en.wiktionary.org/w/index.php?title=Category:en:List_of_topics'
topic_titles = []

while url
  page = CategoryPage.new(url)

  topic_titles.concat(page.categories)

  url = page.next_url
end

save_topics(topic_titles)