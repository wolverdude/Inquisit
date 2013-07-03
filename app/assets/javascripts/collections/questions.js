Clonora.Collections.Questions = Backbone.Collection.extend({

  model: Clonora.Models.Question,

  url: "/questions",

  parse: function(resp) {
    debugger
    var parsed_resp = _.clone(resp);
    parsed_resp.answers = new Clonora.Collections.Answers(resp.answers);
    return parsed_resp;
  }

});
