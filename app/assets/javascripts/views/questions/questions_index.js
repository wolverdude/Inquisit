Clonora.Views.QuestionsIndex = Backbone.View.extend({

  template: JST['questions/index'],

  tagName: 'ul',

  initialize: function(params) {
    _.extend(this, params);
    this.$el.addClass('unstyled')
  },

  render: function() {
    this.$el.empty();

    var that = this;
    this.questions.each(function(question) {
      view = new Clonora.Views.QuestionsBlurb({
        question: question
      });

      that.$el.append(view.render().$el);
    });

    return this
  }

});
