Clonora.Views.QuestionsShow.Topics = Clonora.Views.ShowEditSubView.extend({

  showTemplate: JST['questions/show/topics_show'],
  editTemplate: JST['questions/show/topics_edit'],

  events: {
    "click a.btn-edit": "eventEdit",
    "click button.cancel": "eventShow",
    "submit form": "eventAddTopic",
    "click a.remove-topic": "eventRemoveTopic",
  },

  initialize: function(binding) {
    this.binding = binding;
    this.question = binding.question;
    this.topics = binding.question.get('topics');
  },

  eventAddTopic: function(event) {
    event.preventDefault();
    var topicParams = $(event.target).serializeJSON();

    if (this.topics.findWhere(topicParams.topic)) {
      this.renderEdit();
      return;
    }

    var store = Backbone.Relational.store.getCollection(Clonora.Models.Topic);
    var topic = store.findWhere(topicParams.topic);

    var that = this;
    var options = {
      urlRoot: "questions/" + this.question.id + "/topics",
      wait: true,
      success: function(topic) {
        that.topics.add(topic);
        that.renderEdit();
      }
    }

    topic || (topic = new Clonora.Models.Topic(topicParams));
    topic.save({}, options);
  },

  eventRemoveTopic: function(event) {
    event.preventDefault();
    var id = $(event.target).data('id');

    var that = this;
    var topic = this.topics.get(id);
    this.topics.remove(topic);
    this.question.save({}, {
      wait: true,
      success: function() {
        that.renderEdit();
      }
    });
  }

});
