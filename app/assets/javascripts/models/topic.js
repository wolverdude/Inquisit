Inquisit.Models.Topic = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'questions',
    relatedModel: Inquisit.Models.Question,
    collectionType: Inquisit.Collections.Questions,
    includeInJSON: false,
    parse: true
  }],

  urlRoot: "/topics",

  parse: function(resp) {
    return resp.topic
  },

  modelName: 'topic'

});
