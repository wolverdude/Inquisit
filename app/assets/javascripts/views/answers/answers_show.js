Clonora.Views.AnswersShow = Backbone.View.extend({

  template: JST['answers/show'],

  tagName: 'li',

  initialize: function(params) {
    _.extend(this, params);
  },

  render: function() {
    renderedContent = this.template({
      answer: this.answer,
      user: this.answer.get('user')
    });

    this.$el.addClass("row-fluid").html(renderedContent);
    return this
  }

});
