Clonora.Views.QuestionsNew = Backbone.View.extend({

  template: JST["questions/new"],

  events: {
    "submit form#new-question": "submit"
  },

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var $form = $("form#new-question");

    this.question = Clonora.questions.create(
      $form.serializeJSON().question, {
        wait: true,
        success: function() {
          Backbone.history.navigate("#/")
        }
      }
    );
  }

});