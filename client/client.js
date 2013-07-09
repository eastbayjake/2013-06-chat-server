function display (username, userchat) {
  $table = $('<li><table></table></li>');
  $row = $('<tr></tr>');
  $user = $('<a href="#" class="user">' + username + '</a>');
  $chat = $('<td></td>');
  $chat.text(': ' + userchat + ' ');
  $row.append($user, $chat);
  $table.append($row);
  $('ul').append($table);
}


function fetch () {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8080/classes/room1",
    data: {},
    success: function(data) {
      data = JSON.parse(data);
      $('ul').empty();
      for (var i = 0; i < data.length; i++) {
        display(data[i].username, data[i].message);
      }
    }
  });
}

function send (username, message) {
  var sendMessage = {
    'username': username,
    'message': message
  };

  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8080/classes/room1",
    data: JSON.stringify(sendMessage), // Actual data, needs to be a JSON STRING!
    // dataType: "json", // What we're expecting
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

});