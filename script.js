document.getElementById('reactionForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const access_token = document.getElementById('access_token').value;
    const post_link = document.getElementById('post_link').value;
    const reaction_type = document.getElementById('reaction_type').value;
    
    const url = `https://fbapi-production.up.railway.app/reaction?token=${access_token}&post=${post_link}&react=${reaction_type}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const message = data.success ? 'Reaction sent successfully!' : 'Failed to send reaction.';
            document.getElementById('responseMessage').innerText = message;
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText = 'Error occurred while sending reaction.';
            console.error('Error:', error);
        });
});