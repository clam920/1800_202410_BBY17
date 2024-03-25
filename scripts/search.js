// // // Wait for the DOM content to be fully loaded
// // document.addEventListener('DOMContentLoaded', function() {
// //     // Retrieve the search input element
// //     const searchInput = document.querySelector('.search-input');

// //     // Check if the search input element exists
// //     if (searchInput) {
// //       loadSearchBar(searchInput);
// //     } else {
// //       addCallbackToSearchBar()
// //     }
// //   });

// function addCallbackToSearchBar() {
//   document.addEventListener('readystatechange', function () {
//     // Retrieve the search input element
//     const searchInput = document.querySelector('.search-input');

//     // Check if the search input element exists
//     if (searchInput) {
//       loadSearchBar(searchInput);
//     } else {
//       console.warn("Waiting for search bar");
//       document.removeEventListener('readystatechange', function(){});
//       addCallbackToSearchBar();
//     }
//   });
// }

// function loadSearchBar(elem) {
//   console.log("Loading search bar");
//   const searchInput = elem;
//   // Add an event listener to the search input element
//   searchInput.addEventListener('input', async (event) => {

//     const searchTerm = event.target.value.trim();
//     const suggestionsList = document.getElementById('suggestionsList');
//     suggestionsList.innerHTML = ''; // Clear previous suggestions

//     if (searchTerm.length == 0) {
//       suggestionsList.style.display = 'none'; // Hide suggestions if search term is empty
//       return; // No suggestions for empty input
//     }

//     try {
//       const querySnapshot = await db.collection('classrooms')
//         .where('name', '>=', searchTerm)
//         .where('name', '<=', searchTerm + '\uf8ff')
//         .orderBy('name')
//         .limit(5)
//         .get();
//       if (querySnapshot.size == 0) {
//         suggestionsList.style.display = 'none'; // Hide suggestions if no results found
//         return;
//       }

//       // Position the suggestions list under the search input field
//       const inputRect = searchInput.getBoundingClientRect();
//       suggestionsList.style.position = 'absolute';
//       suggestionsList.style.top = `${inputRect.bottom}px`;
//       suggestionsList.style.left = `${inputRect.left}px`;

//       // Populate the suggestions list with the retrieved suggestions
//       // console.log("Snapshot is " + querySnapshot.size);
//       querySnapshot.forEach((doc) => {
//         // console.log(doc.data());
//         const suggestion = doc.data().name;
//         if (suggestionsList.innerHTML.includes(suggestion)) {
//           return;
//         }
//         const suggestionItem = document.createElement('li');
//         suggestionItem.textContent = suggestion;
//         suggestionItem.addEventListener('click', () => {
//           searchInput.value = suggestion;
//           suggestionsList.style.display = 'none'; // Hide suggestions after selection
//           // Perform additional actions (e.g., fetching data based on the selected suggestion)
//         });
//         suggestionsList.appendChild(suggestionItem);
//       });
//       // console.log(suggestionsList.innerHTML);

//       // Display the suggestions list
//       suggestionsList.style.display = 'block';
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//     }
//   });
// }

// addCallbackToSearchBar();
