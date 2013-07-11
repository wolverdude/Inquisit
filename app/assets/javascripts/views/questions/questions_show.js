Inquisit.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  events: {
    "submit form#new-answer": "newAnswer"
  },

  initialize: function(params) {
    _.extend(this, params);
    this.listenTo(this.question.get('answers'), 'add', this.render);
    this.listenTo(this.question.get('answers'), 'remove', this.render);
    this.subViews = _([]);
  },

  render: function() {
    var that = this;
    this._removeSubViews()

    var renderedContent = this.template({
      currentUser: Inquisit.currentUser,
      question: this.question
    });

    this.$el.html(renderedContent);

    _([
      ['div#topics', Inquisit.Views.SubViews.Topics],
      ['div#title', Inquisit.Views.SubViews.Title],
      ['div#details', Inquisit.Views.SubViews.Details]
    ]).each(function(subViewParams) {
      that._addSubView.apply(that, subViewParams)
    });

    var $answerList = this.$el.find('ul#answers-list');
    this.question.get('answers').each(function(answer) {
      var answerView = new Inquisit.Views.AnswersShow({
        answer: answer
      });

      $answerList.append(answerView.render().$el);
    });

    return this;
  },

  newAnswer: function(event) {
    event.preventDefault();
    var $form = $(event.target)

    this.question.get('answers').create(
      $form.serializeJSON().answer,
      {url: $form.attr('action'), wait: true}
    );
  },

  close: function() {
    this._removeSubViews();
  },

  _removeSubViews: function() {
    this.subViews.each(function(subView) {
      subView.remove();
    })
  },

  _addSubView: function(cssSelector, View, binding) {
    var $el = this.$el.find(cssSelector);
    view = new View({model: this.question});
    $el.html(view.renderShow().$el);

    this.subViews.push(view);
    return view;
  }
});