const socket = io();

//ELEMENTS
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

//TEMPLATES
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

//OPTIONS
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

//IO
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});

socket.on('message', msg => {
    const html = Mustache.render(messageTemplate, {
        msg: msg.text,
        createdAt: moment(msg.createdAt).format('HH:mm')
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', payload => {
    const html = Mustache.render(locationTemplate, {
        url: payload.url,
        createdAt: moment(payload.createdAt).format('HH:mm')
    });

    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', e => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

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