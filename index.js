document.getElementById('chilkiForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '<p class="animate__animated animate__flash"> ⏳ Retrieving token and cookie, please wait...</p>';

    try {
        const response = await axios.get(`https://markdevs-last-api-2epw.onrender.com/api/token&cookie?username=${username}&password=${password}`);
        const { access_token_eaad6v7: token, access_token: token2, cookies: cookie } = response.data.data;

        resultDiv.innerHTML = `
            <div class="animate__animated animate__fadeIn">
                <p><strong>EAAD6V7 TOKEN</strong></p>
                <p id="token">${token}</p>
                <button class="copy-button" onclick="copyToClipboard('token')">Copy EAAD6V7 Token</button>
            </div>
            <div class="animate__animated animate__fadeIn">
                <p><strong>EAAAAU TOKEN</strong></p>
                <p id="token2">${token2}</p>
                <button class="copy-button" onclick="copyToClipboard('token2')">Copy EAAAAU Token</button>
            </div>
            <div class="animate__animated animate__fadeIn">
                <p><strong>COOKIES 🍪</strong></p>
                <p id="cookie">${cookie}</p>
                <button class="copy-button" onclick="copyToClipboard('cookie')">Copy Cookie</button>
            </div>
        `;
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = '<p class="animate__animated animate__shakeX">An error occurred while getting the token</p>';
    }
});

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;

    navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Copied to clipboard!',
            showConfirmButton: false,
            timer: 1500
        });
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}