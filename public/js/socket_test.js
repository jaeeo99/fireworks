/**
 * Created by EunSeokOh on 2016. 10. 13..
 */
$(function() {
    var FADE_TIME = 150; // ms
    var TYPING_TIMER_LENGTH = 400; // ms
    var COLORS = [
        '#e21400', '#91580f', '#f8a700', '#f78b00',
        '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
        '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
    ];

    // Initialize variables
    var $window = $(window);
    var $usernameInput = $('.usernameInput'); // Input for username
    var $inputMessage = $('.inputMessage'); // Input message input box

    var $loginPage = $('.login.page'); // The login page
    var $chatPage = $('.chat.page'); // The chatroom page

    // Prompt for setting a username
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();

    var socket = io();

    // Sets the client's username
    function setUsername () {
        username = $usernameInput.val().trim();
        $("#username_field").html(username);
        // If the username is valid
        if (username) {
            $loginPage.fadeOut();
            $chatPage.show();
            $loginPage.off('click');
            $currentInput = $inputMessage.focus();

            // Tell the server your username
            socket.emit('login', { uid: username });
            $('#view').attr('src', "/");
        }
    }

    // 서버측에서 socket.send(msg); 한것을 받아 살행
    socket.on('message', function (msg) {
        console.log(msg);
        if(msg == "reload"){
            location.reload();
        }else{
            $('#view').attr('src', "/"+msg);
        }
    });

    // Sends a chat message
    function sendMessage () {
        var message = $inputMessage.val();
        // Prevent markup from being injected into the message
        var senddata = message.split("|");
        var targetid = senddata[0];
        message = senddata[1];
        // if there is a non-empty message and a socket connection
        if (message) {
            $inputMessage.val('');

            // tell server to execute 'new message' and send along one parameter

            socket.emit('controll special user', { uid: targetid, msg:message });
        }
    }

    $window.keydown(function (event) {
        // Auto-focus the current input when a key is typed
        if (!(event.ctrlKey || event.metaKey || event.altKey)) {
            $currentInput.focus();
        }
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            console.log(username)
            if (username) {
                sendMessage();
            } else {
                setUsername();
            }
        }
    });

});