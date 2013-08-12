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
    this.binding = binding; // Passed to the template on render.
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

    // Unbind any old typeahead to prevent memory leaks.
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
            // Setup list for typeahead
            var matchList = topics.map(function(topic) {
              return topic.get('title');
            });

            // Add option to create new topic if doesn't already exist.
            var termInMatchList = _(matchList).any(function(topicTitle) {
              return (topicTitle === term);
            });

            var termInQuestionTopics = self.topics.any(function(topic) {
              return (topic.get('title') === term);
            });

            if (!termInMatchList && !termInQuestionTopics) {
              if (matchList.length === 8) { matchList.pop() }
              matchList.push('Create Topic: "' + term + '"');
            }

            process(matchList);
          }
        });
      },

      // override default typeahead sort method.
      sorter: function(matchList) {
        return matchList;
      },

      // Add topic to question when selected.
      updater: function(title) {
        var newTopic = /^Create Topic: "(.*)"$/.exec(title);

        if (newTopic) { // Create a new topic on the server.
          var topic = self.topics.create({title: newTopic[1]});

        } else { // Add existing topic to question.
          var topic = typeaheadTopics.findWhere({title: title});
          self.topics.add(topic);
        }

        self.model.save(); // Update related topics.
        topic.get('questions').add(self.model); // Add to inverse relation.
      }
    });

    return this;
  },

  close: function() {
    // Unbind typahead to prevent memory leaks.
    this.$typeaheadEl && this.$typaheadEl.unbind();
  },

  eventRemoveTopic: function(event) {
    event.preventDefault();

    var id = $(event.currentTarget).data('id');
    var topic = this.topics.get(id);

    this.topics.remove(topic);
    this.model.save(); // Update related topics.
  }

});
