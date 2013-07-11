window.Inquisit = {
  Models: {},
  Collections: {},
  Views: {Shared: {}},
  Routers: {},
  initialize: function() {
    // get bootstrapped data
    var $currentUserEl = $('script#bootstrap-current-user');
    var $questionsEl = $('script#bootstrap-questions');

    var currentUserData = JSON.parse($currentUserEl.html());
    var questionsData = JSON.parse($questionsEl.html());

    $currentUserEl.remove();
    $questionsEl.remove();

    Inquisit.currentUser = new Inquisit.Models.User(
      currentUserData, {parse: true}
    );
    Inquisit.questions = new Inquisit.Collections.Questions(
      questionsData, {parse: true}
    );

    // include csrf token with every AJAX call
    var csrfToken = $('meta[name=csrf-token]').attr('content')
    $(document).ajaxSend(function(event, xhr, options) {
      if (options.type !== "GET") {
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
      }
    });

    // start routers
    Inquisit.questionsRouter = new Inquisit.Routers.Questions({
      $el: $('#content')
    });
    Inquisit.topicsRouter = new Inquisit.Routers.Topics({
      $el: $('#content')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Inquisit.initialize();
});
