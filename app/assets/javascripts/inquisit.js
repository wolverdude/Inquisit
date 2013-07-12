window.Inquisit = {
  Models: {},
  Collections: {},
  Views: {SubViews: {}},
  Routers: {},
  initialize: function() {
    // get bootstrapped data
    var $currentUserEl = $('script#bootstrap-current-user');
    var currentUserData = JSON.parse($currentUserEl.html());
    $currentUserEl.remove();

    Inquisit.currentUser = new Inquisit.Models.User(
      currentUserData, {parse: true}
    );

    // include csrf token with every AJAX call
    var csrfToken = $('meta[name=csrf-token]').attr('content')
    $(document).ajaxSend(function(event, xhr, options) {
      if (options.type !== "GET") {
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
      }
    });

    // start routers
    Inquisit.routers = _(Inquisit.Routers).map(function(Router) {
      return new Router({ $el: $('#content') });
    });
    Backbone.history.start();
  },

  showSiteMessage: function(cssSelector, timeout) {
    var $el = $(cssSelector);
    $el.collapse('show');

    if (timeout) {
      window.setTimeout(function() {
        $el.collapse('hide');
      }, timeout);
    }
  }
};
