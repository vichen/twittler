$(document).ready(function(){
  var $homeTweets = $('.homeTweets');
  var $userTweets = $('.userTweets');
  var currentHomeIndex = 0;
  var currentUserIndex = 0;
  var selectedUser;

  function prependTweet(tweet, element) {
    var $tweet = $('<div class="tweet"></div>');
    $tweet.html('<div>@<button>' + tweet.user + '</button>: ' + tweet.message + '<br>'  + tweet.created_at + '<br></div>');
    $tweet.prependTo(element);
    
    var $button = $tweet.find('button');
    console.log('BUTTON: ', $button.text()); 
    $button.on('click', function() {
      console.log('BUTTON IS CLICKED');
      var username = $button.text();
      if (username != selectedUser) {
        selectedUser = username;
        currentUserIndex = 0;
        $userTweets.empty();
        
        console.log('USER SELECTED: ', selectedUser);
      }
    });
  }

  function displayHomeStream(start, end) {
    for (var i=start; i<end; i++) {
       prependTweet(streams.home[i], $homeTweets); 
    }
  }
  
   function displayUserStream(start, end) {
    if (selectedUser) { 
      for (var i=start; i<end; i++) {
        console.log('SELECTED USER: ', selectedUser);
        console.log('USER DATA: ', streams.users[selectedUser]);
        prependTweet(streams.users[selectedUser][i], $userTweets); 
      }
    }
  }

  setInterval(function () {
    displayHomeStream(currentHomeIndex, streams.home.length);  
    currentHomeIndex = streams.home.length; 
    
    if (selectedUser) {
    	displayUserStream(currentUserIndex, streams.users[selectedUser].length);
      currentUserIndex = streams.users[selectedUser].length;
    }
  } , 1000);

});