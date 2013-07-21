Inquisit.Routers.Questions = Inquisit.Routers.Base.extend({

  routes: {
    "": "questionsIndex",
    "questions": "questionsIndex",
    "questions/new": "questionsNew",
    "questions/:id": "questionsShow",
    "topics/:topic_id/questions/new": "questionsNew",
  },

  questionsIndex: function() {
    var that = this;
    var questions = new Inquisit.Collections.Questions();

    questions.fetch({
      success: function(questions) {
        var view = new Inquisit.Views.QuestionsIndex({
          questions: questions
        });
        that._swapView(view);
      }
    });
  },

  questionsNew: function(topic_id) {
    var question = new Inquisit.Models.Question()

    if (topic_id) {
      var topic = Inquisit.Models.Topic.findOrCreate({id: topic_id})
      question.get('topics').add(topic)
    }

    var view = new Inquisit.Views.QuestionsNew({
      question: question
    });
    this._swapView(view);
  },

  questionsShow: function(id) {
    var question = Inquisit.Models.Question.findOrCreate({id: id});
    this._show(Inquisit.Views.QuestionsShow, question);
  }

});
