Clonora.Models.Answer = Backbone.Model.extend({

  urlRoot: "/answers",

  parse: function(resp) {
    var parsedResp = _.clone(resp.answer);
    parsedResp.user = new Clonora.Models.User(
      parsedResp.user, {parse: true});
    return parsedResp;
  }

});
