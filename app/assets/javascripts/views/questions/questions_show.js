Clonora.Views.QuestionsShow = Backbone.View.extend({

  template: JST['questions/show'],

  tagName: 'ul',

  initialize: function(params) {
    _.extend(this, params)
  },

  render: function() {
    renderedContent = this.template({
      question: this.question
    });

    this.$el.html(renderedContent);
    return this;
  }

});