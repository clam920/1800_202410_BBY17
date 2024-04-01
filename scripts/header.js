import { setupSearchBar, logSearchHistory } from "./modules/search.js";
import { searchButton, searchInput } from "./modules/search.js";

function onClickHome() {
  if (app.auth().currentUser == null) {
    location.href = 'index.html';
  } else {
    location.href = 'main.html';
  }
}

function setupLogoutButton() {
  //Logs the user out and sends them to the index when they click 'logout'.
  const logoutButton = document.querySelector('#logoutButton');
  logoutButton.addEventListener('click', function (e) {
    logout();
    location.pathname = '/index.html';
  });
  logoutButton.style.visibility = 'visible';
}

function hideLoginButton() {
  //hide Sign in button from index.html if user has already signed in.
  const loginButton = document.querySelector('.signInButton');
  if (loginButton) {
    loginButton.style.display = 'none';
  } else {
    return;
  }
}

function setupHeader() {
  // change the header after user signed in:
  // 1) user can search for location
  // 2) user can log out
  // 3) user cannot sign in again
  firebase.auth().onAuthStateChanged(user => {
    const inputGroup = document.querySelector('.input-group');
    if (user) {
      inputGroup.style.display = 'flex';
      hideLoginButton();
      setupSearchBar();
      setupLogoutButton(user);
      document.getElementById("homeButton").addEventListener('click', onClickHome);
    } else {
      inputGroup.style.display = 'none';
    }

  })
};

//check if user has logged in
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in, get their user ID
    const userId = user.uid;

    // Function for searching item from db.
    // currently only store user search.
    function startSearch(event) {
      event.preventDefault();
      const searchInput = document.querySelector('.search-input');
      const searchTerm = searchInput.value.trim();

      // call logSearchHistory to save user search into database
      if (userId && searchTerm.length > 0) {
        logSearchHistory(userId, searchTerm);
      }
    }


    // click the search button as an event to trigger search function.
    searchButton.addEventListener('click', startSearch);

    //set up "Enter" key as another trigger to search function.
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        startSearch(userId);
      }
    });

  }
});

setupHeader();
