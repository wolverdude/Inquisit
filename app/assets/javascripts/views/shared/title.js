Clonora.Views.Shared.Title = Clonora.Views.ShowEditSubView.extend({

  showTemplate: JST['shared/title_show'],
  editTemplate: JST['shared/title_edit'],

  events: {
    "click a.btn-edit": "eventEdit",
    "click button.cancel": "eventShow",
    "submit form": "eventSubmit",
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
