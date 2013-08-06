Inquisit.Models.User = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'questions',
    relatedModel: "Inquisit.Models.Question",
    includeInJSON: false,
    parse: true
  }, {
    type: Backbone.HasMany,
    key: 'answers',
    relatedModel: "Inquisit.Models.Answer",
    includeInJSON: false,
    parse: true,
    reverseRelation: {
      key: 'user',
      includeInJSON: false
    }

  }],

  parse: function(resp) {
    return resp.user;
  },

  urlRoot: "/users",

  modelName: 'user'

});
