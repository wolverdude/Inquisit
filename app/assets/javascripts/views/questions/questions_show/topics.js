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
    var topicData = $(event.target).serializeJSON();

    if (this.topics.findWhere(topicData.topic)) {
      this.renderEdit();
      return;
    }

    var that = this;
    $.ajax({
      type: "POST",
      url: "questions/" + this.question.id + "/topics",
      data: topicData,
      wait: true,
      success: function(fetchedTopicData) {
        var topic = Clonora.Models.Topic.findOrCreate(
          fetchedTopicData,
          {parse: true}
        );
        that.topics.add(topic);
        that.renderEdit();
      }
    });
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
