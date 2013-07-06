Clonora.Views.QuestionsShow.Title = Backbone.View.extend({

  showTemplate: JST['questions/show/title_show'],
  editTemplate: JST['questions/show/title_edit'],

  initialize: function(params) {
    _.extend(this, params);
  },

  renderShow: function() {
    return this._render(this.showTemplate);
  },

  renderEdit: function() {
    return this._render(this.editTemplate);
  },

  _render: function(template) {
    renderedContent = template({question: this.question});

    this.$el.html(renderedContent);
    return this;
  }

});