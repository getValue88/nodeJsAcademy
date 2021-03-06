const weather = address => {
    const msgOne = document.getElementById('msg-one');
    const msgTwo = document.getElementById('msg-two');

    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch(`/weather?address=${address}`)
        .then(response => response.json()
            .then(data => {
                if (data.err) {
                    msgOne.textContent = data.err;

                } else {
                    msgOne.textContent = data.location;
                    msgTwo.textContent = data.forecast;
                }
            })
        );
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    const location = document.querySelector('input').value;
    weather(location);
});

document.querySelector('#geolocation-btn').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your browser doesn\'t support geolocation');
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
        weather(`${coords.longitude},${coords.latitude}`);
    });
});