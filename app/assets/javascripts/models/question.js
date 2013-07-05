Clonora.Models.Question = Backbone.RelationalModel.extend({

  relations: [{
    type: Backbone.HasMany,
    key: 'topics',
    relatedModel: "Clonora.Models.Topic",
    collectionType: Clonora.Collections.Topics,
    includeInJSON: 'id',
    parse: true
  },{
    type: Backbone.HasMany,
    key: 'answers',
    relatedModel: "Clonora.Models.Answer",
    collectionType: Clonora.Collections.Answers,
    includeInJSON: false,
    parse: true,
    reverseRelation: {
      key: 'question',
      includeInJSON: false
    }
  },{
    type: Backbone.HasOne,
    key: 'asker',
    relatedModel: "Clonora.Models.User",
    includeInJSON: false,
    parse: true,
  }],

  urlRoot: "/questions",

  parse: function(resp) {
    return resp.question;
  }


});
