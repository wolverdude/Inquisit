Clonora.Models.Question = Backbone.Model.extend({

  urlRoot: "/questions",

  parse: function(resp) {
    var parsedResp = _.clone(resp.question);
    parsedResp.answers = new Clonora.Collections.Answers(
      parsedResp.answers, {parse: true}
    );
    return parsedResp;
  }

});
