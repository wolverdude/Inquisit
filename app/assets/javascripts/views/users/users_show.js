Inquisit.Views.UsersShow = Backbone.View.extend({

  template: JST['users/show'],

  initialize: function(model) {
    this.model = model;
    this.subViews = _([]);
  },

  render: function() {
    this._removeSubViews();

    renderedContent = this.template({
      model: this.model,
      isCurrentUser: (this.model === Inquisit.currentUser)
    });

    this.$el.html(renderedContent);

    this._addSubView('#name', Inquisit.Views.SubViews.Title, {
      attribute: 'name'
    });
    this._addSubView('#bio', Inquisit.Views.SubViews.Title, {
      attribute: 'bio'
    });

    debugger
    var $questionsList = this.$el.find('#questions-list');
    var $answersList = this.$el.find('#answers-list');
    var that = this;

    this.model.get('questions').each(function(question) {
      questionView = new Inquisit.Views.QuestionsBlurb({
        question: question
      });

      that.subViews.push(questionView);
      $questionsList.append(questionView.render().$el);
    });

    this.model.get('answers').each(function(answer) {
      var answerView = new Inquisit.Views.AnswersShow({
        answer: answer
      });

      that.subViews.push(answerView);
      $answersList.append(answerView.render().$el);
    });

    return this;
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
    view = new View(_.extend({model: this.model}, binding));
    $el.html(view.renderShow().$el);

    this.subViews.push(view);
    return view;
  }

});
