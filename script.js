particlesJS("particles-js", {
    particles: {
        number: { value: 100 },
        size: { value: 3 },
        move: { speed: 2 },
        color: { value: "#4CAF50" },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#4CAF50",
            opacity: 0.4,
            width: 1
        }
    }
});

function showPayment(productName) {
    const paymentInfo = document.getElementById('payment-info');
    paymentInfo.style.display = 'block';
    paymentInfo.innerHTML = `
        <strong>${productName}</strong><br>
        Mode of Payment:<br>
        GCASH: 09525303053 L.C <br>
        <div class="owner-info">
            Send your receipt to <a href="https://www.facebook.com/10007486208460">Maiko </a>
        </div>
    `;
}

function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const now = new Date();
    const options = { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedTime = now.toLocaleTimeString('en-US', options);

    const hour = now.getHours();
    let greeting;
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 18) greeting = "Good afternoon!";
    else greeting = "Good evening!";

    greetingElement.innerHTML = `${greeting} ${formattedTime} (GMT +8)`;
}

setInterval(updateGreeting, 1000);