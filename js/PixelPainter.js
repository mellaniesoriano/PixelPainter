function pixelPainter() {
  var currentColor = "black";
  var isDragging = false;

  function getCurrentColor() {
    return currentColor;
  }

  function setCurrentColor(newColor) {
    currentColor = newColor;
  }

  function getDragging() {
    return isDragging;
  }

  function setDragging(value) {
    isDragging = value;
  }

  function makeGrid(width, height, pixelClass, appendTarget) {
    for (var x = 0; x < width; x++) {
      var row = document.createElement('div');
      row.className = 'row';
      for (var y = 0; y < height; y++) {
        var pixelSq = document.createElement('div');
        pixelSq.className = pixelClass;
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
    erase : erase,
    getDragging : getDragging,
    setDragging : setDragging
  };
}

(function(){


  function makeDiv(id, type, append, content) {
    var newElement = document.createElement(type);
    newElement.id = id;
    newElement.innerHTML = content;
    append.appendChild(newElement);
  }

  function eventListeners(className, func) {
    var currentClass = document.querySelectorAll(className);
    for (var i = 0; i < currentClass.length; i++) {
      currentClass[i].addEventListener('click', func);
    }
  }

  function clickPixel() {  //change this so color picking matters.  problem is how to access pixel painter object from here
      this.style.background = pixelPainter1.getCurrentColor();
  }
  function dragPixel() {  //change this so color picking matters.  problem is how to access pixel painter object from here
    console.log("clickpixel " + pixelPainter1.getDragging());
    if( pixelPainter1.getDragging() === true ) {
      console.log("painting");
      this.style.background = pixelPainter1.getCurrentColor();
    }

  }

  function pickColor() { //when you click on a color tile, it makes that the new drawing color.
    pixelPainter1.setCurrentColor(this.style.background);
    curColorBox.style.background = this.style.background;
  }


  function fillColorPalette(arrayOfColors){  //fills the color pixels with ...color
    var colorGrid = document.querySelectorAll('.colorSq');
    for( var i = 0; i < arrayOfColors.length; i++ ) {
      colorGrid[i].style.background = arrayOfColors[i];
    }
  }

  function nowDragging() {
    console.log("now dragging");
    pixelPainter1.setDragging(true);
    console.log(pixelPainter1.getDragging());
  }

  function notDragging() {
    console.log("not dragging");
    pixelPainter1.setDragging(false);
  }



  var colorArray = [ '#000000', '#333333', '#555555', '#777777','#ffffff', '#00059F', '#0229BF', '#4E91FD', '#78C4FD', '#B9E2F5', '#006400', '#008B00', '#00CD00', '#00EE00', '#95F571', '#660066', '#800080', '#BE29EC', '#D896FF', '#EFBBFF', '#6F0000', '#B80000', '#D22525', '#FF6666', '#FFB9B9', '#FF4F00', '#FF6700', '#FF9248', '#FFAC00', '#FFE577', '#2E1915', '#663300', '#996633', '#BB9966', '#FFCC99'];  //set your color choice here.

  var pixelPainter1 = pixelPainter();


  var mainBox = document.querySelector('#pixelPainter');
  makeDiv('sideBar', 'div', mainBox, '');
  makeDiv('colors', 'div', sideBar, '');
  makeDiv('sideBarChild', 'div', sideBar, '');
  makeDiv('curColorBox', 'div', sideBarChild, '');
  makeDiv('eraseButton', 'button', sideBarChild, 'eraseButton');
  makeDiv('clearButton', 'button', sideBarChild, 'clearButton');
  makeDiv('grid', 'div', mainBox, '');

  pixelPainter1.makeGrid(20, 20, 'pixelSq',grid); //set grid size here
  eventListeners('.pixelSq', clickPixel);

    var currentClass = document.querySelectorAll('.pixelSq');
    for (var i = 0; i < currentClass.length; i++) {
      currentClass[i].addEventListener('mouseover', dragPixel);
    }




  pixelPainter1.makeGrid(7, 5,'colorSq', colors);  //set color palette size here
  eventListeners('.colorSq', pickColor);
  fillColorPalette(colorArray);

  eventListeners('#clearButton', pixelPainter1.clear);

  eventListeners('#eraseButton', pixelPainter1.erase);

  grid.addEventListener("mousedown", nowDragging);
  grid.addEventListener("mouseup", notDragging);




})();


