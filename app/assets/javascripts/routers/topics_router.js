Inquisit.Routers.Topics = Inquisit.Routers.Base.extend({

  routes: {
    "topics/:id": "topicsShow",
  },

  topicsShow: function(id) {
    this._stopListening();
    var topic = Inquisit.Models.Topic.findOrCreate({id: id});
    this._show(Inquisit.Views.TopicsShow, topic);
  }

});
