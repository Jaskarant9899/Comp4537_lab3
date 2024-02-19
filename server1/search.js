// ChatGPT was used in this lab
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const searchResult = document.getElementById('searchResult');

searchBtn.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
        try {
            const response = await fetch(`https://server2-z0bf78k7f-pavanpreet-brars-projects.vercel.app/api/definitions?word=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();
            if (response.ok) {
                searchResult.textContent = `${data.word}: ${data.definition}`;
            } else {
                searchResult.textContent = data.message;
            }
        } catch (error) {
            console.error('Error:', error);
            searchResult.textContent = UIStrings.errorOccurred;
        }
    } else {
        searchResult.textContent = UIStrings.enterWordToSearch;
    }
});
