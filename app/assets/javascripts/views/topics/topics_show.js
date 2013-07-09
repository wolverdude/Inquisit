Clonora.Views.TopicsShow = Backbone.View.extend({

  template: JST['topics/show'],

  initialize: function(params) {
    _.extend(this, params);
  },

  render: function() {
    var renderedContent = this.template({
      model: this.model
    });
    this.$el.html(renderedContent);

    var that = this;
    _([
      ['div#title', Clonora.Views.Shared.Title, {model: this.model}],
      ['div#details', Clonora.Views.Shared.Details, {model: this.model}],
      ['div#questions-list', Clonora.Views.QuestionsIndex, {
        questions: this.model.get('questions')
      }]
    ]).each(function(subViewParams) {
      that._addSubView.apply(that, subViewParams)
    });

    return this;
  },

  close: function() {
    this.subViews.each(function(subView) {
      subView.remove();
    })
  },

  _addSubView: function(cssSelector, View, binding) {
    this.subViews || ( this.subViews = _([]) )

    var $el = this.$el.find(cssSelector);
    view = new View(binding);
    $el.html(view.render().$el);

    this.subViews.push(view)
    return view;
  }
});
