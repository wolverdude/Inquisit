Inquisit.Views.QuestionsNew = Backbone.View.extend({

  template: JST["questions/new"],

  events: {
    "submit form#new-question": "submit"
  },

  initialize: function(params) {
    _.extend(this, params)
  },

  render: function() {
    var renderedContent = this.template({
      model: this.question
    });
    this.$el.html(renderedContent);

    this.$topicsEditEl = this.$el.find("#question_topics");

    this.topicsEditView && this.topicsEditView.remove();
    this.topicsEditView = new Inquisit.Views.SubViews.TopicsEdit({
      model: this.question
    });

    this.$topicsEditEl.html(this.topicsEditView.render().$el);

    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var $form = $("form#new-question");

    this.question.save($form.serializeJSON().question, {
      wait: true,
      success: function(question) {
        Backbone.history.navigate("#/questions/" + question.id);
      },
      error: function(model, xhr) {
        $('#site-alert').html(xhr.responseJSON);
        Inquisit.showSiteMessage("#collapse-alert");
      }
    });
  },

  close: function() {
    this.topicsEditView.remove();
  }

});