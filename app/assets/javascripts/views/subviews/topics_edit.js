Inquisit.Views.SubViews.TopicsEdit = Backbone.View.extend({

  template: JST['subviews/topics_edit'],

  events: {
    "click a.remove-topic": "eventRemoveTopic"
  },

  initialize: function(binding) {
    this.binding = binding;
    this.model = binding.model;
    this.topics = binding.model.get('topics');

    var that = this;
    _(['add', 'remove', 'change']).each(function(event) {
      that.listenTo(that.topics, event, that.render);
    });
  },

  render: function() {
    var that = this;

    var renderedContent = this.template(this.binding);
    this.$el.html(renderedContent);

    this.$el.find("button.cancel").remove()

    this.$el.find("#topic_title").typeahead({
      minLength: 2,

      source: function(term, process) {
        $.get("/topics", {term: term}, function(topicsData) {
          that.typeAheadTopics = new Inquisit.Collections.Topics()
          var matchList = []

          _(topicsData).each(function(topicData) {
            if (!that.topics.findWhere(topicData.topic)) {
              var topic = Inquisit.Models.Topic.findOrCreate(
                topicData, {parse: true}
              );
              that.typeAheadTopics.add(topic);
              matchList.push(topic.get('title'));
            }
          });

          matchList.push('Create Topic: "' + term + '"');

          process(matchList);
        });
      },

      updater: function(title) {
        var newTopic = /^Create Topic: "(.*)"$/.exec(title)

        if (newTopic) {
          that.topics.create({title: newTopic[1]});

        } else {
          var topic = that.typeAheadTopics.findWhere({title: title});
          that.topics.add(topic);
        }
      }
    });

    return this
  },

  eventRemoveTopic: function(event) {
    event.preventDefault();

    var id = $(event.currentTarget).data('id');
    var topic = this.topics.get(id);

    this.topics.remove(topic);
  }

});
