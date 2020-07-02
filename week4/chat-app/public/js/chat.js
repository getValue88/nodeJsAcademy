const socket = io();

//ELEMENTS
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
const $sidebar = document.querySelector('#sidebar');

//TEMPLATES
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

//OPTIONS
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

let private = false;
let to = '';

//FUNCTIONS
const autoscroll = () => {
    // new message element
    const $newMessage = $messages.lastElementChild

    // height of the new message
    const newMessageMargin = parseInt(getComputedStyle($newMessage).marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

    //visible height
    const visibleHeight = $messages.offsetHeight;

    //height of messages container
    const containerHeight = $messages.scrollHeight;

    //current scroll position
    const scrollOffset = $messages.scrollTop + visibleHeight;

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight;
    }
};

//IO

// events emit
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});

$messageForm.addEventListener('submit', e => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

    //send private message
    if (private) {
        return socket.emit('privateMessage', {
            to,
            message: $messageFormInput.value

        }, (err) => {
            $messageFormButton.removeAttribute('disabled');
            $messageFormInput.value = '';
            $messageFormInput.focus();

            if (err) {
                return console.log(err);
            }
            console.log('message delivered');
            document.querySelector(`[data-userid="${to}"]`).style.fontWeight = 'normal';
            private = false;
            to = '';
        });
    }

    //send public message
    socket.emit('sendMessage', $messageFormInput.value, (err) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (err) {
            return console.log(err);
        }
        console.log('message delivered');
    });
});

$sendLocationButton.addEventListener('click', e => {
    if (!navigator.geolocation) {
        return alert('no location support');
    }

    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((pos) => {
        const { coords } = pos;
        socket.emit('sendLocation', {
            latitude: coords.latitude,
            longitude: coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled');
            console.log('Location shared!');
        });
    });
});


// events listen
socket.on('message', msg => {
    const html = Mustache.render(messageTemplate, {
        username: msg.username,
        msg: msg.text,
        createdAt: moment(msg.createdAt).format('HH:mm')
    });

    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('privateMessage', msg => {
    const html = Mustache.render(messageTemplate, {
        class: 'privateMsg',
        username: msg.username,
        msg: msg.text,
        createdAt: moment(msg.createdAt).format('HH:mm')
    });

    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('locationMessage', payload => {
    const html = Mustache.render(locationTemplate, {
        username: payload.username,
        url: payload.url,
        createdAt: moment(payload.createdAt).format('HH:mm')
    });

    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
});

socket.on('roomData', ({ room, users }) => {
    //render user list
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });

    $sidebar.innerHTML = html;

    //click event to each user on list
    const $usersLiArray = $sidebar.querySelectorAll('ul li');
    $usersLiArray.forEach(li => {
        li.addEventListener('click', () => {
            //unselect user
            if (li.style.fontWeight == 'bold') {
                li.style.fontWeight = 'normal';
                to = '';
                return private = false;
            }

            //select user
            $usersLiArray.forEach(el => el.style.fontWeight = 'normal');
            li.style.fontWeight = 'bold';
            private = true;
            to = li.dataset.userid;
        });
    })
});
