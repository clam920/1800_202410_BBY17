//Function to get the current locaition using geo location
function getLocation(){
    //Checks if the content is loaded first before giving location
    document.addEventListener("DOMContentLoaded", function(){
        //uses navigator to get the geolocation
        //Watch position does it constantly instead of just once
        navigator.geolocation.watchPosition(position => {
            //logs current position to the console
            console.log(position);
        });
    });
}
