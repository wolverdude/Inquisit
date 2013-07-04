Clonora.Models.Question = Backbone.Model.extend({

  parse: function(resp) {
    var parsed_resp = _.clone(resp.question);
    parsed_resp.answers = new Clonora.Collections.Answers(
      parsed_resp.answers, {parse: true}
    );
    return parsed_resp;
  }

});
