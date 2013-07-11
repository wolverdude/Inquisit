Inquisit.Models.Question = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'topics',
    relatedModel: "Inquisit.Models.Topic",
    collectionType: Inquisit.Collections.Topics,
    includeInJSON: 'id',
    keyDestination: 'topic_ids',
    parse: true
  },{
    type: Backbone.HasMany,
    key: 'answers',
    relatedModel: "Inquisit.Models.Answer",
    collectionType: Inquisit.Collections.Answers,
    includeInJSON: false,
    parse: true,
    reverseRelation: {
      key: 'question',
      includeInJSON: false
    }
  },{
    type: Backbone.HasOne,
    key: 'asker',
    relatedModel: "Inquisit.Models.User",
    includeInJSON: false,
    parse: true,
  }],

  urlRoot: "/questions",

  parse: function(resp) {
    return resp.question;
  },

  modelName: 'question'

});
