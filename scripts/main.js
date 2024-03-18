$('#mapArea').load('./images/map/SVG/VectorTrace.svg', function () {
  document.getElementById('Layer_2').childNodes.forEach(child => {
    if (child.nodeName == 'defs') {
      child.remove();
    }    
  })
});

navigator.geolocation.watchPosition(position => {
  console.log(position);
});

/**
 * 
 * @param {String} term 
 */
function search(term){
    if (isNaN(Number(term))) {
      //We search by building or room name/type
  } else {
      //We search by room number.
  }
}
