// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the search input element
    const searchInput = document.querySelector('.search-input');
  
    // Check if the search input element exists
    if (searchInput) {
      // Add an event listener to the search input element
      searchInput.addEventListener('input', async (event) => {
        const searchTerm = event.target.value.trim();
        const suggestionsList = document.getElementById('suggestionsList');
        suggestionsList.innerHTML = ''; // Clear previous suggestions
  
        if (searchTerm.length === 0) {
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
          if (querySnapshot.size === 0) {
            suggestionsList.style.display = 'none'; // Hide suggestions if no results found
            return;
          }
  
          // Position the suggestions list under the search input field
          const inputRect = searchInput.getBoundingClientRect();
          suggestionsList.style.position = 'absolute';
          suggestionsList.style.top = `${inputRect.bottom}px`;
          suggestionsList.style.left = `${inputRect.left}px`;
  
          // Populate the suggestions list with the retrieved suggestions
          querySnapshot.forEach((doc) => {
            const suggestion = doc.data().name;
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
              searchInput.value = suggestion;
              suggestionsList.style.display = 'none'; // Hide suggestions after selection
              // Perform additional actions (e.g., fetching data based on the selected suggestion)
            });
            suggestionsList.appendChild(suggestionItem);
          });
  
          // Display the suggestions list
          suggestionsList.style.display = 'block';
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      });
    } else {
      console.error('Search input element not found in the DOM');
    }
  });
  