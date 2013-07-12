Inquisit.Models.User = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'questions',
    relatedModel: "Inquisit.Models.Question",
    includeInJSON: false
  }, {
    type: Backbone.HasMany,
    key: 'answers',
    relatedModel: "Inquisit.Models.Answer",
    includeInJSON: false
  }],

  parse: function(resp) {
    return resp.user;
  },

  urlRoot: "/users",

  modelName: 'user'

});
