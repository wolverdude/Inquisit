Clonora.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  events: {
    "click a#edit-topics": "editTopics",

    "click a#edit-title": "editTitle",
    "click #title button.cancel": "showTitle",
    "submit #title form": "submitTitle",

    "clidk a#edit-descirption": "editDescription",

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

    var $topics = this.$el.find('div#topic-list');

     var $title = this.$el.find('div#title');
    this.titleView = new Clonora.Views.QuestionsShow.Title({
      question: this.question
    });
    $title.html(this.titleView.renderShow().$el)

    var $description = this.$el.find('div#description');

    var $answerList = this.$el.find('ul#answer-list');
    this.question.get('answers').each(function(answer) {
      var questionView = new Clonora.Views.AnswersShow({
        answer: answer
      });

      $answerList.append(questionView.render().$el);
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
  },

  showTitle: function(event) {
    event.preventDefault();
    this.titleView.renderShow();
  },

  editTitle: function(event) {
    event.preventDefault();
    this.titleView.renderEdit();
  },

  submitTitle: function(event) {
    event.preventDefault();
    var $form = $(event.target);

    var that = this;
    this.question.save($form.serializeJSON(), {
      success: function() {
        that.titleView.renderShow();
      },
      wait: true
    });
  }

});