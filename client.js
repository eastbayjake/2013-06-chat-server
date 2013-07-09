function display (username, userchat, timestamp) {
  $table = $('<li><table></table></li>');
  $row = $('<tr></tr>');
  $user = $('<a href="#" class="user">' + username + '</a>');
  $chat = $('<td></td>');
  $chat.text(': ' + userchat + ' ');
  $time = $('<td></td>');
  $time.text('       - ' + moment().startOf(timestamp).fromNow());
  $row.append($user, $chat, $time);
  $table.append($row);
  $('ul').append($table);
}


function fetch () {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8080/classes/room1",
    data: {},
    success: function(data) {
      console.log(typeof data[0]);
      // for (i = 0; i < 20; i++) {
        // var user = server.results[i].username;
        // var text = server.results[i].text;
        // var time = server.results[i].createdAt;
      // }
    }
  });
}

function send (username, message) {
  var sendMessage = {
    'username': username,
    'text': message
  };

  $.ajax({
    Origin: "Tuhin's Computer, duh",
    Method: "POST",
    url: "http://127.0.0.1:8080/classes/room1",
    data: JSON.stringify(sendMessage), // Actual data, needs to be a JSON STRING!
    // dataType: "json", // What we're expecting
    contentType: "text/plain", // What we're sending
    success: function(data) {
    }
  });
}

// Get messages, then get messages every 3 seconds

fetch();

setInterval(function(){
  fetch();
}, 3000);

//jQuery for chat interactive functions
$(document).ready(function(){
  $('#send').click(function(event){
    var draftMessage = document.getElementById('message').value;
    username = document.getElementById('username').value;
    send(username, draftMessage);
    $('#message').val("");
    console.log(event);
  });

  $('#username').click(function(){
    $('#username').val("");
  });

  $('#send').keydown(function(e){
    if (e.keyCode === 13) {
      var draftMessage = document.getElementById('message').value;
      username = document.getElementById('username').value;
      send(username, draftMessage);
    }
  });

  $('.user').click(function(event){
    console.log(event);
    console.log('...friending...');
    friends.push(username);
    $(username).addClass('friend');
  });

});