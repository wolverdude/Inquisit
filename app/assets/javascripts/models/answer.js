Inquisit.Models.Answer = Backbone.RelationalModel.extend({

  urlRoot: "/answers",

  parse: function(resp) {
    return resp.answer;
  },

  modelName: 'answer'

});
