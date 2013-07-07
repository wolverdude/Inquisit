Clonora.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  events: {
    "submit form#new-answer": "newAnswer"
  },

  initialize: function(params) {
    _.extend(this, params);
    this.listenTo(this.question.get('answers'), 'all', this.render);
  },

  render: function() {
    var that = this;

    var renderedContent = this.template({
      currentUser: Clonora.currentUser,
      question: this.question
    });

    this.$el.html(renderedContent);

    _([
      ['div#topics', Clonora.Views.QuestionsShow.Topics],
      ['div#title', Clonora.Views.QuestionsShow.Title],
      ['div#details', Clonora.Views.QuestionsShow.Details]
    ]).each(function(subViewParams) {
      that._addSubView.apply(that, subViewParams)
    });

    var $answerList = this.$el.find('ul#answers-list');
    this.question.get('answers').each(function(answer) {
      var answerView = new Clonora.Views.AnswersShow({
        answer: answer
      });

      $answerList.append(answerView.render().$el);
    });

    return this;
  },

  close: function() {
    this.subViews.each(function(subView) {
      subView.remove();
    })
  },

  newAnswer: function(event) {
    event.preventDefault();
    var $form = $(event.target)

    this.question.get('answers').create(
      $form.serializeJSON().answer,
      {url: $form.attr('action'), wait: true}
    );
  },

  _addSubView: function(cssSelector, View) {
    this.subViews || ( this.subViews = _([]) )

    var $el = this.$el.find(cssSelector);
    view = new View({question: this.question});
    $el.html(view.renderShow().$el);

    this.subViews.push(view)
    return view;
  }
});