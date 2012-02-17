var grid = null;
var template = null;

function init_msg() {
  var newmsg = template.clone();
  newmsg.children(".fork").on("click", function(event) {
    fork_msg(newmsg);
    event.preventDefault();
  });
  newmsg.children(".content").on("keyup", function(event) {
    update_msg(newmsg);
    event.preventDefault();
  });
  newmsg.draggable({ revert: "invalid" });
  newmsg.droppable({
    activeClass: "dragging",
    hoverClass: "drag_onto",
    drop: drop_msg
  });
  newmsg.removeClass("template");
  return newmsg;
}

function fork_msg(msg) {
  var text = msg.children(".content").first().val();
  var newmsg = init_msg();
  newmsg.children(".content").first().val(text);
  update_msg(newmsg);
  var replaced = msg.nextAll(".msg.placeholder").first();
  replaced.before(newmsg);
  grid.append(replaced);
}

function new_msg() {
  var newmsg = init_msg();
  var replaced = $(".msg.placeholder").first();
  replaced.before(newmsg);
  grid.append(replaced);
}

function update_msg(msg) {
  var msgtext = msg.children(".content").first().val();
  msg.children(".chars_left").text(140 - msgtext.length);
  msg.children(".tweet").prop("href", "https://twitter.com/share?text=" + encodeURIComponent(msgtext) + "&url=''");
}

function drop_msg(event, ui) {
  var nextmsg = $(this).next();
  if (nextmsg.hasClass("ui-draggable-dragging")) {
    nextmsg = $(this);
  }
  ui.draggable.after($(this));
  nextmsg.before(ui.draggable);
  ui.draggable.css("left", "");
  ui.draggable.css("top", "");
}

$(document).ready(function () {
  grid = $("#msg_grid");
  template = $(".msg.template");

  $("#new_msg").on("click", function(event) {
    new_msg();
  });

  $(".msg.placeholder").droppable({
    hoverClass: "drag_onto",
    drop: drop_msg
  });
});

