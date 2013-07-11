Inquisit.Routers.Topics = Backbone.Router.extend({

  routes: {
   "topics/:id": "show"
  },

  initialize: function(params) {
    _.extend(this, params);
  },

  show: function(id) {
    var that = this
    var topic = Inquisit.Models.Topic.findOrCreate({id: id});

    topic.fetch({
      success: function() {
        var view = new Inquisit.Views.TopicsShow({
          model: topic
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
