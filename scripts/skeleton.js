//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
  $('#footerPlaceholder').load('./text/footer.html');
  $('#headerPlaceholder').load('./text/header.html', setupLogoutButton)
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

loadSkeleton();