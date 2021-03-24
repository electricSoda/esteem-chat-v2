var name = prompt('What would you like to be called?')
var socket = io.connect("localhost:3002");

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
var chatmsg = document.getElementsByTagName("LI");

var sessionID = '';

socket.on('connect', data => {
    const sessionIDlul = socket.id;
    console.log(sessionIDlul);
    sessionID = sessionIDlul;
});

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
    socket.emit('bailed', {name: name, sID: sessionID});
    window.open('http://www.essaytyper.com/', "_self");
});

dced.addEventListener('click', function() {
    socket.emit('disconnected', {name: name, sID: sessionID});
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
        item.innerHTML = "<strong style='color:dodgerBlue'  >" + data.name + '</strong>: ' + data.msg;
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

socket.on('fdc', function(data) {
    var item = document.createElement("li");
    item.innerHTML = "<em><strong>" + data + "</strong>" + " has been force kicked from the server. L</em>"
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('frc', function(data) {
    socket.emit("fdc", name);
    socket.disconnect();
    alert("You have been force removed from this chat server.");
});


// commands
socket.on("rainbow-troll", function(data) {
    let now = -1;
    let colors = [
       "#e87d7d",
       "#e88a7d",
       "#e8977d",
       "#e8a47d",
       "#e8b07d",
       "#e8bd7d",
       "#e8ca7d",
       "#e8d77d",
       "#e8e47d",
       "#dfe87d",
       "#d3e87d",
       "#c6e87d",
       "#b9e87d",
       "#ace87d",
       "#9fe87d",
       "#92e87d",
       "#86e87d",
       "#7de881",
       "#7de88e",
       "#7de89b",
       "#7de8a8",
       "#7de8b5",
       "#7de8c1",
       "#7de8ce",
       "#7de8db",
       "#7de8e8",
       "#7ddbe8",
       "#7dcee8",
       "#7dc1e8",
       "#7db5e8",
       "#7da8e8",
       "#7d9be8",
       "#7d8ee8",
       "#7d81e8",
       "#867de8",
       "#927de8",
       "#9f7de8",
       "#ac7de8",
       "#b97de8",
       "#c67de8",
       "#d37de8",   
       "#df7de8",
       "#e87de4",
       "#e87dd7",
       "#e87dca",
       "#e87dbd",
       "#e87db0",
       "#e87da4",
       "#e87d97",
       "#e87d8a",
       "#e87d7d"
    ]
    
    var i;
    
    setInterval(function() {
        now++;
        if (now>= colors.length) { now=0; } 
        for (i=0; i<chatmsg.length; i++) {
            chatmsg[i].style.color = colors[now]; 
        }
    }, 150);
});

socket.on("hack-troll", function(data) {
    console.log(data, name)
    socket.emit("disconnected", {name:name, clients: data});
    self.location = "hack.html";
});

socket.on("whisper", function(data) {
    var item = document.createElement("li");
    item.innerHTML = "<em><strong>The server whispers to you: </strong>" + data + "</em>"
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
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


