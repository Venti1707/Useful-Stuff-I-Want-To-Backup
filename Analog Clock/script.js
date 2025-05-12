function updateTime() {
    let currentTime = new Date();
    let hours = String(currentTime.getHours()).padStart(2, '0');
    let minutes = String(currentTime.getMinutes()).padStart(2, '0');
    let seconds = String(currentTime.getSeconds()).padStart(2, '0');
    let formattedTime = `${hours}:${minutes}:${seconds}`;
    document.getElementById('current-time').textContent = `Current time: ${formattedTime}`;
}

setInterval(updateTime, 1000); // Update time every 1000ms (1 second)

const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');

function updateClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDegrees = ((seconds / 60) * 360);
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds/60)*6);
    const hourDegrees = ((hours / 12) * 360) + ((minutes/60)*30);

    secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;
}

// Run every second
setInterval(updateClock, 1000);

// Initialize clock immediately
updateClock();
