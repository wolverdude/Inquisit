Clonora.Views.ShowEditSubView = Backbone.View.extend({

  showTemplate: function() { throw new Error("show template not given") },
  showTemplate: function() { throw new Error("edit template not given") },

  initialize: function(binding) {
    _.extend(this, binding)
    this.binding = binding;
  },

  renderShow: function() {
    return this._render(this.showTemplate);
  },

  renderEdit: function() {
    return this._render(this.editTemplate);
  },

  eventShow: function(event) {
    event.preventDefault();
    this.renderShow();
  },

  eventEdit: function(event) {
    event.preventDefault();
    this.renderEdit();
  },

  _render: function(template) {
    renderedContent = template(this.binding);

    this.$el.html(renderedContent);
    return this;
  }

});
