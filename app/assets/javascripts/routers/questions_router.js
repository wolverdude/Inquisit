Inquisit.Routers.Questions = Backbone.Router.extend({

  routes: {
    "": "index",
    "index": "index",
    "questions/new": "new",
    "questions/:id": "show"
  },

  initialize: function(params) {
    _.extend(this, params);
  },

  index: function() {
    var that = this;
    var questions = new Inquisit.Collections.Questions();

    questions.fetch({
      success: function(questions) {
        var view = new Inquisit.Views.QuestionsIndex({
          questions: questions
        });
        that._swapView(view);
      }
    });
  },

  new: function() {
    var view = new Inquisit.Views.QuestionsNew()
    this._swapView(view);
  },

  show: function(id) {
    var that = this
    var question = Inquisit.Models.Question.findOrCreate({id: id});

    question.fetch({
      success: function() {
        var view = new Inquisit.Views.QuestionsShow({
          question: question
        });
        that._swapView(view);
      }
    });
  },

  _swapView: function(newView) {
    if (this.currentView) this.currentView.remove();
    this.currentView = newView;
    this.$el.html(this.currentView.render().$el);
  }

});
