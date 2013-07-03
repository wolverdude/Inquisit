Clonora.Models.Question = Backbone.Model.extend({

  parse: function(resp) {
    debugger
    var parsed_resp = _.clone(resp);
    parsed_resp.answers = new Clonora.Collections.Answers(resp.answers);
    return parsed_resp;
  }

});
