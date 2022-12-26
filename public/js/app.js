console.log('Client side Js');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTow = document.querySelector('#message-two');


const fetchWeather = (address = "!") => {
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return;
            }
            messageOne.textContent = data.location;
            messageTow.textContent = data.forecast;
        })
    });
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    messageOne.textContent = 'Loading...';
    messageTow.textContent = '';
    fetchWeather(address);
});