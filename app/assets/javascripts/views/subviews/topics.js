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
    var typeaheadTopics = new Inquisit.Collections.Topics()
    var self = this;

    this._render(this.editTemplate);

    // Unbind any old typeahead.
    this.$typaheadEl && this.$typeaheadEl.unbind();

    // Bind typeahead functionality.
    this.$typeaheadEl = this.$el.find("#topic_title");
    this.$el.find("#topic_title").typeahead({
      minLength: 2,

      // Get topics from server matching what has been typed in so far.
      source: function(term, process) {
        typeaheadTopics.fetch({

          url: "/topics",
          data: {term: term, question_id: self.model.id},
          reset: true,

          success: function(topics) {
            var matchList = topics.map(function(topic) {
              return topic.get('title');
            });

            var termInMatchList = _(matchList).any(function(topicTitle) {
              return (topicTitle === term);
            });

            var termInQuestionTopics = self.topics.any(function(topic) {
              return (topic.get('title') === term);
            });

            // Add option to create new topic.
            if (!termInMatchList && !termInQuestionTopics) {
              if (matchList.length === 8) { matchList.pop() }
              matchList.push('Create Topic: "' + term + '"');
            }

            process(matchList);
          }
        });
      },

      sorter: function(matchList) {
        return matchList;
      },

      // Add topic to list when selected
      updater: function(title) {
        var newTopic = /^Create Topic: "(.*)"$/.exec(title);

        if (newTopic) { // Create a new topic on the server & add to question.
          self.topics.create({title: newTopic[1]}, {
            url: "questions/" + self.model.id + "/topics"
          });

        } else { // Add existing topic to question.
          var topic = typeaheadTopics.findWhere({title: title});

          self.topics.add(topic);
          topic.save({}, {
            url: "questions/" + self.model.id + "/topics/" + topic.id,
          });
        }
      }
    });

    return this;
  },

  close: function() {
    // unbind typahead
    this.$typeaheadEl && this.$typaheadEl.unbind();
  },

  eventRemoveTopic: function(event) {
    event.preventDefault();

    var id = $(event.currentTarget).data('id');
    var topic = this.topics.get(id);

    this.topics.remove(topic);
    this.model.save();
  }

});
