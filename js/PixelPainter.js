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

  function clear() {
    var clearGrid = document.querySelectorAll('.pixelSq');
    for( var i = 0; i < clearGrid.length; i++ ) {
      clearGrid[i].style.background = "white";
    }
  }

  function erase() {
    setCurrentColor('white');
  }

  return {
    getCurrentColor : getCurrentColor,
    setCurrentColor : setCurrentColor,
    makeGrid : makeGrid,
    clear : clear,
    erase : erase
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

  function clickPixel() {  //change this so color picking matters.  problem is how to access pixel painter object from here
    this.style.background = pixelPainter1.getCurrentColor();

  }

  function pickColor() { //when you click on a color tile, it makes that the new drawing color.
    pixelPainter1.setCurrentColor(this.style.background);
  }


  function fillColorPalette(arrayOfColors){  //fills the color pixels with ...color
    var colorGrid = document.querySelectorAll('.colorSq');
    console.log(colorGrid);
    for( var i = 0; i < arrayOfColors.length; i++ ) {
      console.log(i);
      colorGrid[i].style.background = arrayOfColors[i];
    }
  }

  var colorArray = [ 'black', '#373737', '#D3D3D3', 'orange' ];  //set your color choice here.

  var pixelPainter1 = pixelPainter();

  makeDiv('grid', 'div', mainBox, 'grid');
  makeDiv('sideBar', 'div', mainBox, 'sideBar');
  makeDiv('colors', 'div', sideBar, 'colors');
  makeDiv('eraseButton', 'button', sideBar, 'eraseButton');
  makeDiv('clearButton', 'button', sideBar, 'clearButton');

  pixelPainter1.makeGrid(3, 3, 'pixelSq',grid); //set grid size here
  eventListeners('.pixelSq', clickPixel);

  pixelPainter1.makeGrid(2, 2,'colorSq', colors);  //set color palette size here
  eventListeners('.colorSq', pickColor);
  fillColorPalette(colorArray);

  eventListeners('#clearButton', pixelPainter1.clear);

  eventListeners('#eraseButton', pixelPainter1.erase);



})();


