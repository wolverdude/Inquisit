Clonora.Views.QuestionsShow.Details = Clonora.Views.ShowEditSubView.extend({

  showTemplate: JST['questions/show/details_show'],
  editTemplate: JST['questions/show/details_edit'],

  events: {
    "click a.btn-edit": "eventEdit",
    "click button.cancel": "eventShow",
    "submit form": "eventSubmit",
  },

  initialize: function(binding) {
    _.extend(this, binding);
    this.binding = binding;
  },

  eventSubmit: function(event) {
    event.preventDefault();
    var $form = $(event.target);

    var that = this;
    this.question.save($form.serializeJSON(), {
      success: function() {
        that.renderShow();
      },
      wait: true
    });
  }

});
