Inquisit.Views.AnswersShow = Backbone.View.extend({

  template: JST['answers/show'],

  tagName: 'li',

  initialize: function(params) {
    _.extend(this, params);
    this.listenTo(this.answer, "change", this.render);
  },

  events: {
    "click a.upvote": "vote",
    "click a.downvote": "vote",
    "click a.unvote": "unvote"
  },

  render: function() {
    renderedContent = this.template({
      answer: this.answer,
      user: this.answer.get('user')
    });

    this.$el.addClass("row-fluid").html(renderedContent);
    return this;
  },

  vote: function(event) {
    event.preventDefault();
    var that = this;

    $.ajax({
      type: "POST",
      url: $(event.currentTarget).attr('href'),
      success: that.answer.fetch.bind(that.answer)
    });
  },

  unvote: function(event) {
    event.preventDefault();
    var that = this;

    $.ajax({
      type: "DELETE",
      url: $(event.currentTarget).attr('href'),
      success: that.answer.fetch.bind(that.answer)
    });
  }

});
