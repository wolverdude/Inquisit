Clonora.Models.Answer = Backbone.Model.extend({

  parse: function(resp) {
    var parsed_resp = _.clone(resp.answer);
    parsed_resp.user = new Clonora.Models.User(
      parsed_resp.user, {parse: true});
    return parsed_resp;
  }

});
