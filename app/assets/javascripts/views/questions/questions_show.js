Clonora.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  events: {
    "submit form#new-answer": "answerNew"
  },

  initialize: function(params) {
    _.extend(this, params);
    this.listenTo(this.question.get('answers'), 'all', this.render);
  },

  render: function() {
    var renderedContent = this.template({
      currentUser: Clonora.currentUser,
      question: this.question
    });

    this.$el.html(renderedContent);

    var $answerList = this.$el.find('ul#answer-list')

    this.question.get('answers').each(function(answer) {
      var view = new Clonora.Views.AnswersShow({
        answer: answer
      });

      $answerList.append(view.render().$el)
    });

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