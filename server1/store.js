const form = document.getElementById('create-form');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const word = formData.get('word');
    const definition = formData.get('definition');

    try {
        const response = await fetch('https://yourDomainName2.wyz/api/definitions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word, definition })
        });
        const data = await response.json();
        messageDiv.textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again.';
    }
});
