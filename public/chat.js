var name = prompt('What would you like to be called?')
var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var typemessages = document.getElementById('usertyping');
var bail = document.getElementById('bail');
var dced = document.getElementById('dis');
var typemessages = document.getElementById('typemessages');
var main = document.getElementById('main');
var play = document.getElementById('play');
var link = document.getElementById('link');
var chat-msg = document.getElementByTagName("li");

//other variables
var colors=["red"]

input.addEventListener('input', function() {
    socket.emit('type', name);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat', { name: name, msg: input.value});
        socket.emit('stoptype', name);
        input.value = '';
    }
});

link.addEventListener('click', function() {
    link = prompt('Paste link here (remember to put it in this format-"https://url.end/"):');
    socket.emit('link', {name: name, linker: link});
});

main.addEventListener('click', function() {
    socket.emit('disconnected', name);
});

play.addEventListener('click', function() {
    alert('hey dawg');
});

bail.addEventListener('click', function() {
    socket.emit('bailed', name);
    window.open('http://www.essaytyper.com/', "_self");
});

dced.addEventListener('click', function() {
    socket.emit('disconnected', name);
    socket.disconnect();
    alert('You have now disconnected from the server, kindly exit out of this tab.')
});

socket.on('bailed', function(data) {
    var item = document.createElement('li');
    item.innerHTML = "<em><strong>" + data + '</strong> has bailed from the chat room. R.I.P. </em>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

var icon = "https://www.iconsdb.com/icons/preview/black/message-2-xxl.png";

socket.on('chat', function(data) {
    if (document.hasFocus()) {
        var item = document.createElement('li');
        item.innerHTML = "<strong style='color:dodgerBlue'>" + data.name + '</strong>: ' + data.msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        if (Notification.permission=='granted') {
            var item = document.createElement('li');
            item.innerHTML = "<strong style='color:dodgerBlue'>" + data.name + '</strong>: ' + data.msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
            var msg = data.msg;
            var notification = new Notification(data.name, { msg, icon });
        } else {
            Notification.requestPermission().then(function (permission) {
                console.log(permission);
            });
        }
    }
});

socket.on('connected', function(data) {
    var item = document.createElement('li');
    item.innerHTML = '<em>' + data + '</em>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('welcome', function(data) {
    var item = document.createElement('li');
    item.innerHTML = '<center><strong><em>' + data + '</em></strong></center>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('num', function(data) {
    var item = document.createElement('li');
    item.innerHTML = '<em>We now have <strong>' + data + '</strong> clients connected.</em>';
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

});

socket.on('disconnected', function(data) {
    var item1 = document.createElement('li');
    item1.innerHTML = '<em>Client: <strong>' + data.name + '</strong> has disconnected from the server.</em>'
    var item2 = document.createElement('li');
    item2.innerHTML = '<em>We now have <strong>' + data.clients + '</strong> clients connected.</em>';
    messages.appendChild(item1);
    messages.appendChild(item2);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('type', function(data) {
    typemessages.innerHTML='<em>  ' + data + '<em>';
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('stoptype', function(data) {
    typemessages.innerHTML='  ';
    window.scrollTo(0, document.body.scrollHeight)
});

socket.on('link', function(data) {
    var item = document.createElement('li');
    item.innerHTML="<strong style='color:dodgerBlue' id='linke'>" + data.name + '</strong>: ' + "<a href='" + data.linker + "'>" + data.linker + '</a>'
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});


socket.on("rainbow-troll", function(data) {
    chatmsg.classList.add('rainbow');
});


//link
$('#linke').click(function() {
    alert('clicke')
    socket.emit('disconnected', name);
});

//dropdown menu
$('#jeffreylul').click(function() {
    if ($('#je').is(':hidden')) {
        $('#je').show();
    } else {
        $('#je').hide();
    }
});

//jquery
$(document).click(function(event) { 
    var $target = $(event.target);
    if(!$target.closest('#drop-container').length && 
    $('#je').is(":visible")) {
        $('#je').hide();
    }            
});



//modal box
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("how");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


