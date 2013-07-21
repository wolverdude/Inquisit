Inquisit.Routers.Topics = Inquisit.Routers.Base.extend({

  routes: {
    "topics/:id": "topicsShow",
  },

  topicsShow: function(id) {
    var topic = Inquisit.Models.Topic.findOrCreate({id: id}, {silent: true});
    this._show(Inquisit.Views.TopicsShow, topic);
  }

});
