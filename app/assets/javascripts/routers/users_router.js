Inquisit.Routers.Users = Backbone.Router.extend({

  routes: {
   "users/:id": "show"
  },

  initialize: function(params) {
    _.extend(this, params);
  },

  show: function(id) {
    var user = Inquisit.Models.User.findOrCreate({id: id});

    var that = this
    user.fetch({
      success: function(user) {
        var view = new Inquisit.Views.UsersShow(user);
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
