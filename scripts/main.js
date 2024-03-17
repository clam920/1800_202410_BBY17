$('#mapArea').load('./images/map/SVG/VectorTrace.svg', function(){
  document.getElementById('Layer_2').childNodes.forEach(child => {
    if (child.nodeName == 'defs'){
      child.remove();
    }
    console.log(child.nodeName);
    
  })
});