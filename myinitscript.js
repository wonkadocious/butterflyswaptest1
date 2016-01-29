var friendCache = {
  me: {},
  reRequests: {},
  permissions: {}
};
var CONFIRM_YES = 1, CONFIRM_NO = 0;

  
 Parse.initialize("J0e4fgwPAWyVCzkzh8sXjohiipMrDFB2vNJA61jP", "PyQEYnrj4oursxq9I1FCLZZWT7L51qgTwqA2yKdT");

  window.fbAsyncInit = function() {

 Parse.FacebookUtils.init({
// FB.init({
    appId      : '811953658913005',
    cookie     : true,  // enable cookies to allow the server to access the session
    xfbml      : true,  // parse social plugins on this page
    frictionlessRequests: true,
    version    : 'v2.5' 
  });

function onLogin(response) {
  if (response.status == 'connected') {
 	displayWelcome();
  };
}

FB.getLoginStatus(function(response) {
  // Check login status on load, and if the user is
  // already logged in, go directly to the welcome message.
  if (response.status == 'connected') {
    onLogin(response);
  } else {
    // Otherwise, show Login dialog first.
    FB.login(function(response) {
      onLogin(response);
    }, {scope: 'user_friends, email'});
  }
});

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function displayWelcome() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: 'id,name,first_name,picture.width(120).height(120)'},function(response) {
      friendCache.me = response;
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Welcome to Wonkadocious, ' + friendCache.me.first_name + ' id: ' + friendCache.me.id;
      document.getElementById('upic').src =friendCache.me.picture.data.url;
    });
  }

  function reRequest(scope,callback) {
    FB.login(callback, { scope: scope, auth_type:'rerequest'});
  }


function getPermissions(callback) {
  FB.api('/me/permissions', function(response){
    if( !response.error ) {
      friendCache.permissions = response.data;
      callback();
    } else {
      console.error('/me/permissions', response);
    }
  });
}

function hasPermission(permission) {
  for( var i in friendCache.permissions ) {
    if( 
      friendCache.permissions[i].permission == permission 
      && friendCache.permissions[i].status == 'granted' ) 
      return true;
  }
  return false;
}

