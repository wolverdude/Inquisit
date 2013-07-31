Inquisit.Views.SubViews.Topics = Inquisit.Views.ShowEditSubView.extend({

  showTemplate: JST['subviews/topics_show'],
  editTemplate: JST['subviews/topics_edit'],

  events: {
    "click a.btn-edit": "eventEdit",
    "click button.cancel": "eventShow",
    "click a.remove-topic": "eventRemoveTopic"
  },

  // Initialize with binding that will be passed to render functions.
  initialize: function(binding) {
    this.binding = binding;
    this.model = binding.model;
    this.topics = binding.model.get('topics');

    var self = this;
    _(['add', 'remove', 'change']).each(function(event) {
      self.listenTo(self.topics, event, self.renderEdit);
    });
  },

  renderEdit: function() {
    var self = this;

    this._render(this.editTemplate);

    // Bind typeahead functionality.
    this.$el.find("#topic_title").typeahead({
      minLength: 2,

      // Get topics from server matching what has been typed in so far.
      source: function(term, process) {
        $.get("/topics", {term: term}, function(topicsData) {
          self.typeAheadTopics = new Inquisit.Collections.Topics()
          var matchList = [];

          // Filter out topics that have already been tagged on this question.
          _(topicsData).each(function(topicData) {
            if (!self.topics.findWhere(topicData.topic)) {
              var topic = Inquisit.Models.Topic.findOrCreate(
                topicData, {parse: true}
              );
              self.typeAheadTopics.add(topic);
              matchList.push(topic.get('title'));
            }
          });

          // Add option to create new topic.
          matchList.push('Create Topic: "' + term + '"');

          process(matchList);
        });
      },

      // Add topic to list when selected
      updater: function(title) {
        var newTopic = /^Create Topic: "(.*)"$/.exec(title);

        if (newTopic) { // Create a new topic on the server & add to question.
          self.topics.create({title: newTopic[1]}, {
            url: "questions/" + self.model.id + "/topics"
          });

        } else { // Add existing topic to question.
          var topic = self.typeAheadTopics.findWhere({title: title});

          self.topics.add(topic);
          topic.save({}, {
            url: "questions/" + self.model.id + "/topics/" + topic.id,
          });
        }
      }
    });

    return this;
  },

  eventRemoveTopic: function(event) {
    event.preventDefault();

    var id = $(event.currentTarget).data('id');
    var topic = this.topics.get(id);

    this.topics.remove(topic);
    this.model.save();
  }

});
