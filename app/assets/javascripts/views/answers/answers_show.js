Inquisit.Views.AnswersShow = Backbone.View.extend({

  template: JST['answers/show'],

  tagName: 'li',

  initialize: function(params) {
    _.extend(this, params);
    this.listenTo(this.answer, "change", this.render);
  },

  events: {
    "click a.upvote": "upvote",
    "click a.downvote": "downvote",
    "click a.unvote": "unvote"
  },

  render: function() {
    var user = this.answer.get('user')
    var renderedContent = this.template({
      answer: this.answer,
      user: user,
      isCurrentUser: (user === Inquisit.currentUser)
    });

    this.$el.addClass("row-fluid").html(renderedContent);
    return this;
  },

  upvote: function(event) {
    event.preventDefault();
    this._vote(event, 1)
  },

  downvote: function(event) {
    event.preventDefault();
    this._vote(event, -1)
  },

  unvote: function(event) {
    event.preventDefault();
    this._vote(event, 0, "DELETE")
  },

  _vote: function(event, newVote, requestType) {
    this._recountVote(newVote)

    var that = this;
    $.ajax({
      type: (requestType || "Post"),
      url: $(event.currentTarget).attr('href'),
      success: that.answer.fetch.bind(that.answer),
      error: that.answer.fetch.bind(that.answer)
    });
  },

  _recountVote: function(newVote) {
    var oldVote = this.answer.get('current_user_vote');
    var oldTally = this.answer.get('vote_tally');
    var newTally = oldTally - oldVote + newVote
    this.answer.set({vote_tally: newTally, current_user_vote: newVote})
  }

});
