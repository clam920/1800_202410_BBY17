function onClickHome(){
  if (app.auth().currentUser == null) {
    location.href = 'index.html';
  } else {
    location.href = 'main.html';
  }
}

function setupLogoutButton(){
  //Logs the user out and sends them to the index when they click 'logout'.
  logoutButton.addEventListener('click', function(e) {
    logout();
    location.pathname = '/index.html';
  });

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      logoutButton.style.visibility = 'visible';
    } else {
      console.log("No user detected.")
      logoutButton.style.visibility = 'hidden';
    }
  });
}

document.getElementById("homeButton").addEventListener('click', onClickHome);
setupLogoutButton();