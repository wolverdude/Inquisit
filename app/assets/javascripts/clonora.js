window.Clonora = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // get bootstrapped data
    var $currentUserEl = $('script#bootstrap-current-user');
    var $questionsEl = $('script#bootstrap-questions');

    var currentUserData = JSON.parse($currentUserEl.html());
    var questionsData = JSON.parse($questionsEl.html());

    $currentUserEl.remove();
    $questionsEl.remove();

    Clonora.currentUser = new Clonora.Models.User(
      currentUserData, {parse: true}
    );
    Clonora.questions = new Clonora.Collections.Questions(
      questionsData, {parse: true}
    );

    // include csrf token with every AJAX call
    var csrfToken = $('meta[name=csrf-token]').attr('content')
    $(document).ajaxSend(function(event, xhr, options) {
      if (options.type !== "GET") {
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
      }
    });

    // start router
    Clonora.questionsRouter = new Clonora.Routers.Questions({
      $el: $('#content')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Clonora.initialize();
});
