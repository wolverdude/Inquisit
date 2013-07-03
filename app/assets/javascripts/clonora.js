window.Clonora = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    $dataEl = $('#bootstrap');
    var data = JSON.parse($dataEl.html());
    $dataEl.remove();

    Clonora.user = data.user;
    Clonora.questions = new Clonora.Collections.Questions(data.questions);
    new Clonora.Routers.Questions({
      $el: $('#content')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Clonora.initialize();
});