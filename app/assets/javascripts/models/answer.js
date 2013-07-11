Inquisit.Models.Answer = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasOne,
    key: 'user',
    relatedModel: "Inquisit.Models.User",
    includeInJSON: false
  }],

  urlRoot: "/answers",

  parse: function(resp) {
    return resp.answer;
  },

  modelName: 'answer'

});
