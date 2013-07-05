Clonora.Models.User = Backbone.RelationalModel.extend({

  parse: function(resp) {
    return resp.user;
  }

});
