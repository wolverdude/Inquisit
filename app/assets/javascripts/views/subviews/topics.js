Inquisit.Views.SubViews.Topics = Inquisit.Views.ShowEditSubView.extend({

  showTemplate: JST['subviews/topics_show'],
  editTemplate: JST['subviews/topics_edit'],

  events: {
    "click a.btn-edit": "eventEdit",
    "click button.cancel": "eventShow",
    "click a.remove-topic": "eventRemoveTopic"
  },

  initialize: function(binding) {
    this.binding = binding;
    this.model = binding.model;
    this.topics = binding.model.get('topics');

    var that = this;
    _(['add', 'remove', 'change']).each(function(event) {
      that.listenTo(that.topics, event, that.renderEdit);
    });
  },

  renderEdit: function() {
    var that = this;

    this._render(this.editTemplate)
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
          that.topics.create({title: newTopic[1]}, {
            url: "questions/" + that.model.id + "/topics"
          });

        } else {
          var topic = that.typeAheadTopics.findWhere({title: title});

          topic.save({}, {
            url: "questions/" + that.model.id + "/topics/" + topic.id,
            success: function(topic) {
              that.topics.add(topic);
            }
          });
        }
      }
    });

    return this
  },

  eventRemoveTopic: function(event) {
    event.preventDefault();

    var id = $(event.currentTarget).data('id');
    var topic = this.topics.get(id);

    var that = this;
    this.model.save({}, {
      wait: true,
      success: function() {
        that.topics.remove(topic);
      }
    });
  }

});
