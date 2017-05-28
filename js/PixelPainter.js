function pixelPainter() {
  var currentColor = "black";

  function getCurrentColor() {
    return currentColor;
  }

  function setCurrentColor(newColor) {
    currentColor = newColor;
  }

  function makeGrid(width, height, pixelClass, appendTarget) {
    for (var x = 0; x < width; x++) {
      var row = document.createElement('div');
      row.className = 'row';
      for (var y = 0; y < height; y++) {
        var pixelSq = document.createElement('div');
        pixelSq.className = pixelClass;
        pixelSq.innerHTML = '[ ]';
        row.appendChild(pixelSq);
      }
      appendTarget.appendChild(row);
    }
  }
  return {
    getCurrentColor : getCurrentColor,
    setCurrentColor : setCurrentColor,
    makeGrid : makeGrid
  };
}

(function(){

  var mainBox = document.querySelector('#pixelPainter');

  function makeDiv(id, type, append, content) {
    var newElement = document.createElement(type);
    newElement.id = id;
    newElement.innerHTML = content;
    append.appendChild(newElement);
  }

  function eventListeners(className, func) {
    var currentClass = document.querySelectorAll(className);
    console.log(currentClass.length);
    for (var i = 0; i < currentClass.length; i++) {
      console.log('hi');
      currentClass[i].addEventListener('click', func);
    }
  }

  function clickPixel() {  //
    this.style.background = "orange";

  }

  function pickColor() { //when you click on a color tile, it makes that the new drawing color.

  }





  var pixelPainter1 = pixelPainter();

  makeDiv('grid', 'div', mainBox, 'grid');
  makeDiv('sideBar', 'div', mainBox, 'sideBar');
  makeDiv('colors', 'div', sideBar, 'colors');
  makeDiv('eraseButton', 'div', sideBar, 'eraseButton');
  makeDiv('clearButton', 'div', sideBar, 'clearButton');

  pixelPainter1.makeGrid(3, 3, 'pixelSq',grid); //set grid size here
  eventListeners('.pixelSq', clickPixel);

  pixelPainter1.makeGrid(2, 2,'colorSq', colors);  //set color palette size here
  eventListeners('.colorSq', pickColor);







})();


