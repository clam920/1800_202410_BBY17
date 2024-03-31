import { setupSearchBar } from "./modules/search.js";

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

setupHeader();
