Clonora.Models.Topic = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasMany,
    key: 'questions',
    relatedModel: Clonora.Models.Question,
    collectionType: Clonora.Collections.Questions,
    includeInJSON: false,
    parse: true
  }],

  urlRoot: "/topics"

});
