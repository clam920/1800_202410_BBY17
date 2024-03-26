/**
 * Call this when the "logout" button is clicked.
 * Will log the user out and set the logout button to be invisible.
 */

function logout() {
  app.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("logging out user");
  }).catch((error) => {
    // An error happened.
  })
}