/**@type {Element} */
const searchBar = document.querySelector('#inputclick');

function setupSearchBar() {
  const searchInput = document.querySelector('.search-input');;
  const searchButton = document.querySelector('.search-button');;
  const suggestionsList = document.getElementById('suggestionsList');

  // Add an event listener to the search input element
  searchInput.addEventListener('input', async (event) => {

    // define user input as searchTerm.
    let searchTerm = event.target.value.trim();

    // Convert all lowercase letters to uppercase, in case user types lower case.
    searchTerm = searchTerm.toUpperCase();

    // Replace hyphens with spacesm, in case user put hypens between building and room number.
    searchTerm = searchTerm.replace(/-/g, ' ');

    suggestionsList.innerHTML = ''; // Clear previous suggestions

    try {

      let recentSearches = []; // Declare recentSearches variable outside conditional block

      // Fetch recent searches only if the search term is not empty
      recentSearches = await fetchRecentSearches();

      // Display recent searches
      displaySuggestions(recentSearches, 'search-history');

      if (searchTerm.length > 0) {

        // Filter out suggestions that are already in the recent search history
        recentSearches = recentSearches.filter(suggestion => suggestion.toUpperCase().includes(searchTerm));

      }

      const querySnapshot = await db.collection('classrooms')
        .where('name', '>=', searchTerm)
        .where('name', '<=', searchTerm + '\uf8ff')
        .orderBy('name')
        .limit(5)
        .get();
      if (querySnapshot.size == 0) {
        // Hide suggestions if no results found
        suggestionsList.style.display = 'none';
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

      suggestionsList.style.display = 'block';

      // Populate the suggestions list with the retrieved suggestions
      querySnapshot.forEach((doc, index) => {
        if (index >= 5) {
          return; // Break out of the loop if maximum suggestions reached
        } else {
          const suggestion = doc.data().name;
          // Check if the suggestion is not already in recent searches
          if (!recentSearches.includes(suggestion)) {
            const suggestionType = isSearchHistory(suggestion, recentSearches) ? 'search-history' : 'database-suggestions';
            displaySuggestion(suggestion, suggestionType);
          }
        }
      });

      // Hide suggestions if no results found
      if (querySnapshot.size == 0) {
        suggestionsList.style.display = 'none';
      }

    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  });
}


// Function to fetch recent searches from Firestore
async function fetchRecentSearches(limit = 5) {
  try {
    // Make a query to fetch recent search history for the current user
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      const userDoc = await db.collection('users').doc(userId).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData.search_history) {
          // Retrieve only the 5 latest of search history entries
          return userData.search_history.slice(0, limit).map(entry => entry.term);
        }
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching recent searches:', error);
    return [];
  }
}

// Check if the suggestion exists in the recent search history
function isSearchHistory(suggestion, recentSearches) {
  return recentSearches.includes(suggestion);
}

// Function to display a single suggestion
function displaySuggestion(suggestion, suggestionType) {
  const suggestionItem = document.createElement('li');
  suggestionItem.classList.add('dropdown-item');
  // Check if the suggestion type is 'search-history' to determine if it's from recent searches
  if (suggestionType === 'search-history') {
    // Create a <span> element for the clock icon
    const clockIcon = document.createElement('span');
    // This is the history icon from the Google font family
    clockIcon.classList.add('material-symbols-outlined');
    clockIcon.textContent = 'history';
    clockIcon.style.color = 'grey';
    clockIcon.style.marginRight = '10px';
    // Append the clock icon to the suggestion item
    suggestionItem.appendChild(clockIcon);
  }

  // Create a text node for the suggestion text
  const suggestionText = document.createTextNode(suggestion);

  // Append the suggestion text to the suggestion item
  suggestionItem.appendChild(suggestionText);

  // Add appropriate class based on suggestion type
  suggestionItem.classList.add(suggestionType);

  suggestionItem.addEventListener('click', () => {
    searchInput.value = suggestion;
    suggestionsList.style.display = 'none'; // Hide suggestions after selection
    // Perform additional actions (e.g., fetching data based on the selected suggestion)
  });
  suggestionsList.appendChild(suggestionItem);
}

// Function to display search suggestions
function displaySuggestions(suggestions, suggestionType) {
  // Only display the first 5 suggestions
  const limitedSuggestions = suggestions.slice(0, 5);
  limitedSuggestions.forEach(suggestion => {
    displaySuggestion(suggestion, suggestionType);
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