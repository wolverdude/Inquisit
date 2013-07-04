Clonora.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  events: {
    "submit form#answer-form": "answerNew"
  },

  initialize: function(params) {
    _.extend(this, params);
    this.listenTo(this.question.get('answers'), 'all', this.render);
  },

  render: function() {
    var renderedContent = this.template({
      question: this.question
    });

    this.$el.html(renderedContent);
    return this;
  },

  answerNew: function(event) {
    event.preventDefault();
    var $form = $(event.target)

    this.question.get('answers').create(
      $form.serializeJSON().answer,
      {url: $form.attr('action'), wait: true}
    );
  }

});