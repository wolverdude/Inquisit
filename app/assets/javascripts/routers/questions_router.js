Clonora.Routers.Questions = Backbone.Router.extend({

  routes: {
    "": "index",
    "index": "index",
    "questions/new": "new",
    "questions/:cid": "show"
  },

  initialize: function(params) {
    _.extend(this, params);
  },

  index: function() {
    var view = new Clonora.Views.QuestionsIndex({
      questions: Clonora.questions
    });
    this._swapView(view);
  },

  new: function() {
    var view = new Clonora.Views.QuestionsNew()
    this._swapView(view);
  },

  show: function(cid) {
    var that = this
    var question = Clonora.questions.get(cid);

    question.fetch({
      success: function() {
        var view = new Clonora.Views.QuestionsShow({
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
