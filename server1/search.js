const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const searchResult = document.getElementById('searchResult');

searchBtn.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        try {
            const response = await fetch(`https://yourDomainName2.wyz/api/definitions?word=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            if (response.ok) {
                searchResult.textContent = `${data.word}: ${data.definition}`;
            } else {
                searchResult.textContent = data.message;
            }
        } catch (error) {
            console.error('Error:', error);
            searchResult.textContent = 'An error occurred. Please try again.';
        }
    } else {
        searchResult.textContent = 'Please enter a word to search for.';
    }
});
