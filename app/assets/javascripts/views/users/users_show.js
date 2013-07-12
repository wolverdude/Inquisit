Inquisit.Views.UsersShow = Backbone.View.extend({

  template: JST['users/show'],

  initialize: function(model) {
    this.model = model;
  },

  render: function() {
    renderedContent = this.template({
      model: this.model,
      isCurrentUser: (this.model === Inquisit.currentUser)
    });

    this.$el.html(renderedContent);
    return this;
  }

});
