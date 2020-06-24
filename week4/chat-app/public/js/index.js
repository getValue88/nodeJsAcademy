const socket = io();

const $roomSelectContainer = document.querySelector('#room-select-container');

const roomsSelectTemplate = document.querySelector('#active-rooms-template').innerHTML;

socket.emit('getRooms');

socket.on('sendRooms', rooms => {
    if (rooms.length > 0) {
        const html = Mustache.render(roomsSelectTemplate, { rooms });

        $roomSelectContainer.insertAdjacentHTML('beforeend', html);

        const $roomSelect = document.querySelector('#rooms-select');
        $roomSelect.addEventListener('change', () => {
            document.querySelector('#room-input').value = $roomSelect.value;
        });
    }
})