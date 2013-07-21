Inquisit.Routers.Users = Inquisit.Routers.Base.extend({

  routes: {
    "users/:id": "usersShow"
  },

  usersShow: function(id) {
    var user = Inquisit.Models.User.findOrCreate({id: id});
    this._show(Inquisit.Views.UsersShow, user);
  }

});
