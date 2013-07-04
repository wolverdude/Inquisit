Clonora.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  events: {
    "submit form#answer-form": "answerNew"
  },

  initialize: function(params) {
    _.extend(this, params);
  },

  render: function() {
    renderedContent = this.template({
      question: this.question
    });

    this.$el.html(renderedContent);
    return this;
  },

  answerNew: function(event) {
    event.preventDefault();
    var $form = $(event.target)

    var answer = new Clonora.Models.Answer($form.serializeJSON().answer);
    answer.save({url: $form.attr('action')})
  }

});