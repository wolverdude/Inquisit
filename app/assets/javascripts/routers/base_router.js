Inquisit.Routers.Base = Backbone.Router.extend({

  initialize: function(params) {
    _.extend(this, params);
  },

  _show: function(View, model) {
    var that = this

    model.fetch({
      success: function(model) {
        var view = new View(model);
        that._swapView(view);
      }
    });
  },

  _stopListening: function() {
    if (Inquisit.currentView) Inquisit.currentView.stopListening();
  },

  _swapView: function(newView) {
    this.$el.html(newView.render().$el);

    if (Inquisit.currentView) Inquisit.currentView.remove();
    Inquisit.currentView = newView;
  }

});
