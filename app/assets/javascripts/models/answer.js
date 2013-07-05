Clonora.Models.Answer = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasOne,
    key: 'user',
    relatedModel: "Clonora.Models.User",
    includeInJSON: false
  }],

  urlRoot: "/answers",

  parse: function(resp) {
    console.log(resp)
    return resp.answer;
  }

});
