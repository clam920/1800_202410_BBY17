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
  logoutButton.addEventListener('click', function (e) {
    logout();
    location.pathname = '/index.html';
  });
  logoutButton.style.visibility = 'visible';
}

function setupHeader() {
  firebase.auth().onAuthStateChanged(user => {
    const inputGroup = document.querySelector('.input-group');
    if (user) {
      inputGroup.style.display = 'flex';
      setupSearchBar();    
      setupLogoutButton(user);
      document.getElementById("homeButton").addEventListener('click', onClickHome);
    }  else {
      inputGroup.style.display = 'none';
    }
      
  })
};

setupHeader();
