Clonora.Routers.Questions = Backbone.Router.extend({

  routes: {
    "": "index",
    "index": "index",
    "questions/:id": "show"
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

  show: function(cid) {
    var question = Clonora.questions.get(cid);
    var view = new Clonora.Views.QuestionsShow({question: question});
    this._swapView(view);
  },

  _swapView: function(newView) {
    if (this.currentView) this.currentView.remove();
    this.currentView = newView;
    this.$el.html(this.currentView.render().$el);
  }

});
