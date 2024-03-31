/**@type {Element} */
const searchBar = document.querySelector('#inputclick');

function setupSearchBar() {
  const searchInput = document.querySelector('.search-input');;
  const searchButton = document.querySelector('.search-button');;
  // Add an event listener to the search input element
  searchInput.addEventListener('input', async (event) => {

    // define user input as searchTerm.
    let searchTerm = event.target.value.trim();

    // Convert all lowercase letters to uppercase, in case user types lower case.
    searchTerm = searchTerm.toUpperCase();

    // Replace hyphens with spacesm, in case user put hypens between building and room number.
    searchTerm = searchTerm.replace(/-/g, ' ');

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
      // fix the suggestion box width to the wide of input box and search button.
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

// Function to log user search history into firestore
function logSearchHistory(userId, searchTerm) {
  try {
    const userRef = db.collection('users').doc(userId);

    // Update user document as an array with new search history
    userRef.update({
      search_history: firebase.firestore.FieldValue.arrayUnion({
        term: searchTerm
      })
    });

    console.log('Search history logged successfully.');
  } catch (error) {
    console.error('Error logging search history:', error);
  }
}

// to use these function in other js
export { searchBar, setupSearchBar, logSearchHistory };

// export variable to other js to avoid duplication
export const searchButton = document.querySelector('.search-button');
export const searchInput = document.querySelector('.search-input');