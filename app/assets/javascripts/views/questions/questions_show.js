Inquisit.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  events: {
    "submit form#new-answer": "newAnswer"
  },

  initialize: function(question) {
    this.question = question
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
      ['div#topics', Inquisit.Views.SubViews.Topics, {attribute: 'topics'}],
      ['div#title', Inquisit.Views.SubViews.Title, {attribute: 'title'}],
      ['div#details', Inquisit.Views.SubViews.Details, {attribute: 'details'}]
    ]).each(function(subViewParams) {
      that._addSubView.apply(that, subViewParams)
    });

    var $answerList = this.$el.find('ul#answers-list');
    this.question.get('answers').each(function(answer) {
      var answerView = new Inquisit.Views.AnswersShow({
        answer: answer
      });

      that.subViews.push(answerView);
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
    });
  },

  _addSubView: function(cssSelector, View, binding) {
    var $el = this.$el.find(cssSelector);
    view = new View(_.extend({model: this.question}, binding));
    $el.html(view.renderShow().$el);

    this.subViews.push(view);
    return view;
  }
});

Inquisit.Views.QuestionsShow.prototype.stopListening = function() {
  Backbone.View.prototype.stopListening.apply(this, arguments);

  if (arguments.length === 0) {
    this.subViews.each(function(subView) {
      subView.stopListening();
    });
  }
}


