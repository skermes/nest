var grid = null;
var template = null;

function fork_msg(msg) {
  var text = msg.children(".content").first().val();
  var newmsg = template.clone();
  newmsg.children(".content").first().val(text);
  newmsg.children(".fork").on("click", function(event) {
    fork_msg(newmsg);
  });
  newmsg.children(".content").on("keyup", function(event) {
    update_msg(newmsg);
  });
  newmsg.removeClass("template");
  update_msg(newmsg);
  grid.append(newmsg);
}

function new_msg() {
  var newmsg = template.clone();
  newmsg.removeClass("template");
  newmsg.children(".fork").on("click", function(event) {
    fork_msg(newmsg);
  });
  newmsg.children(".content").on("keyup", function(event) {
    update_msg(newmsg);
  });
  grid.append(newmsg);
}

function update_msg(msg) {
  var msgtext = msg.children(".content").first().val();
  msg.children(".chars_left").text(140 - msgtext.length);
}

$(document).ready(function () {
  grid = $("#msg_grid");
  template = $(".msg.template");

  $("#new_msg").on("click", function(event) {
    new_msg();
  });
});

