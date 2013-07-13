Inquisit.Views.TopicsShow = Backbone.View.extend({

  template: JST['topics/show'],

  initialize: function(params) {
    _.extend(this, params);
    this.subViews = _([]);
  },

  render: function() {
    this._removeSubViews()

    var renderedContent = this.template({
      model: this.model
    });
    this.$el.html(renderedContent);

    var that = this;
    _([
      ['div#title', Inquisit.Views.SubViews.Title, {model: this.model, attribute: 'title'}],
      ['div#details', Inquisit.Views.SubViews.Details, {model: this.model, attribute: 'details'}],
      ['div#questions-list', Inquisit.Views.QuestionsIndex, {
        questions: this.model.get('questions')
      }]
    ]).each(function(subViewParams) {
      that._addSubView.apply(that, subViewParams)
    });

    return this;
  },

  close: function() {
    this._removeSubViews();
  },

  _removeSubViews: function() {
    this.subViews.each(function(subView) {
      subView.remove();
    })
  },

  _addSubView: function(cssSelector, View, binding) {
    var $el = this.$el.find(cssSelector);
    view = new View(binding);
    $el.html(view.render().$el);

    this.subViews.push(view);
    return view;
  }
});
