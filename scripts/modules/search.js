/**@type {Element} */
const searchBar = document.querySelector('#inputclick');

function setupSearchBar() {
  const searchInput = document.querySelector('.search-input');;
  const searchButton = document.querySelector('.search-button');;
  // Add an event listener to the search input element
  searchInput.addEventListener('input', async (event) => {

    const searchTerm = event.target.value.trim();
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    if (searchTerm.length == 0) {
      suggestionsList.style.display = 'none'; // Hide suggestions if search term is empty
      return; // No suggestions for empty input
    }

    try {
      const querySnapshot = await db.collection('classrooms')
        .where('name', '>=', searchTerm)
        .where('name', '<=', searchTerm + '\uf8ff')
        .orderBy('name')
        .limit(5)
        .get();
      if (querySnapshot.size == 0) {
        suggestionsList.style.display = 'none'; // Hide suggestions if no results found
        return;
      }

      // Position the suggestions list under the search input field
      const inputRect = searchInput.getBoundingClientRect();
      const inputGroupWidth = searchInput.offsetWidth + searchButton.offsetWidth;
      suggestionsList.style.position = 'absolute';
      suggestionsList.style.top = `${inputRect.bottom}px`;
      suggestionsList.style.left = `${inputRect.left}px`;
      suggestionsList.style.width = `${inputGroupWidth}px`;


      // Populate the suggestions list with the retrieved suggestions
      // console.log("Snapshot is " + querySnapshot.size);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        const suggestion = doc.data().name;
        if (suggestionsList.innerHTML.includes(suggestion)) {
          return;
        }
        const suggestionItem = document.createElement('li');
        suggestionItem.classList.add('dropdown-item');
        suggestionItem.textContent = suggestion;
        suggestionItem.addEventListener('click', () => {
          searchInput.value = suggestion;
          suggestionsList.style.display = 'none'; // Hide suggestions after selection
          // Perform additional actions (e.g., fetching data based on the selected suggestion)
        });
        suggestionsList.appendChild(suggestionItem);
      });
      // console.log(suggestionsList.innerHTML);

      // Display the suggestions list
      suggestionsList.style.display = 'block';
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  });
}

export { searchBar, setupSearchBar };