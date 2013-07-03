Clonora.Views.QuestionsBlurb = Backbone.View.extend({

  template: JST['questions/blurb'],

  tagName: 'li',

  initialize: function(params) {
    _.extend(this, params);
  },

  render: function() {
    renderedContent = this.template({
      question: this.question
    });

    this.$el.html(renderedContent);
    return this
  }

});
