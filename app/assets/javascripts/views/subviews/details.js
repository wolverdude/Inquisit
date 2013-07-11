Inquisit.Views.SubViews.Details = Inquisit.Views.ShowEditSubView.extend({

  showTemplate: JST['subviews/details_show'],
  editTemplate: JST['subviews/details_edit'],

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
    this.model.save($form.serializeJSON(), {
      success: function() {
        that.renderShow();
      },
      wait: true
    });
  }

});
