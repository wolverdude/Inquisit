window.Clonora = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // get bootstrapped data
    $dataEl = $('#bootstrap');
    var data = JSON.parse($dataEl.html());
    $dataEl.remove();

    // include csrf token with every AJAX call
    var csrfToken = $('meta[name=csrf-token]').attr('content')
    $(document).ajaxSend(function(event, xhr, options) {
      console.log(xhr);
    });

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
