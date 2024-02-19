document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('create-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const word = form.word.value.trim();
        const definition = form.definition.value.trim();

        if (!word || !definition) {
            messageDiv.textContent = UIStrings.bothRequired;
            return;
        }

        try {
            const response = await fetch('https://server2-z0bf78k7f-pavanpreet-brars-projects.vercel.app/api/definitions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word, definition })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            messageDiv.textContent = data.message;
        } catch (error) {
            console.error('Error:', error);
            messageDiv.textContent = UIStrings.errorOccurred;
        }
    });
});
